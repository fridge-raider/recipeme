const router = require('express').Router()
const {OrderHistory, Ingredient} = require('../db/models')
const categoryCalculations = require('./categoryCalculations')
const Sequelize = require('sequelize')
const _ = require('lodash')

module.exports = router

// gets last 60 days of orders, groups by date, sums nutrients - for graph
router.get('/nutrients', (req, res, next) => {
  OrderHistory.findAll({
    where: {
      userId: req.user.id,
      createdAt: { // change this to date
        $gt: new Date(new Date(Date.now()).getTime() - 60*24*60*60*1000) // in last 60 days
      }
    },
      // change this to date not createdAt
      group: ['orderHistory.createdAt'],
      attributes: ['createdAt',[Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_calories*servings')),'nf_calories'],
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

  nutrientHistory.forEach(nutrientDate => {
    Object.keys(nutrients).map(nutrient => {
      nutrients[nutrient] = nutrients[nutrient] + nutrientDate[nutrient]
    })
  })

  res.json(getDeficientNutrients(nutrients))
})


function getDeficientNutrients(nutrientTotals) {
  const nutrients = ['nf_calories','nf_total_fat', 'nf_saturated_fat', 'nf_sodium', 'nf_total_carbohydrate', 'nf_dietary_fiber', 'nf_sugars', 'nf_protein','nf_potassium','nf_p']
  const deficits = {}
  let defNutrient = ''
  let maxDef = 0

  nutrients.map(nutrient => {
    deficits[nutrient] = +recDailyIntakeByNutrient[nutrient] - +nutrientTotals[nutrient]/60

      // adjust to send back more than one nutrient
    if (+deficits[nutrient] > maxDef) {
      maxDef = +deficits[nutrient]
      defNutrient = nutrient
    }

  })

  return {
    defNutrient,
    maxDef
  }
}

router.get('/categories', (req, res, next) => {
  OrderHistory.findAll({
    where: {
      userId: req.user.id,
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
  const categories = {Grains: 0, Vegetables: 0, Fruits: 0, Dairy: 0, Meat: 0, Fat: 0, NutsAndLegumes: 0, Sugars: 0}

    categoryHistory.forEach(categoryDate => {
        categories[categoryDate["ingredient.category"]] = +categories[categoryDate["ingredient.category"]] + +categoryDate.servingCount
    })

  res.json(getDeficientCategories(categories))
})


function getDeficientCategories(categoryTotals) {
  const categories = ['Grains','Vegetables', 'Fruits', 'Dairy', 'Meat', 'Fat', 'NutsAndLegumes', 'Sugars']
  const deficits = {}
  let defCategory = ''
  let maxDef = 0

  categories.map(category => {
    deficits[category] = +recDailyIntakeByCategory[category] - +categoryTotals[category]/60

    if (+deficits[category] > maxDef) {
      maxDef = +deficits[category]
      defCategory = category
    }
  })

  return {
    defCategory,
    maxDef
  }
}

const recDailyIntakeByCategory = {
  Grains: 7, Vegetables: 5, Fruits: 5, Dairy: 3, Meat: 2, Fat: 3, NutsAndLegumes: 0.7, Sugars: 0.7
}

const recDailyIntakeByNutrient = {
  nf_calories: 2000, nf_total_fat: 65, nf_saturated_fat: 20, nf_sodium: 2400, nf_total_carbohydrate: 300, nf_dietary_fiber: 25, nf_sugars: 50, nf_protein: 50, nf_potassium: 3500, nf_p: 1000
}

