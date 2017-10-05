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
  weekDate: {
    type: Sequelize.DATE
  }
}, {
  defaultScope: {
    include: [{model: Ingredient}]
  },
  hooks: {
    beforeCreate: function(inst) {

      const promise1 = Frequency.findOrCreate({
        where: {
          userId: inst.userId,
          ingredientName: inst.ingredientName
        }
      }).spread((item, created) => {
        if(created) {
          let freq = +inst.servings;
          item.update({ freq });
        } else {
          let freq = +item.freq+ +inst.servings;
          item.update({ freq })
        }
      })

      const promise2 = Ingredient.findOrCreate({
        where: {
          name: inst.ingredientName
        }
      }).spread((item, created) => {
        console.log('ingredient', item, created)
        if(created) {
          let freq = +inst.servings;
          item.update({ freq });
        } else {
          let freq = +item.freq + +inst.servings;
          item.update({ freq })
        }
      })


    }
  }
})

module.exports = OrderHistory
