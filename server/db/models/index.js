const User = require('./user')
const Category = require('./categories')
const Ingredient = require('./ingredients')
const ReceiptRepresentation = require('./receiptRepresentations')
const Frequency = require('./frequency')
const OrderHistory = require('./orderHistory')
const Recipe = require('./recipes')
// const NutritionValue = require('./nutritionValue')
// const Nutrient = require('./nutrient')
const Receipt = require('./receipts')

User.belongsToMany(OrderHistory, {through: 'userOrders'})
OrderHistory.belongsTo(User)
OrderHistory.belongsTo(Ingredient)
Frequency.belongsTo(User); 
ReceiptRepresentation.belongsTo(Ingredient); 
Recipe.belongsToMany(Ingredient, {through: 'recipeIngredients'})
// NutritionValue.belongsTo(User)
// NutritionValue.belongsTo(Ingredient)

Receipt.belongsTo(User)

module.exports = {
  User,
  Category,
  OrderHistory,
  Frequency, 
  Ingredient,
  Recipe,
  ReceiptRepresentation,
  Receipt
}
