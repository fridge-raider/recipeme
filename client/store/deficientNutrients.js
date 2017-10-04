import axios from 'axios'
import secrets from '../../secrets'
import history from '../history'

const Yapp_id = process.env.YUMMLY_ID
const Yapp_key = process.env.YUMMLY_KEY

const NBDapp_key = process.env.NBD_KEY

/**
 * ACTION TYPES
 */
const SET_DEF_NUTRIENTS = 'SET_DEF_NUTRIENTS'

/**
 * ACTION CREATORS
 */
export const setDeficientNutrients = nutrients => ({type: SET_DEF_NUTRIENTS, nutrients})
/**
 * THUNK CREATORS
 */

export function fetchDeficientNutrients(nutrientHistory) {
  return function thunk(dispatch) {
    return axios.put(`/api/orders/nutrients/deficient`, {nutrientHistory})
      .then(res => res.data)
      .then(defNutrients => {
        dispatch(setDeficientNutrients(defNutrients));
      })
  }
}

// export function fetchIDofDefNutrient(nutrient) {
//   return function thunk(dispatch) {
//     return axios.get(`/api/nutrients/${nutrient}`)
//       .then(res => res.data)
//       .then(defNutId => {
//         return axios.get(`https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${NBDapp_key}&nutrients=211&nutrients=328&nutrients=636&sort=c`)
//       })
//   }
// }



// export const getFoodsbyNutrient = (nutrient) => dispatch => {
//   // return console.log(ingredient,'inreducer')
//   return axios.get(`https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${NBDapp_key}&nutrients=211&nutrients=328&nutrients=636&sort=c`)
//     .then(res => res.data.foods)
//     .then(recipes => {
//       dispatch(getRecipes(recipes.matches))
//     })
//     .catch(console.log)
// }

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_DEF_NUTRIENTS:
      return action.nutrients
    default:
      return state
  }
}
