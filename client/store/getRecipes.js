import axios from 'axios'
import secrets from '../../secrets'

const app_id = process.env.YUMMLY_ID
const app_key = process.env.YUMMLY_KEY

const GET_RECIPES = 'GET_RECIPES'

const getRecipes = recipes => ({ type: GET_RECIPES, recipes })

export const getRecipesByIngredient = (ingredient) => dispatch => {
  return axios.get(`https://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&q=${ingredient}&maxResult=10`)
    .then(res => res.data)
    .then(recipes => {
      dispatch(getRecipes(recipes.matches))
    })
    .catch(console.log)
}

// gets recipes with 2 most common ingredients (specific to user) in the given category - can adjust
// these parameters if necessary
export const getRecipesByDefCategory = (deficientCategory) => dispatch => {
  return axios.get(`/api/recipes/${deficientCategory}`)
    .then(res => res.data)
    .then(ingredients => {
      axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&allowedIngredient=${ingredients[0].name}&maxResult=100`)
      .then(res => res.data)
      .then(recipes => {
        axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&allowedIngredient=${ingredients[1].name}&maxResult=100`)
        .then(res => res.data)
        .then(newRecipes => {
          dispatch(getRecipes(recipes.matches.concat(newRecipes.matches)))
        })
      })
    })
    .catch(console.log)
}

const getRecipesReducer = (state=[], action) => {
  switch(action.type) {
    case GET_RECIPES:
      return action.recipes
    default:
      return state
  }
}

export default getRecipesReducer

