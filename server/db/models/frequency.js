const Sequelize = require('sequelize')
const db = require('../db')
const Ingredient = require('./ingredients')

const Frequency = db.define('frequency', {
  freq: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
},
{
  defaultScope: {
    include: [{model: Ingredient}]
  }
})

module.exports = Frequency
