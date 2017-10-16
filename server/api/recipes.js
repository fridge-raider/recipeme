const router = require('express').Router()
const {Ingredient, Frequency} = require('../db/models')
const Sequelize = require('sequelize')
const axios = require('axios')

const app_id = process.env.YUMMLY_ID
const app_key = process.env.YUMMLY_KEY

module.exports = router

router.get('/:categoryName', (req, res, next) => {
  let ingNames = []
  Frequency.findAll({
    where: {
      userId: req.user.id,
    },
    include: [{model: Ingredient, where: {category: req.params.categoryName}}],
    order: Sequelize.literal('freq DESC')
  })
  .then(frequencies => {
    if (frequencies.length === 0) {
      return Ingredient.findAll({
        where: {
          category: req.params.categoryName
        },
        order: Sequelize.literal('freq DESC')
      })
      .then(ingredients => {

        ingNames.push(ingredients[0].name)
        ingNames.push(ingredients[1].name)
      })
    }
    else {
      ingNames.push(frequencies[0].ingredientName)
      if (frequencies.length > 1) ingNames.push(frequencies[1].ingredientName)
    }
  })
  .then(() => {
    const ing1 = axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&requirePictures=true&allowedIngredient=${ingNames[0]}&maxResult=75`)
    let ing2 = ''
    if (ingNames.length > 1) {
      ing2 = axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&requirePictures=true&allowedIngredient=${ingNames[1]}&maxResult=75`)
    }

    Promise.all([ing1, ing2])
    .then(promises => {
      let recipes = []
      promises.forEach(promise => {
        if (promise) recipes = recipes.concat(promise.data.matches)
      })
      return recipes
    })
    .then(recipes => {
      res.json(recipes)
    })
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
