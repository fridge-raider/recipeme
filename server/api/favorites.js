const router = require('express').Router()
const {Recipe} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

router.get('/:userId', (req, res, next) => {
  Recipe.findAll({
    where: {
      userId: req.params.userId
    }
  })
  .then(recipes => {
    return res.json(recipes)
  })
})

router.post('/:userId', (req, res, next) => {
  const favoriteRec = req.body.recipe
  Recipe.findOrCreate({ favoriteRec, userId: req.params.userId })
    .then(fav => res.json(fav))
    .catch(next)
})

router.delete('/:favoriteId/:userId', (req, res, next) => {
  Recipe.findOne({
    where: {
      userId: req.params.userId,
      yummlyID: req.params.favoriteId
    }
  })
    .then(recipe => recipe.destroy())
    .catch(next)
})

