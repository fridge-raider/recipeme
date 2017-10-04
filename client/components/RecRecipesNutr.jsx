import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Card, Container, Form, Grid } from 'semantic-ui-react'
import RecipeCard from './Tile.jsx'
import { getRecipesByIngredient } from '../store'

class RecRecipesNut extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div>hi</div>
    )
  }
}


const mapProps = (state) => {
  return {
    getRecipes: state.getRecipes,
    deficientNutrients: state.deficientNutrients
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: (evt, ingred) => {
      dispatch(getRecipesByIngredient(ingred))
      evt.preventDefault()
    }
  }
}

export default withRouter(connect(mapProps)(FindRecipes));
