import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Container, Loader } from 'semantic-ui-react'
import RecipeCard from './RecipeTiles.jsx'
import SearchBar from 'material-ui-search-bar'
import { GridList } from 'material-ui/GridList';

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

class Recipes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      searchRecipes: [],
      value: '',
      isLoading: true
    }

    this.renderSearch = this.renderSearch.bind(this)
  }

  renderSearch() {
    return (

      <SearchBar
        style={{borderRadius: 25, maxWidth: 'lex'}}
        onChange={(value) => this.setState({search: value})}
        onRequestSearch={() => console.log('hi')}
        hintText="Filter by ingredient"

        />
    )
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      //checking product has been set from state to props -- error with .length off of null
        this.setState({isLoading: false})
    }
  }

  render() {
    const { getRecipes } = this.props
    const search = getRecipes.filter((recipe) => {
      return (recipe.ingredients.includes(this.state.search) || (recipe.recipeName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1))
    })

    return (
      <Container fluid style={{padding: '1em 2em'}} >

        <h2 style={{fontSize: 40}}>Recommended Recipes</h2>
        <p style={{fontStyle: 'italic'}}>Based on your past purchases</p>
        { this.renderSearch() }
        <br /><br />
        {
          (this.state.isLoading)
          ? (<Loader active inline="centered">Loading Recipes!</Loader>)
          : (
          <GridList
            cellHeight={300}
            style={styles.gridList}
            cols={3}
            padding={6}
          >
          { (this.state.search.length) ? search.map(recipe => {
              return <RecipeCard key={recipe.id} recipe={recipe} />
            }) : getRecipes.map(recipe => {
              return <RecipeCard key={recipe.id} recipe={recipe} /> })}

          </GridList>
            )
          }


      </Container>

    )
  }
}

const mapProps = (state) => {
  return {
    getRecipes: state.getRecipes
  }
}


export default withRouter(connect(mapProps)(Recipes));
