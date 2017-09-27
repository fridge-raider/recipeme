const User = require('./user')
const Category = require('./categories')
const Ingredient = require('./ingredients')
const ReceiptRepresentation = require('./receiptRepresenations')
const Inventory = require('./inventory')
const Recipe = require('./recipe')

User.belongsToMany(Inventory)
Inventory.belongsTo(User)
Inventory.belongsTo(Ingredient)
Recipe.belongsToMany(Ingredient)

module.exports = {
  User,
  Category,
  Ingredient,
  ReceiptRepresentation,
  Inventory,
  Recipe
}
