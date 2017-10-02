import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import currentReceipt from './currentReceipt'
import getRecipes from './getRecipes'
import orderHistory from './orderHistory'

const reducer = combineReducers({user, getRecipes, currentReceipt, orderHistory})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './getRecipes'
export * from './currentReceipt'
export * from './orderHistory'
