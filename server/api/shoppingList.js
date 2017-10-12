const router = require('express').Router()
const {Recipe} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

// add recipe to shopping list
router.post('/', (req, res, next) => {

  const shoppingRec = req.body.recipe
  Recipe.find({
    where: {
      yummlyID: shoppingRec.id,
      userShoppingId: req.user.id
    }
  })
  .then(recipe => {
    if (recipe) {
      res.json('Already added')
    }
    else {
      Recipe.create({
        name: shoppingRec.recipeName,
        image: shoppingRec.smallImageUrls[0],
        yummlyID: shoppingRec.id,
        userShoppingId: req.user.id,
        ingredientsList: shoppingRec.ingredients
      })
      .then(createdRecipe => res.json(createdRecipe.ingredientList))
    }
  })
    .catch(next)
})

router.get('/', (req, res, next) => {
  const list = []
  const recipeIds = []

  Recipe.findAll({
    where: {
      userShoppingId: req.user.id
    }
  })
    .then(recipes => {
      recipes.forEach(recipe => {
        recipeIds.push(recipe.yummlyID)
        recipe.ingredientsList.forEach(ingredient => {
          list.push(ingredient)
        })
      })
      const uniqueList = list.filter(function (item, i, ar) { return ar.indexOf(item) === i; })
      res.json({ingredients: uniqueList, recipeIds: recipeIds})
    })
    .catch(next)
})

router.delete('/:name', (req, res, next) => {
  console.log('req.params.name', req.params.name, 'user', req.user.id)
  Recipe.destroy({
    where: {
      userShoppingId: req.user.id,
      name: req.params.name
    }
  })
    .then((numDeleted) => {
      console.log(numDeleted)
      res.sendStatus(200)
    })
    .catch(next)
})
