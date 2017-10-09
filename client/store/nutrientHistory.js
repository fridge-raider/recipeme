import axios from 'axios'
import history from '../history'
import {fetchDeficientNutrients} from './deficientNutrients'

/**
 * ACTION TYPES
 */
const SET_NUTRIENT_HISTORY = 'SET_NUTRIENT_HISTORY'

/**
 * ACTION CREATORS
 */
export const setNutrientHistory = nutrients => ({type: SET_NUTRIENT_HISTORY, nutrients})
/**
 * THUNK CREATORS
 */

export function fetchNutrientOrderHistory() {
  return function thunk(dispatch) {
    return axios.get(`/api/orders/nutrients`)
      .then(res => res.data)
      .then(nutrients => {
        dispatch(setNutrientHistory(nutrients))
        dispatch(fetchDeficientNutrients(nutrients))
      })
    }
  }

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_NUTRIENT_HISTORY:
      return action.nutrients
    default:
      return state
  }
}
