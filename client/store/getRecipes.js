import axios from 'axios'
import secrets from '../../secrets'
import Promise from 'bluebird'

const app_id = process.env.YUMMLY_ID
const app_key = process.env.YUMMLY_KEY

const GET_RECIPES = 'GET_RECIPES'

const getRecipes = recipes => ({ type: GET_RECIPES, recipes })

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
      const ing1 = axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&requirePictures=true&allowedIngredient=${ingredients[0].name}&maxResult=10`)
      const ing2 = axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&requirePictures=true&allowedIngredient=${ingredients[1].name}&maxResult=10`)

      Promise.all([ing1, ing2])
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
    })
    .catch(console.log)
}

export const getRecipesByDefNutr = (deficientNutrientFoods) => dispatch => {
  const food1 = axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&q=${deficientNutrientFoods[0]}&maxResult=10`)
  const food2 = axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&q=${deficientNutrientFoods[1]}&maxResult=10`)
  const food3 = axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&q=${deficientNutrientFoods[2]}&maxResult=10`)

  // let total = food1.concat(food2)
  console.log('in the thunkkkk', food1)
  return Promise.all([].concat(food1).concat(food2).concat(food3))
    .then(promises => {
      console.log(promises); 
      return promises.map(promise => promise.data)
    })
    .then(recipes => {
      dispatch(getRecipes(recipes))
    })
    .catch(console.log)
}

// export const getRecipesByDefNutr = (deficientNutrient) => dispatch => {
//   return axios.get(`/api/nutrients/${deficientNutrient}`)
//     .then(res => res.data)
//     .then(nut => {
//       const nutID = nut.apiId
//       return axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&nutrition.${nutID}.min=0&nutrition.${nutID}.max=50`)
//         .then(recipes => console.log('pls', recipes))
//     })
// }

const getRecipesReducer = (state=[], action) => {
  switch(action.type) {
    case GET_RECIPES:
      return action.recipes
    default:
      return state
  }
}

export default getRecipesReducer

