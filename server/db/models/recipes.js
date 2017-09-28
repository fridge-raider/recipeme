const Sequelize = require('sequelize')
const db = require('../db')
const Ingredient = require('./ingredients')

const Recipe = db.define('recipe', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  website: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  }
},
{
  defaultScope: {
    include: [{model: Ingredient}]
  }
})

module.exports = Recipe
