import {getRecipesByDefCategory} from './getRecipes'
import axios from 'axios'

const app_id = "1bae5fc6"
const app_key = "3eefade9510fd0f9d50fcfeb98587587"

const GET_AUTOPOP_RECIPES = 'GET_AUTOPOP_RECIPES'

export const getAutopopRecipes = recipes => ({ type: GET_AUTOPOP_RECIPES, recipes })

export const getAutopopRecipesByCategory = (category) => dispatch => {
  return axios.get(`/api/recipes/${category}`)
    .then(res => res.data)
    .then(recipes => {

          dispatch(getAutopopRecipes(recipes))
    })
    .catch(console.log)
}

const getAutopopRecipesReducer = (state=[], action) => {
  switch(action.type) {
    case GET_AUTOPOP_RECIPES:
      return action.recipes
    default:
      return state
  }
}

export default getAutopopRecipesReducer

