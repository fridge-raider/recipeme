const Sequelize = require('sequelize')
const db = require('../db')

const Nutrient = db.define('nutrient', {
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
  npdId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Nutrient