const Sequelize = require('sequelize')
const db = require('../db')

const Ingredient = db.define('ingredient', {
  name: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING
  },
  nf_calories: {
    type: Sequelize.FLOAT
  },
  nf_total_fat: {
    type: Sequelize.FLOAT
  },
  nf_saturated_fat: {
    type: Sequelize.FLOAT
  },
  nf_sodium: {
    type: Sequelize.FLOAT
  },
  nf_total_carbohydrate: {
    type: Sequelize.FLOAT
  },
  nf_dietary_fiber: {
    type: Sequelize.FLOAT
  },
  nf_sugars: {
    type: Sequelize.FLOAT
  },
  nf_protein: {
    type: Sequelize.FLOAT
  },
  nf_potassium: {
    type: Sequelize.FLOAT
  },
  nf_p: {
    type: Sequelize.FLOAT
  }
})

module.exports = Ingredient
