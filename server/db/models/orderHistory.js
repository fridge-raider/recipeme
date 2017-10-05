const Sequelize = require('sequelize')
const db = require('../db')
const Frequency = require('./frequency'); 
const Ingredient = require('./ingredients')

// how much of each ingredient each user has
const OrderHistory = db.define('orderHistory', {
  servings: {
    type: Sequelize.FLOAT
  },
  price: {
    type: Sequelize.FLOAT
  },
  orderId: {
    type: Sequelize.INTEGER
  }
}, {
  defaultScope: {
    include: [{model: Ingredient}]
  }
})

OrderHistory.hook('beforeCreate', (order, options) => {
  return Frequency.findOrCreate({
    where: {
      userId: order.userId, 
      ingredientName: order.ingredientName
    }
  }).spread((item, created) => {
    if(created) {
      let freq = order.servings; 
      item.update({ freq }); 
    } else {
      let freq = item.freq+order.servings; 
      item.update({ freq }) 
    }
  })
})

module.exports = OrderHistory
