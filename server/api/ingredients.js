const router = require('express').Router()
const db = require('../db');
const {Ingredient} = require('../db/models')


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

router.get('/names', (req, res, next) => {
  Ingredient.findAll({
    attributes : ['name']
  }).then(ingredients => {
    let ingred = ingredients.map(ingredient => ingredient.name);
    res.json(ingred);
  })
})
