const router = require('express').Router()
const db = require('../db');
const {Ingredient, Frequency} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

// update so specific to user
router.get('/:categoryName', (req, res, next) => {
  const userId = req.user.id;
  Frequency.findAll({
    where: {
      userId: req.user.id,
    },
    include: [{model: Ingredient, where: {category: req.params.categoryName}}],
    order: Sequelize.literal('freq DESC')
  })
  .then(frequencies => {
    frequencies.forEach(frequency => console.log(frequency.ingredient))
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

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  Frequency.findAll({
    where: {
      userId: req.user.id,
    },
    order: Sequelize.literal('freq DESC')
  })
  .then(frequencies => {
    frequencies.forEach(frequency => console.log(frequency.ingredient))
    return res.json(frequencies)
  })
})