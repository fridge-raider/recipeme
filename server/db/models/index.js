const User = require('./user')
const Category = require('./categories')
const Ingredient = require('./ingredients')
const ReceiptRepresentation = require('./receiptRepresentations')
const Inventory = require('./inventory')
const Recipe = require('./recipes')

User.belongsToMany(Inventory, {through: 'user_inventory'})
Inventory.belongsTo(User)
Inventory.belongsTo(Ingredient)
Recipe.belongsToMany(Ingredient, {through: 'recipe_ingredients'})

module.exports = {
  User,
  Category,
  Ingredient,
  ReceiptRepresentation,
  Inventory,
  Recipe
}
