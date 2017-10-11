const User = require('./user')
const Category = require('./categories')
const Ingredient = require('./ingredients')
const ReceiptRepresentation = require('./receiptRepresentations')
const Frequency = require('./frequency')
const OrderHistory = require('./orderHistory')
const Recipe = require('./recipes')
const Receipt = require('./receipts')
const NutrientsAPIID = require('./nutrientsAPIID')

User.belongsToMany(OrderHistory, {through: 'userOrders'})
OrderHistory.belongsTo(User)
OrderHistory.belongsTo(Ingredient)
Ingredient.belongsToMany(User, {through: Frequency});
Frequency.belongsTo(Ingredient)
ReceiptRepresentation.belongsTo(Ingredient);
// Recipe.belongsToMany(Ingredient, {through: 'recipeIngredients'})
Receipt.belongsTo(User)
Recipe.belongsTo(User, {as: 'user_shopping'})
Recipe.belongsTo(User, {as: 'user_favorite'})


module.exports = {
  User,
  Category,
  OrderHistory,
  Frequency,
  Ingredient,
  Recipe,
  ReceiptRepresentation,
  Receipt,
  NutrientsAPIID
}
