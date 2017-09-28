const Sequelize = require('sequelize')
const db = require('../db')

// how much of each ingredient each user has
const OrderHistory = db.define('orderHistory', {
  quantity: {
    type: Sequelize.INTEGER
  },
  units: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.FLOAT
  },
  orderId: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderHistory
