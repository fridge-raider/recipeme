const router = require('express').Router()
const db = require('../db');
const {Ingredient, Frequency} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

// update so specific to user
router.get('/:categoryName', (req, res, next) => {
  const userId = 1;
  Frequency.findAll({
    where: {
      userId: req.user.id,
      'Ingredient.category': req.params.categoryName
    },
    include: [{model: Ingredient}],
    order: Sequelize.literal('freq DESC')
  })
  .then(frequencies => {
    if (!frequencies) {
      Ingredient.findAll({
        where: {
          categoryName: req.params.categoryName
        },
        order: Sequelize.literal('freq DESC')
      })
      .then(ingredients => {
        res.json(ingredients)
      })
    }
    else res.json(frequencies)
  })
})
