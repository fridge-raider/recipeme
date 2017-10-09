import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchCategoryOrderHistory, fetchNutrientOrderHistory, fetchDeficientCategories, fetchDeficientNutrients, getRecipesByDefCategory, getRecipesByIngredient, fetchIngredientNames} from '../store'
import {Grid, Container, Menu} from 'semantic-ui-react'
import GraphVisualizations from './GraphVisualizations.jsx'


/**
 * COMPONENT
 */
export class UserHome extends Component {

  componentWillMount() {
    this.props.initialData()
  }


  render() {
    //console.log(this.props.ingredients); 
    return (
      <Container fluid style={{backgroundColor:'#F5F5F5'}}>

      { !this.props.categoryHistory.length &&
        <h2> You have no past purchasing history. Go Upload a Reciept! </h2>
      }

      {!!this.props.categoryHistory.length &&
        !!this.props.nutrientHistory.length &&
        <GraphVisualizations />
      }
      </Container>
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
