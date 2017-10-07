import axios from 'axios'
import secrets from '../../secrets'
import Promise from 'bluebird'
import history from '../history'

const app_id = process.env.YUMMLY_ID
const app_key = process.env.YUMMLY_KEY

const GET_RECIPES = 'GET_RECIPES'

export const getRecipes = recipes => ({ type: GET_RECIPES, recipes })

export const getRecipesByIngredient = (ingredient) => dispatch => {
  return axios.get(`https://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&q=${ingredient}&maxResult=10&requirePictures=true`)
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
      console.log('ingredients', ingredients)
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
          dispatch(getRecipes(recipes))

      })
    })
    .catch(console.log)
}

export function fetchIDofDefNutrient(nutrient) {
  return function thunk(dispatch) {
    return axios.get(`/api/nutrients/${nutrient}`)
      .then(res => res.data)
      .then(defNutId => {
        const nutID = defNutId.apiId
        const nutSuggested = defNutId.suggested
        return axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&requirePictures=true&allowedIngredient=salt&nutrition.${nutID}.min=${nutSuggested}&maxResult=75`)
          .then(res => res.data)
          .then(recipes =>{
            dispatch(getRecipes(recipes.matches))
          })
          .catch(console.error)
      })

  }
}

export const getRecipesByDefNutr = (deficientNutrientFoods) => dispatch => {
  const food1 = axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&q=${deficientNutrientFoods[0]}&maxResult=50`)
  const food2 = axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&q=${deficientNutrientFoods[1]}&maxResult=50`)
  const food3 = axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&q=${deficientNutrientFoods[2]}&maxResult=50`)

  Promise.all([food1, food2, food3])
  .then(promises => {
    let recipes = []
    promises.forEach(promise => {
      recipes = recipes.concat(promise.data.matches)
    })
    return recipes
  })
  .then(recipes => {
    dispatch(getRecipes(recipes))

  })
  .catch(console.log)

}

export const getRecipeDetails = (recipeId) => dispatch => {
  return axios.get(`http://api.yummly.com/v1/api/recipe/${recipeId}?_app_id=${app_id}&_app_key=${app_key}`)
    .then(res => res.data)
    .then(recipe => {
      window.location = recipe.source.sourceRecipeUrl
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

