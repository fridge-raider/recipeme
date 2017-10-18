import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { Container, Grid, Loader } from 'semantic-ui-react'
import { GridList } from 'material-ui/GridList';
import SearchBar from 'material-ui-search-bar'
import RaisedButton from 'material-ui/RaisedButton'

import RecipeCard from './RecipeTiles.jsx'
import { getRecipesByIngredient, getRecipes } from '../store'

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
    if (this.props !== nextProps) {
      this.setState({ isLoading: false })
    }
  }

  componentDidMount() {
    if (this.props.autopopRecipes.length && !this.state.hasRequested) {
      this.setState({ isLoading: false })
    }
  }

  renderSearch() {
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <SearchBar
              style={{ borderRadius: 25, maxWidth: 'flex' }}
              onChange={(value) => {
                this.setState({ mainIngredient: value })
              }}
              onRequestSearch={(evt) => {
                this.handleSubmit(evt, this.state.mainIngredient)
              }}
              hintText="Begin new search by ingredient!"
            />
          </Grid.Column>
          <Grid.Column>
            <RaisedButton backgroundColor="#E62342" style={{ opacity: 0.7, marginTop: 5, paddingTop: 2.5, paddingBottom: 2, borderRadius: 50, paddingLeft: 20, paddingRight: 20, backgroundColor: '#E62342' }} onClick={(evt) => this.handleSubmit(evt, this.state.mainIngredient)}><span style={{ color: 'white' }}>Find Recipes!</span></RaisedButton>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  handleSubmit(evt, mainIngredient) {
    this.setState({ isLoading: true, hasRequested: true })
    this.props.handleSubmit(evt, mainIngredient)
  }

  render() {
    let subtitle = ''
    if (this.props.categoryHistory.length) {
      subtitle = `Auto-populated with recipes with ${this.props.deficientCategories.defCategory.toLowerCase()} (your largest deficiency), based on past purchases`
    }
    else {
      subtitle = `Auto-populated with recipes including popular ingredients`
    }
    return (
      <Container fluid style={{ padding: '1em 2em' }}>
        <h2 style={{ fontSize: 40 }}>Recipes</h2>
        {
          !this.state.hasRequested &&
          <p style={{ fontStyle: 'italic' }}>{subtitle}</p>
        }

        {this.renderSearch()}
        <br />
        <div style={styles.root}>
          {
            (this.state.isLoading)
              ? (<Loader active inline="centered">Loading Recipes!</Loader>)
              : (
                <GridList
                  cols={3}
                  cellHeight={300}
                  style={styles.gridList}
                >
                  {!this.state.hasRequested ?
                    this.props.autopopRecipes.map(recipe => {
                      return <RecipeCard key={recipe.id} recipe={recipe} />
                    })
                    :
                    this.props.getRecipes.map(recipe => {
                      return <RecipeCard key={recipe.id} recipe={recipe} />
                    })
                  }
                </GridList>
              )
          }
        </div>

      </Container>
    )
  }
}

const mapProps = (state) => {
  return {
    getRecipes: state.getRecipes,
    autopopRecipes: state.autopopRecipes,
    deficientCategories: state.deficientCategories,
    categoryHistory: state.categoryHistory,
  }
}

const mapDispatch = (dispatch) => {
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
