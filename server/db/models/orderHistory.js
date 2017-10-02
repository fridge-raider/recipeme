const Sequelize = require('sequelize')
const db = require('../db')
const Ingredient = require('./ingredients')

// how much of each ingredient each user has
const OrderHistory = db.define('orderHistory', {
  servings: {
    type: Sequelize.FLOAT
  },
  price: {
    type: Sequelize.FLOAT
  },
  orderId: {
    type: Sequelize.INTEGER
  }
}, {
  defaultScope: {
    include: [{model: Ingredient}]
  }
})

module.exports = OrderHistory
