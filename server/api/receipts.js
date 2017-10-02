const router = require('express').Router()
const {Ingredient} = require('../db/models')
const returnCleanReceipt = require('./receiptParsing')
const Promise = require('bluebird')
const {Receipt} = require('../db/models')

module.exports = router

// router.get('/clean', (req, res, next) => {
//   //image = '../../public/receipts/Receipt1.jpg'
//   //get image url
//   var filename = 'temp2.png'

//   Receipt.findOne({
//     where: {
//       userId: req.user.id,
//       status: "Not Parsed"
//     }
//   })
//   .then(receipt => {
//     console.log('receipt', receipt, receipt.imageUrl)


//     const urlParams = {Bucket: process.env.BUCKET_NAME, Key: req.body.key}
//     s3.getSignedUrl('getObject', urlParams, function(err, url){
//       console.log('the url of the image is', url);
//       var writeFileStream = fs.createWriteStream(filename)

//           request(url).pipe(writeFileStream).on('close', function() {
//             console.log(url, 'saved to', filename)
//             returnCleanReceipt(filename)
//             .then(cleanLines => console.log(cleanLines))
//           })

//     returnCleanReceipt(receipt.imageUrl)

//     // .then(receiptItems => {
//     //   receipt.update({
//     //     status: "Parsed"
//     //   })
//     //   console.log('receiptItems',receiptItems)
//     //   Promise.map(receiptItems, item => {
//     //     return Ingredient.findOne({
//     //       where: {
//     //         name: {
//     //           $like: `%${item.name}%`
//     //         }
//     //       }
//     //     })
//     //     .then(potentialMatches => {
//     //       console.log('potentialMatches', potentialMatches)
//     //       if (!potentialMatches) {
//     //         console.log('try again with longest word for item ', item.name)
//     //         const words = item.name.split(' ');
//     //         let longestWord = ''
//     //         let longest = 0
//     //         for (let i = 0; i < words.length; i++) {
//     //           if (words[i].length > longest) {
//     //             longest = words[i].length
//     //             longestWord = words[i]
//     //           }
//     //         }
//     //         return Ingredient.findOne({
//     //           where: {
//     //             name: {
//     //               $like: `%${longestWord}%`
//     //             }
//     //           }
//     //         })
//     //         .then(newMatches => {
//     //           if (!newMatches) return `unknown ingredient: ${item.name}`
//     //           else return {ing: newMatches, qty: 1, unit: 'unit', price: item.price} // add get most frequent function here
//     //         })
//     //       }
//     //     else {
//     //       return {ing: potentialMatches, qty: 1, unit: 'unit', price: item.price} // add get most frequent function here
//     //     }
//     //     })
//     //   })
//     //   .then(receiptIngArr => {
//     //     const result = receiptIngArr.map(receiptIng => {
//     //       return {ing: receiptIng.ing.name, qty: 1, unit: 'unit', price: receiptIng.price}
//     //     })
//     //     res.json(result)
//     //   })
//     // })
//   })
// })


router.get('/parse', (req, res, next) => {
  //image = '../../public/receipts/Receipt1.jpg'
  const userId = req.user.id;
  Receipt.findOne({
    where: {
      userId: userId,
      status: "Not Parsed"
    }
  })
  .then(receipt => res.json(receipt))
})
