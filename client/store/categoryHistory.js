import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_CATEGORY_HISTORY = 'SET_CATEGORY_HISTORY'

/**
 * ACTION CREATORS
 */
export const setCategoryHistory = categories => ({type: SET_CATEGORY_HISTORY, categories})
/**
 * THUNK CREATORS
 */

export function fetchCategoryOrderHistory() {
  return function thunk(dispatch) {
    return axios.get(`/api/orders/categories`)
      .then(res => res.data)
      .then(orders => {
        dispatch(setCategoryHistory(categories));
      })
    }
  }

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_CATEGORY_HISTORY:
      return action.categories
    default:
      return state
  }
}
