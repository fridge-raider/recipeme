import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchFavoriteRecipes, getRecipeDetails } from '../store'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { withRouter } from 'react-router'

class FavoritesList extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { favoriteRecipes } = this.props
    const search = favoriteRecipes.filter((recipe) => {
      return recipe.ingredientsList.includes(this.props.search)
    })
    return (
      <List style={{maxHeight: 350, overflowY: "auto"}}>
        { (search.length) ? search.map(recipe => {
          return (<ListItem
              primaryText={recipe.name}
              leftAvatar={<Avatar size={40} style={{borderStyle: "solid", borderColor: "pink", borderWidth: 3}} src={recipe.image} />}
              onClick={(evt) => this.props.handleClick(evt, recipe.yummlyID)}
            />) 
          }) : favoriteRecipes.map(recipe => {
          return (<ListItem
              primaryText={recipe.name}
              leftAvatar={<Avatar size={40} style={{borderStyle: "solid", borderColor: "pink", borderWidth: 3}} src={recipe.image} />}
              onClick={(evt) => this.props.handleClick(evt, recipe.yummlyID)}
            />)
          })}
      </List>
    )
  }
}

const mapState = (state) => {
  return {
    favoriteRecipes: state.favoriteRecipes
  }
}

const mapProps = (dispatch) => {
  return {
    handleClick(evt, recipeId) {
      dispatch(getRecipeDetails(recipeId))
    }
  }
}

export default withRouter(connect(mapState, mapProps)(FavoritesList));