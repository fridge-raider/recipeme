const router = require('express').Router()
const db = require('../db');
const {Ingredient, Frequency} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

// update so specific to user
router.get('/:categoryName', (req, res, next) => {
  console.log('category', req.params.categoryName)
  const userId = 1;
  Ingredient.findAll({
    where: {
      category: req.params.categoryName
    },
    order: Sequelize.literal('freq DESC')
  })
  .then(ingredients => {
    res.json(ingredients)
  })
})
