const {OrderHistory} = require('../db/models')

function nutrientCalculations(userId) {
  const today = new Date(Date.now())
  // maybe change this to being on the store -> passing in the store to function
  let nutrients = {nf_calories: 0, nf_total_fat: 0, nf_saturated_fat: 0, nf_sodium: 0, nf_total_carbohydrate: 0, nf_dietary_fiber: 0, nf_sugars: 0, nf_protein: 0, nf_potassium: 0,nf_p: 0}

  let categories = {grains: 0, vegetables: 0, fruits: 0, dairy: 0, meat: 0, fat: 0, nutsAndLegumes: 0, sugars: 0}

  OrderHistory.findAll({
    where: {
      userId: userId,
      createdAt: {
        $gt: new Date(today.getTime() - 30*24*60*60*1000) // in last 30 days
      }
    }
  })
  .then(orders => {
    orders.map(order => {
      let servings = order.servings
      categories[order.ingredient.category]++
      Object.keys(nutrients).map(nutrient => {
        nutrients[nutrient] = nutrients[nutrient] + order[nutrient]
      })
    })
    return {servings: servings, categories: categories}
  })
}
