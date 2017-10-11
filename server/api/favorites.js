const router = require('express').Router()
const {Recipe, User} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

router.get('/', (req, res, next) => {
  Recipe.findAll({
    where: {
      userFavoriteId: req.user.id
    }
  })
  .then(recipes => {
    return res.json(recipes)
  })
})

router.post('/', (req, res, next) => {
  const favoriteRec = req.body
  Recipe.findOrCreate({ 
    where: {
      name: favoriteRec.recipeName, 
      image: favoriteRec.smallImageUrls[0], 
      ingredientsList: favoriteRec.ingredients, 
      yummlyID: favoriteRec.id, 
      userFavoriteId: req.user.id 
    }
  })
    .spread((favorite, created) => res.json(favorite))
    .catch(next)
})

router.delete('/:favoriteId/:userId', (req, res, next) => {
  Recipe.findOne({
    where: {
      user_favorite_id: req.params.userId,
      yummlyID: req.params.favoriteId
    }
  })
    .then(recipe => recipe.destroy())
    .catch(next)
})

