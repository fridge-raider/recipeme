const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')

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
  },
  yummlyID: {
    type: Sequelize.STRING
  },
  ingredientsList: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Recipe
