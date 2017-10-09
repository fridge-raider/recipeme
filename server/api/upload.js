const router = require('express').Router();
const fs = require('fs')
const CryptoJS = require('crypto-js')
let aws = require('aws-sdk')
const { Receipt } = require('../db/models')
const request = require('request')
const { returnCleanReceipt, getReceiptIngredients } = require('./receiptParsing')

const clientSecretKey = process.env.CLIENT_SECRET_KEY,

    // These two keys are only needed if you plan on using the AWS SDK
    serverPublicKey = process.env.AWS_ACCESS_KEY_ID,
    serverSecretKey = process.env.AWS_SECRET_ACCESS_KEY,

    // Set these two values to match your environment
    expectedBucket = process.env.BUCKET_NAME,
    expectedHostname = "groceryreceipts.s3.amazonaws.com",

    // CHANGE TO INTEGERS TO ENABLE POLICY DOCUMENT VERIFICATION ON FILE SIZE
    // (recommended)
    expectedMinSize = null,
    expectedMaxSize = null
    // EXAMPLES DIRECTLY BELOW:
    //expectedMinSize = 0,
    //expectedMaxSize = 15000000,


// Init S3, given your server-side keys.  Only needed if using the AWS SDK.
aws.config.update({
    accessKeyId: serverPublicKey,
    secretAccessKey: serverSecretKey
});

const s3 = new aws.S3();

// Handles all signature requests and the success request FU S3 sends after the file is in S3
// You will need to adjust these paths/conditions based on your setup.
router.post('/signatureHandler', function (req, res, next) {
    if (typeof req.query.success !== 'undefined') {

        verifyFileInS3(req, res);
    }
    else {

        signRequest(req, res);
    }
});

router.post('/uploadSuccessful', function (req, res, next) {

    Receipt.create({
        imageUrl: req.body.key,
        userId: req.user.id,
        status: 'Not Parsed'
    })
        .then(receipt => res.sendStatus(201))

});

router.get('/clean', (req, res, next) => {
    // make this a unique file name and delete at the end
    const filename = 'temp2.png'

    Receipt.findOne({
        where: {
            userId: req.user.id,
            status: 'Not Parsed'
        }
    })
        .then(receipt => {

            const urlParams = { Bucket: process.env.BUCKET_NAME, Key: receipt.imageUrl }
            s3.getSignedUrl('getObject', urlParams, function (err, url) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('the url of the image is', url);
                    var writeFileStream = fs.createWriteStream(filename)

                    request(url).pipe(writeFileStream).on('close', function () {
                        console.log(url, 'saved to', filename)
                        returnCleanReceipt(filename)
                            .then(cleanLines => {
                                getReceiptIngredients(cleanLines)
                                    .then(result => {
                                        receipt.update({
                                            status: 'Parsed'
                                        })
                                        res.json(result)
                                    })
                            })
                    })
                }
            })
        })
})

// Handles the standard DELETE (file) request sent by Fine Uploader S3.
// Omit if you don't want to support this feature.
router.delete('/s3handler/*', function (req, res) {
    deleteFile(req.query.bucket, req.query.key, function (err) {
        if (err) {
            console.log('Problem deleting file: ' + err);
            res.status(500);
        }

        res.end();
    });
});

// Signs any requests.  Delegate to a more specific signer based on type of request.
function signRequest(req, res) {

    if (req.body.headers) {
        signRestRequest(req, res);
    }
    else {
        signPolicy(req, res);
    }
}

// Signs multipart (chunked) requests.  Omit if you don't want to support chunking.
function signRestRequest(req, res) {
    var version = req.query.v4 ? 4 : 2,
        stringToSign = req.body.headers,
        signature = version === 4 ? signV4RestRequest(stringToSign) : signV2RestRequest(stringToSign);

    var jsonResponse = {
        signature: signature
    };

    res.setHeader("Content-Type", "application/json");

    if (isValidRestRequest(stringToSign, version)) {
        res.end(JSON.stringify(jsonResponse));
    }
    else {
        res.status(400);
        res.end(JSON.stringify({ invalid: true }));
    }
}

function signV2RestRequest(headersStr) {
    return getV2SignatureKey(clientSecretKey, headersStr);
}

function signV4RestRequest(headersStr) {
    var matches = /.+\n.+\n(\d+)\/(.+)\/s3\/aws4_request\n([\s\S]+)/.exec(headersStr),
        hashedCanonicalRequest = CryptoJS.SHA256(matches[3]),
        stringToSign = headersStr.replace(/(.+s3\/aws4_request\n)[\s\S]+/, '$1' + hashedCanonicalRequest);

    return getV4SignatureKey(clientSecretKey, matches[1], matches[2], "s3", stringToSign);
}

// Signs "simple" (non-chunked) upload requests.
function signPolicy(req, res) {
    var policy = req.body

    const base64Policy = new Buffer(JSON.stringify(policy)).toString("base64")


    const signature = req.query.v4 ? signV4Policy(policy, base64Policy) : signV2Policy(base64Policy);

    var jsonResponse = {
        policy: base64Policy,
        signature: signature
    };


    res.setHeader("Content-Type", "application/json");

    if (isPolicyValid(req.body)) {
        res.end(JSON.stringify(jsonResponse));
    }
    else {
        res.status(400);
        res.end(JSON.stringify({ invalid: true }));
    }
}

function signV2Policy(base64Policy) {

    return getV2SignatureKey(clientSecretKey, base64Policy);
}

function signV4Policy(policy, base64Policy) {
    var conditions = policy.conditions,
        credentialCondition;

    for (var i = 0; i < conditions.length; i++) {
        credentialCondition = conditions[i]["x-amz-credential"];
        if (credentialCondition != null) {
            break;
        }
    }

    var matches = /.+\/(.+)\/(.+)\/s3\/aws4_request/.exec(credentialCondition);
    return getV4SignatureKey(clientSecretKey, matches[1], matches[2], "s3", base64Policy);
}

// Ensures the REST request is targeting the correct bucket.
// Omit if you don't want to support chunking.
function isValidRestRequest(headerStr, version) {
    if (version === 4) {
        return new RegExp("host:" + expectedHostname).exec(headerStr) != null;
    }

    return new RegExp("\/" + expectedBucket + "\/.+$").exec(headerStr) != null;
}

// Ensures the policy document associated with a "simple" (non-chunked) request is
// targeting the correct bucket and the min/max-size is as expected.
// Comment out the expectedMaxSize and expectedMinSize variables near
// the top of this file to disable size validation on the policy document.
function isPolicyValid(policy) {
    var bucket, parsedMaxSize, parsedMinSize, isValid;

    policy.conditions.forEach(function (condition) {
        if (condition.bucket) {
            bucket = condition.bucket;
        }
        else if (condition instanceof Array && condition[0] === "content-length-range") {
            parsedMinSize = condition[1];
            parsedMaxSize = condition[2];
        }
    });

    isValid = bucket === expectedBucket;

    // If expectedMinSize and expectedMax size are not null (see above), then
    // ensure that the client and server have agreed upon the exact same
    // values.
    if (expectedMinSize != null && expectedMaxSize != null) {
        isValid = isValid && (parsedMinSize === expectedMinSize.toString())
            && (parsedMaxSize === expectedMaxSize.toString());
    }

    return isValid;
}

// After the file is in S3, make sure it isn't too big.
// Omit if you don't have a max file size, or add more logic as required.
function verifyFileInS3(req, res) {
    function headReceived(err, data) {
        if (err) {
            res.status(500);
            console.log(err);
            res.end(JSON.stringify({ error: "Problem querying S3!" }));
        }
        else if (expectedMaxSize != null && data.ContentLength > expectedMaxSize) {
            res.status(400);
            res.write(JSON.stringify({ error: "Too big!" }));
            deleteFile(req.body.bucket, req.body.key, function (err) {
                if (err) {
                    console.log("Couldn't delete invalid file!");
                }

                res.end();
            });
        }
        else {
            res.end();
        }
    }
    console.log('req.body', req.body)
    callS3("head", {
        bucket: req.body.bucket,
        key: req.body.key
    }, headReceived);
}

function getV2SignatureKey(key, stringToSign) {
    console.log("string to sign", key, stringToSign)

    var words = CryptoJS.HmacSHA1(stringToSign, key);
    console.log("do i get here")

    return CryptoJS.enc.Base64.stringify(words);
}

function getV4SignatureKey(key, dateStamp, regionName, serviceName, stringToSign) {
    var kDate = CryptoJS.HmacSHA256(dateStamp, "AWS4" + key),
        kRegion = CryptoJS.HmacSHA256(regionName, kDate),
        kService = CryptoJS.HmacSHA256(serviceName, kRegion),
        kSigning = CryptoJS.HmacSHA256("aws4_request", kService);

    return CryptoJS.HmacSHA256(stringToSign, kSigning).toString();
}

function deleteFile(bucket, key, callback) {
    callS3("delete", {
        bucket: bucket,
        key: key
    }, callback);
}

function callS3(type, spec, callback) {
    s3[type + "Object"]({
        Bucket: spec.bucket,
        Key: spec.key
    }, callback)
}




module.exports = router;
