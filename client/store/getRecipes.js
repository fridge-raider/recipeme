import axios from 'axios'
import secrets from '../../secrets'

const app_id = process.env.YUMMLY_ID
const app_key = process.env.YUMMLY_KEY

const GET_RECIPES = 'GET_RECIPES'

const getRecipes = recipes => ({ type: GET_RECIPES, recipes })

const getRecipesReducer = (state=[], action) => {
  switch(action.type) {
    case GET_RECIPES:
      return action.recipes
    default:
      return state
  }
}
export default getRecipesReducer

export const getRecipesByIngredient = (ingredient) => dispatch => {
  console.log(app_id, app_key, 'hi)')
  // return axios.get(`https://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&q=${ingredient}&maxResult=10;`)
  //   .then(res => res.data)
  //   .then(recipes => {
  //     dispatch(getRecipes(recipes))
  //   })
  //   .catch(console.log)
}