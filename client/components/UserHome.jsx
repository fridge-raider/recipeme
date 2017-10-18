// libraries / packages
import React, { Component } from 'react'
import { connect } from 'react-redux'

// UI
import SearchBar from 'material-ui-search-bar'
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

// import other components
import {
  fetchFavoriteRecipes,
  fetchCategoryOrderHistory,
  fetchNutrientOrderHistory,
  fetchShoppingList,
  getRecipeDetails, getRecipes
} from '../store'
import GraphVisualizations from './GraphVisualizations.jsx'
import ShoppingList from './ShoppingList.jsx'
import FavoritesList from './FavoritesList.jsx'


/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      submit: ''
    }

    this.renderSearch = this.renderSearch.bind(this)
  }

  componentWillMount() {
    this.props.initialData()
  }

  renderSearch() {
    return (
      <SearchBar
        style={{ borderRadius: '25px', maxWidth: '90%', marginLeft: '20px', maxHeight: '40px', marginBottom: '15px' }}
        onChange={(value) => this.setState({ search: value })}
        onRequestSearch={(value) => this.setState({ submit: value })}
        hintText="Search Favorites"
      />
    )
  }

  render() {
    return (
      <div style={{ backgroundColor: '#F5F5F5', marginTop: -20 }}>
        <div className="ui grid">
          <div className="row" style={{ margin: 0 }}>
            <div className="four wide column">
              <Paper style={{ height: '100%', width: '100%', marginLeft: '10px', overflowY: 'scroll' }} zDepth={2}>
                <Subheader style={{ fontSize: 18 }}>Favorite Recipes</Subheader>
                {this.renderSearch()}
                <FavoritesList search={this.state.search} />
                <Divider />
                <Subheader style={{ fontSize: 18 }}>Shopping List</Subheader>
                <ShoppingList style={{ padding: '0px, 0px' }} />
              </Paper>
            </div>
            <div className="twelve wide column" style={{ paddingRight: 30 }}>
              {(!this.props.categoryHistory)
                ? null
                : (!this.props.categoryHistory.length) ?
                  (<h2> You have no past purchasing history. Go Upload a Reciept! </h2>)
                  : null
              }
              {!!this.props.categoryHistory.length &&
                !!this.props.nutrientHistory.length &&
                <GraphVisualizations />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    categoryHistory: state.categoryHistory,
    nutrientHistory: state.nutrientHistory,
    deficientNutrients: state.deficientNutrients,
    deficientCategories: state.deficientCategories,
    ingredients: state.ingredients,
    favoriteRecipes: state.favoriteRecipes
  }
}

const mapDispatch = (dispatch) => {
  return {
    initialData() {
      dispatch(fetchCategoryOrderHistory())
      dispatch(fetchNutrientOrderHistory())
      dispatch(fetchShoppingList())
      dispatch(fetchFavoriteRecipes())
      dispatch(getRecipes([]))
    },
    handleClick(evt, recipeId) {
      dispatch(getRecipeDetails(recipeId))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

