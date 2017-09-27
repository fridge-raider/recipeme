const Sequelize = require('sequelize')
const db = require('../db')

const ReceiptRepresentations = db.define('receiptRepresentations', {
  rep: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = ReceiptRepresentations
