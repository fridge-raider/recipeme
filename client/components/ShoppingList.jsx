import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

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
            return <li key={item} style={{marginLeft: '15px'}}>{item}</li>
          })
        }
        <br/>
        <Subheader>Recipes</Subheader>
        {
          this.props.shoppingList.recipeDetails.map(recipe => {
            return <li key={recipe.name} style={{marginLeft: '15px'}} onClick={(evt)=>this.handleRecipeClick(evt,recipe.url)}>{recipe.name}</li>
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

export default withRouter(connect(mapProps)(ShoppingList));
