const Sequelize = require('sequelize')
const db = require('../db')

const Receipt = db.define('receipt', {
  imageUrl: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  }
})

module.exports = Receipt
