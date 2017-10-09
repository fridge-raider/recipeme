const router = require('express').Router()
const {Ingredient, Frequency} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

// update so specific to user
router.get('/:categoryName', (req, res, next) => {
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

