import axios from 'axios'
import history from '../history'

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
        dispatch(fetchDeficientNutrients(defNutrients));
      })
    }
  }

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
