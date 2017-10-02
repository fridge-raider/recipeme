const Sequelize = require('sequelize')
const db = require('../db')

const NutritionValue = db.define('nutritionvalue', {
  // nutrients: {
  //   type: Sequelize.ARRAY,
  //   primaryKey: true,
  //   allowNull: true
  // }
  name: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: true
  },
  total_fat: {
    type: Sequelize.INTEGER,
  }, 
  sat_fat: {
    type: Sequelize.INTEGER,
  },
  cholesterol: {
    type: Sequelize.INTEGER,
  }, 
  sodium: {
    type: Sequelize.INTEGER,
  }, 
  protein: {
    type: Sequelize.INTEGER
  },
  vicC: {
    type: Sequelize.INTEGER
  },
  vicD: {
    type: Sequelize.INTEGER
  }, 
  vitE: {
    type: Sequelize.INTEGER
  },
  vitK: {
    type: Sequelize.INTEGER
  },
  vitB6: {
    type: Sequelize.INTEGER
  },
  calcium: {
    type: Sequelize.INTEGER
  },
  iron: {
    type: Sequelize.INTEGER
  },
  zinc: {
    type: Sequelize.INTEGER
  },
})

module.exports = NutritionValue