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
        <Subheader style={{marginLeft:'-15px'}}>Ingredients</Subheader>
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
              <li style={{display: 'inline-block', float: 'left', width:"100%"}}>
              <span onClick={(evt)=>this.handleRecipeClick(evt,recipe.url)}>{recipe.name}</span>
              <Delete style={{float: 'right'}} onClick={(evt)=>this.props.removeRecipe(evt,recipe.name)} />
              </li>
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
