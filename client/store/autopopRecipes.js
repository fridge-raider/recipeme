import {getRecipesByDefCategory} from './getRecipes'
import axios from 'axios'


const app_id = process.env.YUMMLY_ID
const app_key = process.env.YUMMLY_KEY

const GET_AUTOPOP_RECIPES = 'GET_AUTOPOP_RECIPES'

export const getAutopopRecipes = recipes => ({ type: GET_AUTOPOP_RECIPES, recipes })

export const getAutopopRecipesByCategory = (category) => dispatch => {
  return axios.get(`/api/recipes/${category}`)
    .then(res => res.data)
    .then(ingredients => {
      const ing1 = axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&requirePictures=true&allowedIngredient=${ingredients[0].ingredientName}&maxResult=75`)
      let ing2 = ''
      if (ingredients[1]) {
        ing2 = axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&requirePictures=true&allowedIngredient=${ingredients[1].ingredientName}&maxResult=75`)
      }

      Promise.all([ing1, ing2])
        .then(promises => {
          let recipes = []
          promises.forEach(promise => {
            if (promise) recipes = recipes.concat(promise.data.matches)
          })
          return recipes
        })
        .then(recipes => {
          dispatch(getAutopopRecipes(recipes))

      })
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

