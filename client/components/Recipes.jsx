import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Search, Header, Card, Container, Form } from 'semantic-ui-react'
import RecipeCard from './RecipeTiles.jsx'
import { getRecipesByIngredient } from '../store'
import SearchBar from 'material-ui-search-bar'
import _ from 'lodash'
import { GridList, GridTile } from 'material-ui/GridList';

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
        style={{borderRadius:25, maxWidth:"flex"}}
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
      <Container fluid style={{padding: '1em 2em'}} >

        <h2>Recommended Recipes</h2> 
        <p>(based on your past purchases)</p>
        { this.renderSearch() }
        <br /><br />

          <GridList
            cellHeight={500}
            style={styles.gridList}
            cols={3}
            padding={6}
          >
          { (search.length) ? search.map(recipe => {
              return <RecipeCard key={recipe.id} recipe={recipe} />
            }) : getRecipes.map(recipe => {
              return <RecipeCard key={recipe.id} recipe={recipe} /> })}
            
          </GridList>


      </Container>

    )
  }
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 'flex',
    height: 'flex',
    overflowY: 'flex',
  },
};

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
