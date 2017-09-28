const User = require('./user')
const Category = require('./categories')
const Ingredient = require('./ingredients')
const ReceiptRepresentation = require('./receiptRepresenations')
const OrderHistory = require('./orderHistory')
const Recipe = require('./recipe')

User.belongsToMany(OrderHistory)
OrderHistory.belongsTo(User)
OrderHistory.belongsTo(Ingredient)
Recipe.belongsToMany(Ingredient)

module.exports = {
  User,
  Category,
  OrderHistory,
  ReceiptRepresentation,
  Inventory,
  Recipe
}
