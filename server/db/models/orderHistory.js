const Sequelize = require('sequelize')
const db = require('../db')
const Frequency = require('./frequency'); 

// how much of each ingredient each user has
const OrderHistory = db.define('orderHistory', {
  quantity: {
    type: Sequelize.INTEGER
  },
  units: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.FLOAT
  },
  orderId: {
    type: Sequelize.INTEGER
  }
})

OrderHistory.hook('beforeCreate', (order, options) => {
  console.log("hi"); 
      return Frequency.findOrCreate({
        where: {
          userId: order.userId, 
          ingredientName: order.ingredientName
        }
      }).spread((item, created) => {
        if(created) {
          console.log("ok created"); 
          let freq = order.quantity; 
          item.update({ freq }); 
        } else {
          console.log("hiiiii found", order.quantity); 
          let freq = item.freq+order.quantity; 
          item.update({ freq }) 
        }
      })
})

module.exports = OrderHistory
