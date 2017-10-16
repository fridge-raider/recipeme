import axios from 'axios'
import Promise from 'bluebird'

const app_id = "1bae5fc6"
const app_key = "3eefade9510fd0f9d50fcfeb98587587"

/**
 * ACTION TYPES
 */
const ADD_TO_SHOPPING_LIST = 'ADD_TO_SHOPPING_LIST'
const CLEAR_LIST = 'CLEAR_LIST'

/**
 * ACTION CREATORS
 */
export const addToList = recipe => ({ type: ADD_TO_SHOPPING_LIST, recipe })
export const clearList = () => ({ type: CLEAR_LIST })

/**THUNKS */
export function addToShoppingList(recipe) {
  return function thunk(dispatch) {
    return axios.post(`/api/shoppingList`, { recipe })
      .then(res => res.data)
      .then(shoppingListRecipe => {
        if (shoppingListRecipe !== 'Already added') {
          return axios.get(`http://api.yummly.com/v1/api/recipe/${recipe.id}?_app_id=${app_id}&_app_key=${app_key}`)
            .then(res => res.data)
            .then(recipeDetails => {
              dispatch(addToList({ ingredients: shoppingListRecipe, recipeDetails: [{ name: recipeDetails.name, url: recipeDetails.source.sourceRecipeUrl }] }))
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
              recipes.push({ name: recipeDetails.name, url: recipeDetails.source.sourceRecipeUrl })
            })
        })
          .then(() => {
            dispatch(addToList({ ingredients: ingredients, recipeDetails: recipes }))
          })
      })
  }
}

export function removeRecipeFromList(name) {
  return function thunk(dispatch) {
    return axios.delete(`/api/shoppingList/${name}`)
      .then(() => {
        dispatch(clearList())
        dispatch(fetchShoppingList())
      })
  }
}

/**
 * REDUCER
 */
export default function (state = { ingredients: [], recipeDetails: [] }, action) {
  switch (action.type) {
    case ADD_TO_SHOPPING_LIST:
      const newList = state.ingredients.concat(action.recipe.ingredients)
      const newRecipeDetails = state.recipeDetails.concat(action.recipe.recipeDetails)
      return { ingredients: newList, recipeDetails: newRecipeDetails }

    case CLEAR_LIST:
      return { ingredients: [], recipeDetails: [] }

    default:
      return state
  }
}
