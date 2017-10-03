const {OrderHistory, Ingredient} = require('../db/models')
const Sequelize = require('sequelize')

function categoryCalculations(orders) {

  // might need to be adjusted depending on what's input on the frontend
  let categories = {grains: 0, vegetables: 0, fruits: 0, dairy: 0, meat: 0, fat: 0, nutsAndLegumes: 0, sugars: 0}

    orders.map(order => {
      categories[order.ingredient.category]++
    })
    return categories
}


//module.exports = categoryCalculations


