import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_HISTORY = 'SET_HISTORY'

/**
 * ACTION CREATORS
 */
export const setHistory = orders => ({type: SET_HISTORY, orders})
/**
 * THUNK CREATORS
 */

export function fetchOrderHistory() {
  return function thunk(dispatch) {
    return axios.get(`/api/orders`)
      .then(res => res.data)
      .then(orders => {
        dispatch(setHistory(orders));
      })
    }
  }

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_HISTORY:
      return action.orders
    default:
      return state
  }
}
