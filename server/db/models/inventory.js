const Sequelize = require('sequelize')
const db = require('../db')

// how much of each ingredient each user has
const Inventory = db.define('inventory', {
  quantity: {
    type: Sequelize.INTEGER
  },
  units: {
    type: Sequelize.STRING
  },
  orderId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Inventory
