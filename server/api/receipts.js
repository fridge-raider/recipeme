const router = require('express').Router()
const {Ingredient} = require('../db/models')
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
