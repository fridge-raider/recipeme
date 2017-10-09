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
  }

  renderSearch() {
    return (
      <SearchBar 
        style={{borderRadius:25, maxWidth:"flex"}}
        onChange={(value) => {
          this.setState({mainIngredient: value})
          }}
        onRequestSearch={(evt) => this.props.handleSubmit(evt, this.state.mainIngredient)} 
        hintText="Enter your favorite ingredient!"
        />
    )
  }

  render() {
    const { getRecipes } = this.props
    let counter = 0;
    console.log(this.state)
    return (
      <Container fluid style={{ padding: '1em 2em' }}>
        { this.renderSearch() }
        <br />
        <div style={styles.root}>

          <GridList
          cols={3}
          cellHeight={300}
          style={styles.gridList}
          >
            { getRecipes && getRecipes.map(recipe => {
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
    getRecipes: state.getRecipes
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: (evt, ingred) => {
      dispatch(getRecipesByIngredient(ingred))
      // evt.preventDefault()
    }
  }
}

export default withRouter(connect(mapProps, mapDispatch)(FindRecipes));
