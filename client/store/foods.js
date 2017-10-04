import axios from 'axios'
import secrets from '../../secrets'
import history from '../history'
import { getRecipesByDefNutr } from './getRecipes'

const Yapp_id = process.env.YUMMLY_ID
const Yapp_key = process.env.YUMMLY_KEY

const NDBapp_key = process.env.NDB_KEY

/**
 * ACTION TYPES
 */
const GET_FOODS = 'GET_FOODS'

/**
 * ACTION CREATORS
 */
export const getFoodsFromNutrients = foods => ({type: GET_FOODS, foods})
/**
 * THUNK CREATORS
 */

 //https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${NDBapp_key}&nutrients=${nutID}&fg=1300&fg=1800&fg=2000&fg=0100&fg=0400&fg=1500&fg=0900&fg=1700&fg=1600&fg=1200&fg=1000&fg=0500&fg=0700&fg=0600&fg=1900&fg=1100&max=100&sort=c
export function fetchIDofDefNutrient(nutrient) {
  return function thunk(dispatch) {
    return axios.get(`/api/nutrients/${nutrient}`)
      .then(res => res.data)
      .then(defNutId => {
        const nutID = defNutId.apiId
        return axios.get(`https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${NDBapp_key}&nutrients=${nutID}&fg=1300&fg=2000&fg=0100&fg=1500&fg=0900&fg=1700&fg=1200&fg=1000&fg=0500&fg=1100&max=100&sort=c`)
          .then(res => res.data.report.foods)
          .then(foodArr => {
            let uniqueFood = new Set()
            for (let i=0; i<foodArr.length || i<100; i++) {
              uniqueFood.add(foodArr[i].name.split(', ')[0])
            }
            let threeUnique = []
            for (let item of uniqueFood) threeUnique.push(item)
            threeUnique = threeUnique.slice(0,3)
            dispatch(getRecipesByDefNutr(threeUnique))
          })
          .catch(console.error)
      })
    
  }
}



/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_FOODS:
      return action.foods
    default:
      return state
  }
}
