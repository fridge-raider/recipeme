const router = require('express').Router()
const {Ingredient, Frequency} = require('../db/models')
const Sequelize = require('sequelize')
const axios = require('axios')

module.exports = router

const app_id = process.env.YUMMLY_ID
const app_key = process.env.YUMMLY_KEY

router.get('/ingredient/:ingredient', (req, res, next) => {
  const ingredient = req.params.ingredient
  return axios.get(`https://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&requirePictures=true&allowedIngredient=${ingredient}&maxResult=50`)
    .then(res => res.data)
    .then(recipes => {
      res.json(recipes)
      })
    .catch(console.log)
})

router.get('/recipedetails/:recipeId', (req, res, next) => {
  const recipeId = req.params.recipeId
  return axios.get(`http://api.yummly.com/v1/api/recipe/${recipeId}?_app_id=${app_id}&_app_key=${app_key}`)
    .then(res => res.data)
    .then(recipes => res.json(recipes))
    .catch(console.log)
})

router.get('/ingredient/nutrient/:ingredient/:nutID/:min', (req, res, next) => {
  const ingredient = req.params.ingredient
  const nutID = req.params.nutID
  const min = req.params.min
  return axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&requirePictures=true&allowedIngredient=salt&nutrition.${nutID}.min=${min}&maxResult=50`)
    .then(res => res.data)
    .then(recipes => res.json(recipes))
    .catch(console.log)
})

router.get('/nutrientdef/:nutrient', (req, res, next) => {
  const nutrient = req.params.nutrient
  Frequency.findAll({
    where: {
      userId: 1,
    },
    include: [{ model: Ingredient }],
    order: Sequelize.literal(`${nutrient} DESC`)
  })
  .then(frequencies => res.json(frequencies))
})

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


