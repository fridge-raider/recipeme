import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Search, Gride, Header, Card, Container, Form, Grid } from 'semantic-ui-react'
import RecipeCard from './Tile.jsx'
import { getRecipesByIngredient } from '../store'

class Recipes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      searchRecipes: [],
      value: ''
    }
    
    this.renderSearch = this.renderSearch.bind(this)
  }

  renderSearch() {
    return (
      <Search 
        onSearchChange={(evt) => this.setState({search: evt.target.value})}/>
    )
  }

  render() {
    // add filtering and searching functionality !!!
    // figure out how to send in what is deficient (cateogry or nutrient) so we can say recipes with x - add something to state
    // console.log(this.state)
    const { getRecipes } = this.props

    return (
      <Container fluid style={{padding: '1em 2em'}}>

        <h2>Recipes</h2>
        <br />
        { this.renderSearch() }
        <br />
        <Card.Group itemsPerRow='3'>
          { getRecipes && getRecipes.map(recipe => {
            return <RecipeCard key={recipe.id} recipe={recipe} /> })
          }
        </Card.Group>
      </Container> /////
    )
  }
}

const mapProps = (state) => {
  return {
    getRecipes: state.getRecipes
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: (evt, ingred) => {

    }
  }
}

export default withRouter(connect(mapProps, mapDispatch)(Recipes));
