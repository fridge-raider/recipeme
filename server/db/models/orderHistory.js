const Sequelize = require('sequelize')
const db = require('../db')
const Frequency = require('./frequency');
const Ingredient = require('./ingredients')

const moment = require('moment');

// how much of each ingredient each user has
const OrderHistory = db.define('orderHistory', {
  servings: {
    type: Sequelize.FLOAT
  },
  price: {
    type: Sequelize.FLOAT
  },
  week: {
    type: Sequelize.INTEGER
  }

}, {
  defaultScope: {
    include: [{model: Ingredient}]
  },
  hooks: {
    beforeCreate: function(inst) {
      // can return promises for testing (maybe)
      Frequency.findOrCreate({
        where: {
          userId: inst.userId,
          ingredientName: inst.ingredientName
        }
      }).spread((item, created) => { // use ES6 to destructure array
        if (created) {
          let freq = +inst.servings;
          item.update({ freq });
        } else {
          let freq = +item.freq + +inst.servings;
          item.update({ freq })
        }
      })

      Ingredient.findOrCreate({
        where: {
          name: inst.ingredientName
        }
      }).spread((item, created) => {
        if (created) {
          let freq = +inst.servings;
          item.update({ freq });
        } else {
          let freq = +item.freq + +inst.servings;
          item.update({ freq })
        }
      })
    }
  },
  // dont need "week" field anymore
  setterMethods: {
    week: function(val) {
      this.setDataValue('week', moment(val).week())
    },
  }
})

module.exports = OrderHistory
