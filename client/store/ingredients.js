import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_INGREDIENT_NAMES = 'SET_INGREDIENT_NAMES'

/**
 * ACTION CREATORS
 */
export const setIngredientNames = ingredients => ({type: SET_INGREDIENT_NAMES, ingredients})
/**
 * THUNK CREATORS
 */

export function fetchIngredientNames() { 
  return function thunk(dispatch) {
    axios.get(`/api/ingredients/names`)
      .then(res => res.data)
      .then(ingredients => {
        dispatch(setIngredientNames(ingredients)); 
      }) 
  }
}
/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_INGREDIENT_NAMES:
      return action.ingredients
    default:
      return state
  }
}
