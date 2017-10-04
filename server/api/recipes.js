const router = require('express').Router()
const db = require('../db');
const {Ingredient, Frequency} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

router.get('/:categoryName', (req, res, next) => {
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
