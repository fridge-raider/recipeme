import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Card, Container, Form, Grid } from 'semantic-ui-react'
import RecipeCard from './RecipeTiles.jsx'
import { getRecipesByIngredient } from '../store'
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import SearchBar from 'material-ui-search-bar'

class FindRecipes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mainIngredient: ''
    }

    this.renderSearch = this.renderSearch.bind(this)
  }

  renderSearch() {
    console.log('this.props outside', this.props)
    return (
      <SearchBar
        style={{borderRadius:25, maxWidth:"flex"}}
        onChange={(value) => {
          this.setState({mainIngredient: value})
          }}
        onRequestSearch={(evt) => {
          console.log('this.props inside', this.props)
          this.props.handleSubmit(evt, this.state.mainIngredient)
        }}
        hintText="Begin new search by ingredient!"
        />
    )
  }

  render() {
    //const { getRecipes, autopopRecipes, deficientCategories } = this.props
    let counter = 0;
    console.log('this.state', this.state)
    return (
      <Container fluid style={{ padding: '1em 2em' }}>
        <h2>Recipes</h2>
        {
          !this.state.mainIngredient.length &&
          <p style={{fontStyle: 'italic'}}>Auto-populated with recipes with {this.props.deficientCategories.defCategory.toLowerCase()} (your largest deficiency), based on past purchases</p>
        }

        { this.renderSearch() }
        <br />
        <div style={styles.root}>

          <GridList
          cols={3}
          cellHeight={300}
          style={styles.gridList}
          >
            { !this.state.mainIngredient.length ?
              this.props.autopopRecipes.map(recipe => {
                return <RecipeCard key={recipe.id} recipe={recipe} />
              })
              :
              this.props.getRecipes.map(recipe => {
                return <RecipeCard key={recipe.id} recipe={recipe} /> })
            }

          </GridList>
        </div>
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
    getRecipes: state.getRecipes,
    autopopRecipes: state.autopopRecipes,
    deficientCategories: state.deficientCategories
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: (evt, ingred) => {
      console.log('in handle submit')
      dispatch(getRecipesByIngredient(ingred))
      // evt.preventDefault()
    }
  }
}

export default withRouter(connect(mapProps, mapDispatch)(FindRecipes));
