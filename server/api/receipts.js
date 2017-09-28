const router = require('express').Router()
const {Ingredient} = require('../db/models')
const returnCleanReceipt = require('./receiptParsing')
module.exports = router

router.get('/clean', (req, res, next) => {
  //image = '/receipts/Receipt1.jpg'
  returnCleanReceipt(image)
  .then(receiptItems => {
    receiptItems.map(item => {
      Ingredient.findAll({
        where: {
          name: {
            $like: `%${item.name}%`
          }
        }
      })
      .then(ingredients => {
        // look at order history and return one that is largest
        // ingredients.map(ingredient => {

        // })
        console.log(ingredients)
      })
    })
  })
})



