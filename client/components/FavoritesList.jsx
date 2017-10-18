// libraries and packages
import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import FuzzySearch from 'fuzzysearch-js'
import levenshteinFS from 'fuzzysearch-js/js/modules/LevenshteinFS'
import indexOfFS from 'fuzzysearch-js/js/modules/IndexOfFS'
import wordCountFS from 'fuzzysearch-js/js/modules/WordCountFS'

import { getRecipeDetails } from '../store'

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

class FavoritesList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ingredients: []
    }
    this.renderFuzzySearch = this.renderFuzzySearch.bind(this)
    this.renderSearchValue = this.renderSearchValue.bind(this)
  }

  renderFuzzySearch() {
    let ingredList = []
    this.props.favoriteRecipes.forEach((recipe) => {
      ingredList = ingredList.concat(recipe.ingredientsList)
    })

    let fuzzySearch = new FuzzySearch(ingredList, {'minimumScore': 300});
    fuzzySearch.addModule(levenshteinFS({'maxDistanceTolerance': 3, 'factor': 3}));
    fuzzySearch.addModule(indexOfFS({'minTermLength': 3, 'maxIterations': 500, 'factor': 3}));
    fuzzySearch.addModule(wordCountFS({'maxWordTolerance': 3, 'factor': 1}));

    return fuzzySearch.search(this.props.search)
  }

  renderSearchValue(searchResult) {
    const { favoriteRecipes, search } = this.props
    let searchValues = []
    if (searchResult) searchValues = searchResult.filter(result => result.score > 500)

    let recipeSet = new Set()
    searchValues.forEach((value) => {
      favoriteRecipes.forEach((recipe) => {
        if (recipe.ingredientsList.includes(value.value) || recipe.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1) {
          recipeSet.add(recipe)
        }
      })
    })
    let recipeArr = Array.from(recipeSet)
    return recipeArr
  }

  render() {

    const { favoriteRecipes } = this.props
    let searchResult = this.renderFuzzySearch()
    const search = this.renderSearchValue(searchResult)

    return (
      <List style={{maxHeight: '350px', overflowY: 'auto'}}>
        { (!search.length && search == '') ? favoriteRecipes.map(recipe => {
          return (<ListItem
              primaryText={recipe.name}
              key={recipe.name}
              leftAvatar={<Avatar size={40} style={{borderStyle: 'solid', borderColor: 'pink', borderWidth: 3}} src={recipe.image} />}
              onClick={(evt) => this.props.handleClick(evt, recipe.yummlyID)}
            />)
          }) : search.map(recipe => {
          return (<ListItem
              primaryText={recipe.name}
              key={recipe.name}
              leftAvatar={<Avatar size={40} style={{borderStyle: 'solid', borderColor: 'pink', borderWidth: 3}} src={recipe.image} />}
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
