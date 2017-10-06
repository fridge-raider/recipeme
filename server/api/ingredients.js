const router = require('express').Router()
const db = require('../db'); 
const {Ingredient} = require('../db/models')


module.exports = router



router.get('/names', (req, res, next) => {
  Ingredient.findAll({
    attributes : ['name']
  }).then(ingredients => {
    let ingred = ingredients.map(ingredient => ingredient.name); 
    res.json(ingred); 
  })
})


