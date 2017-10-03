const router = require('express').Router()
const db = require('../db'); 
const {OrderHistory, Ingredient, Frequency, ReceiptRepresentation} = require('../db/models')
const returnCleanReceipt = require('./receiptParsing')
const Promise = require('bluebird')

module.exports = router

router.get('/clean', (req, res, next) => {
  image = '../../public/receipts/Receipt1.jpg'
  returnCleanReceipt(image)
  .then(receiptItems => {
    Promise.map(receiptItems, item => {
      return Ingredient.findOne({
        where: {
          name: {
            $like: `%${item.name}%`
          }
        }
      })
      .then(potentialMatch => {
        if (!potentialMatch) {         
          const words = item.name.split(' ');
          let longestWord = words.reduce((a, b) => {return (a.length > b.length)? a : b}); 
          console.log('try again with longest word for item ', item.name, "ok", longestWord); 
          return Ingredient.findOne({
            where: {
              name: {
                $like: `%${longestWord}%`
              }
            }
          })
          .then(longestMatch => {
            if (!longestMatch) return `unknown ingredient: ${item.name}`
            else {
              let receiptRow = {ing: longestMatch, qty: 1, unit: 'unit', price: item.price} // add get most frequent function here
              Ingredient.findOrCreate({
                where: {
                  name: receiptRow.ing.name
                }
              }).spread((ingredient, wasCreated) => {
                return ReceiptRepresentation.findOrCreate({
                  where: {
                    rep: item.name, 
                    ingredientName: ingredient.name
                  }
                })
              })

              return receiptRow; 
            }
          })
        } else {
          let receiptRow = {ing: potentialMatch, qty: 1, unit: 'unit', price: item.price} // add get most frequent function here
          Ingredient.findOrCreate({
            where: {
              name: receiptRow.ing.name
            }
          }).spread((ingredient, wasCreated) => {
            return ReceiptRepresentation.findOrCreate({
              where: {
                rep: item.name, 
                ingredientName: ingredient.name
              }
            })
          })
          return receiptRow; 
        }
      })
    })
    .then(receiptIngArr => {
      const result = receiptIngArr.map(receiptIng => {
        return {ing: receiptIng.ing.name, qty: 1, unit: 'unit', price: receiptIng.price}
      })
      res.json(result)
    })
  })
})

router.post('/add', (req, res, next) => {
  const orders = req.body.currentReceipt; 
  Promise.map(orders, order => {
     OrderHistory.create(order)
  }).then(succ => {
    res.json(succ) ; 
  })
})

