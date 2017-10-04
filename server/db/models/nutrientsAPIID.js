const Sequelize = require('sequelize')
const db = require('../db')

const NutrientsAPIID = db.define('nutrientsAPIID', {
  name: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: true
  },
  apiId: {
    type: Sequelize.STRING
  }
})

module.exports = NutrientsAPIID
