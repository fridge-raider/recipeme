const Sequelize = require('sequelize')
const db = require('../db')

const Frequency = db.define('frequency', {
  freq: {
    type: Sequelize.INTEGER, 
    defaultValue: 1
  }, 
  ingredientName: {
    type: Sequelize.STRING, 
    allowNull: false
  }
})

module.exports = Frequency