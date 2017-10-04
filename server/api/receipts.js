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
  console.log('orders', orders)
  Promise.map(orders, order => {
     OrderHistory.create(order)
  }).then(succ => {
    res.json(succ) ;
  })
})
