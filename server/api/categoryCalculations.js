const {OrderHistory, Ingredient} = require('../db/models')
const Sequelize = require('sequelize')

function categoryCalculations(orders) {

  // might need to be adjusted depending on what's input on the frontend
  let categories = {grains: 0, vegetables: 0, fruits: 0, dairy: 0, meat: 0, fat: 0, nutsAndLegumes: 0, sugars: 0}

    orders.map(order => {
      categories[order.ingredient.category]++
    })
    return categories
}

OrderHistory.findAll({
  where: {
    userId: 1,
    createdAt: { // change this to date
      $gt: new Date(new Date(Date.now()).getTime() - 60*24*60*60*1000) // in last 60 days
    }
  },
    // change this to date not createdAt
    group: ['orderHistory.createdAt', 'ingredient.category'],
    attributes: ['orderHistory.createdAt',[Sequelize.fn('SUM',Sequelize.col('orderHistory.servings')),'servingCount']],
    include: [{model: Ingredient,attributes:['category']}],
    raw: true
})
.then(orders => console.log(orders))

//module.exports = categoryCalculations


