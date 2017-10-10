/**
 * ACTION TYPES
 */
const SET_SHOPPING_LIST = 'SET_SHOPPING_LIST'

/**
 * ACTION CREATORS
 */
export const setShoppingList = list => ({ type: SET_SHOPPING_LIST, list })

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_SHOPPING_LIST:
      const newList = state.shoppingList.concat(action.list)
      const newListUnique = newList.filter(function (item, i, ar) { return ar.indexOf(item) === i; })
      return newListUnique
    default:
      return state
  }
}
