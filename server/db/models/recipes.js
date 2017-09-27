const Sequelize = require('sequelize')
const db = require('../db')
const Ingredient = require('./ingredients')

const Recipe = db.define('recipe', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  website: {
    type: Sequelize.URL
  },
  image: {
    type: Sequelize.URL
  }
},
{
  defaultScope: {
    include: [{model: Ingredient}]
  }
})

module.exports = Recipe
