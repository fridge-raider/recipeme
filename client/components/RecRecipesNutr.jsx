import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Card, Container, Form, Grid } from 'semantic-ui-react'
import RecipeCard from './Tile.jsx'
import { fetchIDofDefNutrient, getRecipesByDefNutr } from '../store'

class RecRecipesNutr extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.handleFoods("nf_protein")
  }

  render() {
    console.log('in comp', this.props.getRecipes)
    return (
      <div>hi</div>

    )
  }
}


const mapProps = (state) => {
  return {
    getRecipes: state.getRecipes,
    foods: state.foods
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleFoods: (nutrient) => {
      dispatch(fetchIDofDefNutrient(nutrient))
    }
  }
}

export default withRouter(connect(mapProps, mapDispatch)(RecRecipesNutr));
