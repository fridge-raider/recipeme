import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import currentReceipt from './currentReceipt'
import getRecipes from './getRecipes'
import nutrientHistory from './nutrientHistory'
import categoryHistory from './categoryHistory'
import deficientCategories from './deficientCategories'
import deficientNutrients from './deficientNutrients'
import ingredients from './ingredients'
import shoppingList from './shoppingList'
import favoriteRecipes from './favoriteRecipes'
import autopopRecipes from './autopopRecipes'

const reducer = combineReducers({user, foods, getRecipes, currentReceipt, nutrientHistory, categoryHistory, deficientCategories, deficientNutrients, ingredients, shoppingList, favoriteRecipes, autopopRecipes})

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './getRecipes'
export * from './currentReceipt'
export * from './nutrientHistory'
export * from './categoryHistory'
export * from './deficientNutrients'
export * from './deficientCategories'
export * from './ingredients'
export * from './shoppingList'
export * from './favoriteRecipes'
export * from './autopopRecipes'
