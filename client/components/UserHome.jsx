import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchFavoriteRecipes, 
  fetchCategoryOrderHistory, 
  fetchNutrientOrderHistory, 
  fetchDeficientCategories, 
  fetchDeficientNutrients, 
  getRecipesByDefCategory, 
  getRecipesByIngredient, 
  fetchIngredientNames, 
  getRecipeDetails } from '../store'
import SearchBar from 'material-ui-search-bar'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Divider from 'material-ui/Divider';
import {Grid, Container, Menu} from 'semantic-ui-react'
import Paper from 'material-ui/Paper';
import GraphVisualizations from './GraphVisualizations.jsx'
// import store, { fetchFavoriteRecipes } from '../store'


/**
 * COMPONENT
 */
export class UserHome extends Component {

  componentWillMount() {
    this.props.initialData()
    // store.dispatch(fetchFavoriteRecipes())
  }


  render() {
    const { favoriteRecipes } = this.props
    return (
      <div fluid style={{backgroundColor:'#F5F5F5', marginTop:-20}}>
        <div className="ui grid"> 
        <div className="row" style={{margin:0}}>
          <div className="four wide column">
            <Paper style={{height:"100%", width:"100%", marginLeft:10, overflowY:"scroll"}} zDepth={2}>
             <List>
                <Subheader>Favorite Recipes</Subheader>
                <SearchBar 
                  style={{borderRadius:25, maxWidth:"90%", marginLeft:20, maxHeight:40, marginBottom:15}}
                  hintText="Search Favorite Recipes"
                />
                { favoriteRecipes && favoriteRecipes.map((recipe) => {
                  return ( 
                  <ListItem
                    primaryText={recipe.name}
                    leftAvatar={<Avatar size={40} style={{borderStyle: "solid", borderColor: "pink", borderWidth: 3}} src={recipe.image} />}
                    onClick={(evt) => this.props.handleClick(evt, recipe.yummlyID)}
                  /> )
                })}
              </List>
              <Divider />
              <List>
                <Subheader>Ingredients List</Subheader>
                <ListItem
                  primaryText="Cabbage"
                />
                <ListItem
                  primaryText="Chicken"
                />
                <ListItem
                  primaryText="Bread"
                />
                <ListItem
                  primaryText="Cheese"
                />
                <ListItem
                  primaryText="Pasta"
                />
              </List>
            </Paper> 
          </div>
          <div className="twelve wide column" style={{paddingRight:30}}>
          { !this.props.categoryHistory.length &&
            <h2> You have no past purchasing history. Go Upload a Reciept! </h2>
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
      dispatch(fetchIngredientNames()) // can do this before logging in to speed up
      dispatch(fetchFavoriteRecipes())
    },
    handleClick(evt, recipeId) {
      dispatch(getRecipeDetails(recipeId))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
