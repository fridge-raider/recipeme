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
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import {getRecipes} from '../store'
import RaisedButton from 'material-ui/RaisedButton'


class FindRecipes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mainIngredient: '',
      isLoading: true,
      hasRequested: false
    }

    this.renderSearch = this.renderSearch.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log("inside props", nextProps.autopopRecipes);
    console.log('this.props', this.props)
    if (this.props !== nextProps) {
      //checking product has been set from state to props -- error with .length off of null
        this.setState({isLoading: false})
    }
  }

  componentDidMount() {
    console.log('in component did mount')
    if (this.props.autopopRecipes.length && !this.state.hasRequested) {
      this.setState({isLoading: false})
    }
  }

  renderSearch() {
    return (
      <Grid columns={2}>
      <Grid.Row>
      <Grid.Column>
      <SearchBar
        style={{borderRadius:25, maxWidth:"flex"}}
        onChange={(value) => {
          this.setState({mainIngredient: value})
          }}
        onRequestSearch={(evt) => {
          this.handleSubmit(evt, this.state.mainIngredient)
        }}
        hintText="Begin new search by ingredient!"
        />
        </Grid.Column>
        <Grid.Column>
        <RaisedButton backgroundColor="#a4c639" style={{borderRadius:"25"}} onClick={(evt)=>this.handleSubmit(evt, this.state.mainIngredient)}>Find Recipes!</RaisedButton>
        </Grid.Column>
        </Grid.Row>
        </Grid>
    )
  }

  handleSubmit(evt, mainIngredient) {
    this.setState({isLoading: true, hasRequested: true})
    this.props.handleSubmit(evt, mainIngredient)
  }

  render() {
    //const { getRecipes, autopopRecipes, deficientCategories } = this.props
    let counter = 0;
    let subtitle = ''
    if (this.props.categoryHistory.length) {
      subtitle = `Auto-populated with recipes with ${this.props.deficientCategories.defCategory.toLowerCase()} (your largest deficiency), based on past purchases`
    }
    else {
      subtitle = `Auto-populated with recipes with ${this.props.deficientCategories.defCategory.toLowerCase()} (your largest deficiency)`
    }
    return (
      <Container fluid style={{ padding: '1em 2em' }}>
        <h2>Recipes</h2>
        {
          !this.state.hasRequested &&
          <p style={{fontStyle: 'italic'}}>{subtitle}</p>
        }

        { this.renderSearch() }
        <br />
        <div style={styles.root}>
        {
          (this.state.isLoading)
          ? (<Loader active inline='centered'>Loading Recipes!</Loader>)
          : (
          <GridList
          cols={3}
          cellHeight={300}
          style={styles.gridList}
          >
            { !this.state.hasRequested ?
              this.props.autopopRecipes.map(recipe => {
                return <RecipeCard key={recipe.id} recipe={recipe} />
              })
              :
              this.props.getRecipes.map(recipe => {
                return <RecipeCard key={recipe.id} recipe={recipe} /> })
            }

          </GridList>
          )
        }
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
    deficientCategories: state.deficientCategories,
    categoryHistory: state.categoryHistory,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: (evt, ingred) => {
      dispatch(getRecipes([]))
      dispatch(getRecipesByIngredient(ingred))
    },
    clearRecipes: () => {
      dispatch(getRecipes([]))
    }
  }
}

export default withRouter(connect(mapProps, mapDispatch)(FindRecipes));
