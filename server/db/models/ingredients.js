const Sequelize = require('sequelize')
const db = require('../db')

const Ingredient = db.define('ingredient', {
  name: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  }
})

module.exports = Ingredient
