const User = require('./user')
const Category = require('./categories')
const Ingredient = require('./ingredients')
const ReceiptRepresentation = require('./receiptRepresentations')
const OrderHistory = require('./orderHistory')
const Recipe = require('./recipes')

User.belongsToMany(OrderHistory, { through: 'user_orderhistory'}); 
OrderHistory.belongsTo(User)
OrderHistory.belongsTo(Ingredient)
Recipe.belongsToMany(Ingredient, { through: 'recipe_ingredients'}); 


module.exports = {
  User,
  Category,
  OrderHistory,
  ReceiptRepresentation,
  Ingredient,
  Recipe
}
