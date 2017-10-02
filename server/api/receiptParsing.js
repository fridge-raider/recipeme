const fs = require('fs')
const tesseract = require('node-tesseract');

function returnCleanReceipt(imageName) {

    return new Promise(function (resolve, reject) {

            // Use tesseract to process a file image
            tesseract.process(__dirname + '/' + imageName, function (err, text) {
                if (err) {
                    reject(err);
                } else {
                    console.log('text',text)
                    // write the file image to a text file
                    fs.writeFileSync('receipt.txt', text, err => {
                        if (err) reject(err)
                        console.log('file has beed saved')
                    })

                    // read in the text file and start cleaning
                    return fs.readFile('receipt.txt', 'utf-8', (err) => {
                        if (err) {
                            reject(err)
                        }
                        const lines = text.split('\n');
                        const cleanLines = [];
                        const priceRegex = /\d+\s*[\.\,\-]\s*\d+\s*\w*$/;
                        for (let i = 0; i < lines.length; i++) {
                            const item = {};
                            if (lines[i].match(priceRegex)) {
                                item.price = lines[i].match(priceRegex)[0];
                                item.name = lines[i].substring(0, lines[i].indexOf(item.price)).trim().toLowerCase();
                                item.price = item.price.replace(',', '.').replace(/\s+/, '').replace(/([a-zA-Z])/, '');
                                item.name = item.name.replace(/[^\w\s]/, '');
                                const tempName = item.name.replace(/\s/g, '');
                                if (tempName.match(/^[0-9]*$/)) item.name = null
                                if (tempName.includes('total') || tempName.includes('cash')) item.name = null
                            }
                            if (item.name && item.price) {
                                cleanLines.push(item);
                            }
                        }
                        resolve(cleanLines)
                    })
                }
            });

    });
}


module.exports = returnCleanReceipt
