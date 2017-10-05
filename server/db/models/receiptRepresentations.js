const Sequelize = require('sequelize')
const db = require('../db')
const Ingredient = require('./ingredients')

const ReceiptRepresentations = db.define('receiptRepresentations', {
  rep: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
	defaultScope: {
		include: [{model: Ingredient}]
	}
})


module.exports = ReceiptRepresentations
