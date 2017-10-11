import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Delete from 'material-ui/svg-icons/action/delete'
import {deleteIngredient, clearList, removeRecipeFromList} from '../store'


class ShoppingList extends Component {
  constructor(props) {
    super(props)

    this.handleRecipeClick = this.handleRecipeClick.bind(this)
  }

  handleRecipeClick(evt, url) {
    window.open(url)
  }

  render() {
    return (
      <List style={{maxHeight: '400', overflowY: 'auto'}}>
      <ul>
        <h3>Shopping List</h3>
        <Subheader>Ingredients</Subheader>
        {
          this.props.shoppingList.ingredients.map(item => {
            return (
              <li key={item} style={{marginLeft: '15px'}}>{item}
              </li>
            )
          })
        }
        <br/>
        <Subheader>Recipes</Subheader>
        {
          this.props.shoppingList.recipeDetails.map(recipe => {
            return (
              <div key={recipe.name}>
              <li style={{marginLeft: '15px'}}
              onClick={(evt)=>this.handleRecipeClick(evt,recipe.url)}>
              {recipe.name}
              </li>
              <span style={{textAlign: 'right'}}>
              <Delete onClick={(evt)=>this.props.removeRecipe(evt,recipe.name)} />
              </span>
              </div>
            )
          })
        }
      </ul>
      </List>
    )
  }
}

const mapProps = (state) => {
  return {
    shoppingList: state.shoppingList
  }
}

const mapState = (dispatch) => {
  return {
    // handleDeleteIng(evt, item) {
    //   dispatch(deleteIngredient(item))
    // },
    clearShoppingList() {
      dispatch(clearList({ingredients: [], recipeDetails: []}))
    },
    removeRecipe(evt, name) {
      dispatch(removeRecipeFromList(name))
    },
  }
}

export default withRouter(connect(mapProps, mapState)(ShoppingList));
