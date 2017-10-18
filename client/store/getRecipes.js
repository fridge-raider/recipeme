import axios from 'axios'
import Promise from 'bluebird'
import history from '../history'

const GET_RECIPES = 'GET_RECIPES'

export const getRecipes = recipes => ({ type: GET_RECIPES, recipes })

export const getRecipesByIngredient = (ingredient) => dispatch => {
  return axios.get(`/api/recipes/ingredient/${ingredient}`)
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
<<<<<<< HEAD
    .then(ingredients => {
      const ing1 = axios.get(`/api/recipes/ingredient/${ingredients[0].ingredientName}`)
      let ing2 = ''
      if (ingredients[1]) {
        ing2 = axios.get(`/api/recipes/ingredient/${ingredients[1].ingredientName}`)
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
=======
    .then(recipes => {
>>>>>>> master
          dispatch(getRecipes(recipes))

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
        return axios.get(`/api/recipes`)
          .then(frequencies => frequencies.data)
          .then(ingredients => {
            const food1 = axios.get(`/ingredient/nutrient/${ingredients[0].ingredientName}/${nutID}/${nutSuggested}`)
            const food2 = axios.get(`/ingredient/nutrient/${ingredients[1].ingredientName}/${nutID}/${nutSuggested}`)
            return Promise.all([food1, food2])
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
      })

  }
}

export const getRecipeDetails = (recipeId) => dispatch => {
  return axios.get(`/api/recipes/recipedetails/${recipeId}`)
    .then(res => res.data)
    .then(recipe => {
      window.open(recipe.source.sourceRecipeUrl)
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

