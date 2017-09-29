import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'
import { getRecipesByIngredient } from '../store'

export default class RecipeCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
  
  }
}

const mapState = (state) => {
  return {
    getRecipes: state.getRecipes
  }
}

const mapDispatch = (dispatch) => {
  return {
    
  }
}