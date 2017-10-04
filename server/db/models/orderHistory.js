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

// OrderHistory.hook('beforeCreate', (order, options) => {
//   console.log("hi");
//       return Frequency.findOrCreate({
//         where: {
//           userId: order.userId,
//           ingredientName: order.ingredientName
//         }
//       }).spread((item, created) => {
//         if(created) {
//           console.log("ok created");
//           let freq = 1;
//           item.update({ freq });
//         } else {
//           console.log("hiiiii found", order.servings);
//           let freq = item.freq+1;
//           item.update({ freq })
//         }
//       })
// })

module.exports = OrderHistory
