import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchCategoryOrderHistory, fetchNutrientOrderHistory, fetchDeficientCategories, fetchDeficientNutrients, getRecipesByDefCategory, getRecipesByIngredient, fetchIngredientNames} from '../store'
import SearchBar from 'material-ui-search-bar'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Divider from 'material-ui/Divider';
import {Grid, Container, Menu} from 'semantic-ui-react'
import Paper from 'material-ui/Paper';
import GraphVisualizations from './GraphVisualizations.jsx'


/**
 * COMPONENT
 */
export class UserHome extends Component {

  componentWillMount() {
    this.props.initialData()
  }


  render() {

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
                <ListItem
                  primaryText="Chicken"
                  leftAvatar={<Avatar src="http://del.h-cdn.co/assets/15/51/1450278988-honey-soy-chicken.jpg" />}
                />
                <ListItem
                  primaryText="Lasagna"
                  leftAvatar={<Avatar src="https://assets.bonappetit.com/photos/57adf3c353e63daf11a4dfa2/16:9/w_1000,c_limit/lasagna-bolognese.jpg" />}
                />
                <ListItem
                  primaryText="Mac and Cheese"
                  leftAvatar={<Avatar src="https://www.budgetbytes.com/wp-content/uploads/2017/04/Will-It-Skillet-Mac-and-Cheese-close.jpg" />}
                />
                <ListItem
                  primaryText="Garlic Bread"
                  leftAvatar={<Avatar src="http://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/5/28/2/TM1A14F_Garlic-Bread_s4x3.jpg.rend.hgtvcom.616.462.suffix/1433523400627.jpeg" />}
                />
                <ListItem
                  primaryText="Cabbage"
                  leftAvatar={<Avatar src="https://i5.walmartimages.ca/images/Large/272/109/6000191272109.jpg?odnBound=460" />}
                />
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
    ingredients: state.ingredients
  }
}

const mapDispatch = (dispatch) => {
  return {
    initialData() {
      dispatch(fetchCategoryOrderHistory())
      dispatch(fetchNutrientOrderHistory())
      dispatch(fetchIngredientNames())
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
