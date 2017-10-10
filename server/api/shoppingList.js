const router = require('express').Router()
//const {ShoppingList} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

// create new shopping list
router.post('/', (req, res, next) => {
  //ShoppingList.create(req.body)
  //.then(list => res.json(list))
})

// update shopping list
