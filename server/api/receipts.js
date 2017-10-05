const router = require('express').Router()
const db = require('../db');
const {OrderHistory, Ingredient, Frequency, ReceiptRepresentation} = require('../db/models')
const returnCleanReceipt = require('./receiptParsing')
const Promise = require('bluebird')
const {Receipt} = require('../db/models')

module.exports = router

router.get('/parse', (req, res, next) => {
  const userId = req.user.id;
  Receipt.findOne({
    where: {
      userId: userId,
      status: "Not Parsed"
    }
  })
  .then(receipt => res.json(receipt))
})

router.post('/add', (req, res, next) => {
  const orders = req.body.currentReceipt; 
  Promise.mapSeries(orders, order => {
     return OrderHistory.create(order)
  }).then(succ => {
    res.json(succ) ;
  })
})

router.put('/categories', (req, res, next) => {
  const ingredients = req.body.currentIngredients; 
  Promise.mapSeries(ingredients, ingredient => {
    Ingredient.findOne({
      where: {
        name: ingredient.name
      }
    }).then(foundIngred => {
      foundIngred.update({
        category: ingredient.category
      })
    })
  }).then((succ) => {
    res.json(succ); 
  })
})

router.put('/representations', (req, res, next) => {
  const reps = req.body.currentRepresentations; 
  console.log(reps); 
  Promise.mapSeries(reps, rep => {
    ReceiptRepresentation.findOne({
      where: { rep : rep.name }
    }).then(foundRep => {
      foundRep.update({
        ingredientName: rep.ingredientName
      })
    })
  }).then((succ) => {
    res.json(succ); 
  })
})



