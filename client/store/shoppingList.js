import axios from 'axios'
import Promise from 'bluebird'

const app_id = process.env.YUMMLY_ID
const app_key = process.env.YUMMLY_KEY

/**
 * ACTION TYPES
 */
const SET_SHOPPING_LIST = 'SET_SHOPPING_LIST'

/**
 * ACTION CREATORS
 */
export const setShoppingList = recipe => ({ type: SET_SHOPPING_LIST, recipe })

/**THUNKS */
export function addToShoppingList(recipe) {
  return function thunk(dispatch) {
    return axios.post(`/api/shoppingList`, {recipe})
      .then(res => res.data)
      .then(shoppingListRecipe => {
        if (shoppingListRecipe !== 'Already added') {
          return axios.get(`http://api.yummly.com/v1/api/recipe/${recipe.id}?_app_id=${app_id}&_app_key=${app_key}`)
            .then(res => res.data)
            .then(recipeDetails => {
              dispatch(setShoppingList({ingredients: shoppingListRecipe, recipeDetails: [{name: recipeDetails.name, url: recipeDetails.source.sourceRecipeUrl}]}))
            })
        }
      })
    }
  }

export function fetchShoppingList() {
  return function think(dispatch) {
    return axios.get('api/shoppingList')
      .then(res => res.data)
      .then(result => {
        const ingredients = result.ingredients
        const recipeIds = result.recipeIds
        const recipes = []

        Promise.map(recipeIds, recipeId => {
          return axios.get(`http://api.yummly.com/v1/api/recipe/${recipeId}?_app_id=${app_id}&_app_key=${app_key}`)
          .then(res => res.data)
          .then(recipeDetails => {
            console.log('recipeDetails', recipeDetails)
            recipes.push({name: recipeDetails.name, url: recipeDetails.source.sourceRecipeUrl})
          })
        })
        .then(() => {
          dispatch(setShoppingList({ingredients: ingredients, recipeDetails: recipes}))
        })
      })
  }
}

/**
 * REDUCER
 */
export default function (state = {ingredients: [], recipeDetails: []}, action) {
  switch (action.type) {
    case SET_SHOPPING_LIST:
      const newList = state.ingredients.concat(action.recipe.ingredients)
      const newRecipeDetails = state.recipeDetails.concat(action.recipe.recipeDetails)
      return {ingredients: newList, recipeDetails: newRecipeDetails}
    default:
      return state
  }
}
