import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Search, Gride, Header, Card, Container, Form, Grid } from 'semantic-ui-react'
import RecipeCard from './Tile.jsx'
import { getRecipesByIngredient } from '../store'
import SearchBar from 'material-ui-search-bar'
import _ from 'lodash'

class Recipes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      searchRecipes: [],
      value: '',
      isLoading: false
    }
    
    this.renderSearch = this.renderSearch.bind(this)
  }

  renderSearch() {
    return (
      <SearchBar 
        style={{borderRadius:25, maxWidth:1000}}
        onChange={(value) => this.setState({search: value})}
        onRequestSearch={() => console.log('hi')}
        hintText="Search by ingredient"
        />
    )
  }


  render() {
    // add filtering and searching functionality !!!
    // figure out how to send in what is deficient (cateogry or nutrient) so we can say recipes with x - add something to state
    const { getRecipes } = this.props
    const search = getRecipes.filter((recipe) => {
      return recipe.ingredients.includes(this.state.search)
    })

    return (
      <Container fluid style={{padding: '1em 2em'}}>

        <h2>Recommended Recipes</h2> 
        { this.renderSearch() }
        <br /><br />
        <Card.Group itemsPerRow='3'>
          { (search.length) ? search.map(recipe => {
            return <RecipeCard key={recipe.id} recipe={recipe} />
          }) : getRecipes.map(recipe => {
            // console.log('hi')
            return <RecipeCard key={recipe.id} recipe={recipe} /> })}
          
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
