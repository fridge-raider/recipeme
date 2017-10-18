import axios from 'axios'
import {getAutopopRecipesByCategory} from './autopopRecipes'

/**
 * ACTION TYPES
 */
const SET_DEF_CATEGORIES = 'SET_DEF_CATEGORIES'

/**
 * ACTION CREATORS
 */
export const setDeficientCategories = categories => ({type: SET_DEF_CATEGORIES, categories})
/**
 * THUNK CREATORS
 */

export function fetchDeficientCategories(categoryHistory) {
  return function thunk(dispatch) {
    return axios.put(`/api/orders/categories/deficient`, {categoryHistory})
      .then(res => res.data)
      .then(defCategories => {
        dispatch(setDeficientCategories(defCategories));
        dispatch(getAutopopRecipesByCategory(defCategories.defCategory))
      })
    }
  }

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_DEF_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
