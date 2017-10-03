const router = require('express').Router()
const {OrderHistory, Ingredient} = require('../db/models')
const categoryCalculations = require('./categoryCalculations')
const _ = require('lodash')

module.exports = router

// gets last 60 days of orders, groups by date, sums nutrients - for graph
router.get('/nutrients', (req, res, next) => {
  OrderHistory.findAll({
    where: {
      userId: 1,
      createdAt: { // change this to date
        $gt: new Date(new Date(Date.now()).getTime() - 60*24*60*60*1000) // in last 60 days
      }
    },
      // change this to date not createdAt
      group: ['orderHistory.createdAt'],
      attributes: ['orderHistory.createdAt',[Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_calories*servings')),'nf_calories'],
      [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_total_fat*servings')),'nf_total_fat'],
      [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_saturated_fat*servings')),'nf_saturated_fat'],
      [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_sodium*servings')),'nf_sodium'],
      [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_total_carbohydrate*servings')),'nf_total_carbohydrate'],
      [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_dietary_fiber*servings')),'nf_dietary_fiber'],
      [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_sugars*servings')),'nf_sugars'],
      [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_protein*servings')),'nf_protein'],
      [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_potassium*servings')),'nf_potassium'],
      [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_p*servings')),'nf_p']],
      include: [{model: Ingredient,attributes:[]}]
  })
  .then(orders => res.json(orders))
  .catch(next)
})


router.put('/nutrients/deficient', (req, res, next) => {
  const nutrientHistory = req.body.nutrientHistory
  const nutrients = {
    nf_calories: 0, nf_total_fat: 0, nf_saturated_fat: 0, nf_sodium: 0, nf_total_carbohydrate: 0, nf_dietary_fiber: 0, nf_sugars: 0, nf_protein: 0, nf_potassium: 0, nf_p: 0
  }

  nutrientHistory.map(nutrientDate => {
    nutrients.map(nutrient => {
      nutrients[nutrient] = nutrients[nutrient] + nutrientDate[nutrient]
    })
  })

  return getDeficientNutrients(nutrients)
})


function getDeficientNutrients(nutrientTotals) {
  const nutrients = ['nf_calories','nf_total_fat', 'nf_saturated_fat', 'nf_sodium', 'nf_total_carbohydrate', 'nf_dietary_fiber', 'nf_sugars', 'nf_protein','nf_potassium','nf_p']
  const deficits = {}
  nutrients.map(nutrient => {
    deficits[nutrient] = +recDailyIntakeByNutrient[nutrient] - +nutrientTotals[nutrient]/60
  })

  // adjust to send back more than one nutrient
  const defNutrient = _.max(Object.keys(deficits), function (o) { return obj[o]})
  const maxDef = deficits[defNutrient]

  return {
    defCategory,
    maxDef
  }
}

router.get('/categories', (req, res, next) => {
  OrderHistory.findAll({
    where: {
      userId: 1,
      createdAt: { // change this to date
        $gt: new Date(new Date(Date.now()).getTime() - 60*24*60*60*1000) // in last 60 days
      }
    },
      // change this to date not createdAt
      group: ['orderHistory.createdAt', 'ingredient.category'],
      attributes: ['orderHistory.createdAt',[Sequelize.fn('SUM',Sequelize.col('orderHistory.servings')),'servingCount']],
      include: [{model: Ingredient,attributes:['category']}],
      raw: true
  })
  .then(orders => res.json(orders))
  .catch(next)
})


router.put('/categories/deficient', (req, res, next) => {
  const categoryHistory = req.body.categoryHistory
  const categories = {grains: 0, vegetables: 0, fruits: 0, dairy: 0, meat: 0, fat: 0, nutsAndLegumes: 0, sugars: 0}

    categoryHistory.map(categoryDate => {
        categories[categoryDate.ingredient.category] = categories[categoryDate.ingredient.category] + categoryDate.servingCount
    })

  return getDeficientCategories(categories)
})


function getDeficientCategories(categoryTotals) {
  const categories = ['grains','vegetables', 'fruits', 'dairy', 'meat', 'fat', 'nutsAndLegumes', 'sugars']
  const deficits = {}
  categories.map(category => {
    deficits[category] = +recDailyIntakeByCategory[category] - +categoryTotals[category]/60
  })

    // adjust to send back more than one nutrient
  const defCategory = _.max(Object.keys(deficits), function (o) { return obj[o]})
  const maxDef = deficits[defCategory]

  return {
    defCategory,
    maxDef
  }
}

const recDailyIntakeByCategory = {
  grains: 7, vegetables: 5, fruits: 5, dairy: 3, meat: 2, fat: 3, nutsAndLegumes: 0.7, sugars: 0.7
}

const recDailyIntakeByNutrient = {
  nf_calories: 2000, nf_total_fat: 65, nf_saturated_fat: 20, nf_sodium: 2400, nf_total_carbohydrate: 300, nf_dietary_fiber: 25, nf_sugars: 50, nf_protein: 50, nf_potassium: 3500, nf_p: 1000
}

