const router = require('express').Router()
const db = require('../db');
const {Ingredient} = require('../db/models')
const axios = require('axios')

module.exports = router

// const app_id = process.env.YUMMLY_ID
// const app_key = process.env.YUMMLY_KEY

// router.get('/:ingredient', (req, res, next) => {
//   const ingredient = req.params.ingredient
//   return axios.get(`https://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&requirePictures=true&allowedIngredient=${ingredient}&maxResult=50&requirePictures=true`)
//     .then(res => res.data)
//     .then(recipes => {
//       res.json(recipes)
//       })
//     .catch(console.log)
// })

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
