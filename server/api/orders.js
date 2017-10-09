// put comments that es6 looks for to ignore the camelCase rule

const router = require('express').Router()
const { OrderHistory, Ingredient } = require('../db/models')
const Sequelize = require('sequelize')
const db = require('../db'); // dont need this


const recWeeklyIntakeByCategory = {
  Grains: 49,
  Vegetables: 35,
  Fruits: 35,
  Dairy: 20,
  Meat: 13,
  Fats: 20,
  ['Nuts and Legumes']: 4,
  ['Added Sugars']: 4
}

const recWeeklyIntakeByNutrient = {
  nf_calories: 14000,
  nf_total_fat: 455,
  nf_saturated_fat: 140,
  nf_sodium: 16800,
  nf_total_carbohydrate: 2100,
  nf_dietary_fiber: 175,
  nf_sugars: 350,
  nf_protein: 350,
  nf_potassium: 24500,
  nf_p: 7000
}

module.exports = router

// gets last 60 days of orders, groups by date, sums nutrients - for graph
router.get('/nutrients', (req, res, next) => {
  OrderHistory.findAll({
    where: {
      userId: req.user.id,
      createdAt: { // change this to date
        $gt: new Date(new Date(Date.now()).getTime() - 60 * 24 * 60 * 60 * 1000) // in last 60 days
      }
    },
    // maybe get rid of the groups aggregations and move it all to frontend
    group: ['orderHistory.createdAt'],
    attributes: ['createdAt', [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_calories*servings')), 'nf_calories'],
      [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_total_fat*servings')), 'nf_total_fat'],
      [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_saturated_fat*servings')), 'nf_saturated_fat'],
      [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_sodium*servings')), 'nf_sodium'],
      [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_total_carbohydrate*servings')), 'nf_total_carbohydrate'],
      [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_dietary_fiber*servings')), 'nf_dietary_fiber'],
      [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_sugars*servings')), 'nf_sugars'],
      [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_protein*servings')), 'nf_protein'],
      [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_potassium*servings')), 'nf_potassium'],
      [Sequelize.fn('SUM', Sequelize.literal('ingredient.nf_p*servings')), 'nf_p']],
    include: [{ model: Ingredient, attributes: [] }]
  })
    .then(orders => res.json(orders))
    .catch(next)
})


router.put('/nutrients/deficient', (req, res, next) => {
  const nutrientHistory = req.body.nutrientHistory
  const nutrients = {
    nf_calories: 0,
    nf_total_fat: 0,
    nf_saturated_fat: 0,
    nf_sodium: 0,
    nf_total_carbohydrate: 0,
    nf_dietary_fiber: 0,
    nf_sugars: 0,
    nf_protein: 0,
    nf_potassium: 0,
    nf_p: 0
  }
  // what if only one receipt
  let minDate = new Date(Date.now())
  let maxDate = new Date('01-01-1990')

  nutrientHistory.forEach(nutrientDate => {
    if (new Date(nutrientDate.createdAt) < minDate) minDate = new Date(nutrientDate.createdAt)
    if (new Date(nutrientDate.createdAt) > maxDate) maxDate = new Date(nutrientDate.createdAt)
    Object.keys(nutrients).map(nutrient => {
      nutrients[nutrient] = nutrients[nutrient] + nutrientDate[nutrient]
    })
  })

  const numWeeks = ((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24 * 7)) + 1

  res.json(getDeficientNutrients(nutrients, numWeeks))

})


function getDeficientNutrients(nutrientTotals, numWeeks) {
  const nutrients = ['nf_calories', 'nf_total_fat', 'nf_saturated_fat', 'nf_sodium', 'nf_total_carbohydrate', 'nf_dietary_fiber', 'nf_sugars', 'nf_protein', 'nf_potassium', 'nf_p']
  const deficits = {}
  let defNutrient = ''
  let maxDef = 0

  nutrients.map(nutrient => {
    deficits[nutrient] = [+nutrientTotals[nutrient] / numWeeks, +recWeeklyIntakeByNutrient[nutrient], +recWeeklyIntakeByNutrient[nutrient] - +nutrientTotals[nutrient] / numWeeks]

    // adjust to send back more than one nutrient
    if (+deficits[nutrient][2] > maxDef) {
      maxDef = +deficits[nutrient][2]
      defNutrient = nutrient
    }
  })

  return {
    defNutrient,
    maxDef,
    deficits
  }
}

router.get('/categories', (req, res, next) => {
  OrderHistory.findAll({
    where: {
      userId: req.user.id,
      createdAt: {
        $gt: new Date(new Date(Date.now()).getTime() - 60 * 24 * 60 * 60 * 1000) // in last 60 days
      }
    },
    group: ['orderHistory.createdAt', 'ingredient.category'],
    attributes: ['orderHistory.createdAt', [Sequelize.fn('SUM', Sequelize.col('orderHistory.servings')), 'servingCount']],
    include: [{ model: Ingredient, attributes: ['category'] }],
    raw: true
  })
    .then(orders => res.json(orders))
    .catch(next)
})


router.put('/categories/deficient', (req, res, next) => {
  const categoryHistory = req.body.categoryHistory
  const categories = {
    Grains: 0,
    Vegetables: 0,
    Fruits: 0,
    Dairy: 0,
    Meat: 0,
    Fats: 0,
    ['Nuts and Legumes']: 0,
    ['Added Sugars']: 0
  }
  let minDate = new Date(Date.now())
  let maxDate = new Date('01-01-1990')

  categoryHistory.forEach(categoryDate => {
    categories[categoryDate['ingredient.category']] = +categories[categoryDate['ingredient.category']] + +categoryDate.servingCount
    if (new Date(categoryDate.createdAt) < minDate) minDate = new Date(categoryDate.createdAt)
    if (new Date(categoryDate.createdAt) > maxDate) maxDate = new Date(categoryDate.createdAt)
  })

  const numWeeks = ((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24 * 7)) + 1

  res.json(getDeficientCategories(categories, numWeeks))
})


function getDeficientCategories(categoryTotals, numWeeks) {
  const categories = Object.keys(categoryTotals)

  const deficits = {}
  let defCategory = ''
  let maxDef = 0

  categories.forEach(category => {
    if (category !== 'null' && category !== 'Unsure') {

      deficits[category] = [+categoryTotals[category] / numWeeks, +recWeeklyIntakeByCategory[category], +recWeeklyIntakeByCategory[category] - +categoryTotals[category] / numWeeks]

      if (+deficits[category][2] > maxDef) {
        maxDef = +deficits[category][2]
        defCategory = category
      }

    }
  })

  return {
    defCategory,
    maxDef,
    deficits
  }
}
