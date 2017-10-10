import axios from 'axios'
import secrets from '../../secrets'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_FAV_RECIPES = 'GET_FAV_RECIPES'
const ADD_FAV_RECIPE = 'ADD_FAV_RECIPE'
const REMOVE_FAV_RECIPE = 'REMOVE_FAV_RECIPE'

/**
 * ACTION CREATORS
 */
export const getFavRecipes = recipes => ({type: GET_FAV_RECIPES, recipes})
export const addFavRecipe = recipe => ({type: ADD_FAV_RECIPE, recipe})
export const removeFavRecipe = recipe => ({type: REMOVE_FAV_RECIPE, recipe})

//thunk
export function fetchFavoriteRecipes(userId) {
  return function thunk(dispatch) {
    return axios.put(`/api/favorites/${userId}`)
      .then(res => res.data)
      .then(recipes => {
        dispatch(getFavRecipes(recipes));
      })
      .catch(console.log)
  }
}

export function addFavoriteRecipe(userId) {
  return function thunk(dispatch) {
    return axios.post(`/api/favorites/${userId}`)
      .then(res => res.data)
      .then(recipe => {
        dispatch(addFavRecipe(recipe))
      })
      .catch(console.log)
  }
}


/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_FAV_RECIPES:
      return action.recipes
    case ADD_FAV_RECIPE:
      return [...state, action.recipe]
    case REMOVE_FAV_RECIPE:
      return state.filter(stateRecipe => stateRecipe !== action.recipe)
    default:
      return state
  }
}