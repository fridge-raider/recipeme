import axios from 'axios'

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

const getAutopopRecipesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_AUTOPOP_RECIPES:
      return action.recipes
    default:
      return state
  }
}

export default getAutopopRecipesReducer

