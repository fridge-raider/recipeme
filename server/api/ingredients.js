const router = require('express').Router()
const db = require('../db'); 
const {Ingredient} = require('../db/models')
const Promise = require('bluebird')

module.exports = router



router.put('/categories', (req, res, next) => {
  const ingredients = req.body.currentIngredients; 
  Promise.mapSeries(ingredients, ingredient => {
    Ingredient.findOne({
      where: {
        name: ingredient.name
      }
    }).then(foundIngred => {
      foundIngred.update({
        category: ingredient.category
      })
    })
  }).then((succ) => {
    res.json(succ); 
  })
})


