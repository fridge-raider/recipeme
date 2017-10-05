import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchCategoryOrderHistory, fetchNutrientOrderHistory, fetchDeficientCategories, fetchDeficientNutrients, getRecipesByDefCategory, getRecipesByIngredient} from '../store'
import {Grid, Container, Menu} from 'semantic-ui-react'
import GraphVisualizations from './GraphVisualizations.jsx'
import { Carousel } from 'react-responsive-carousel'


/**
 * COMPONENT
 */
export class UserHome extends Component {

  componentWillMount() {
    this.props.initialData()
  }


  render() {

    return (
      <Container fluid>

      <Grid.Column width={11} className='nurse-column'>
      { !this.props.categoryHistory.length &&
        <h2> You have no past purchasing history. Go Upload a Reciept! </h2>
      }

      {!!this.props.categoryHistory.length &&
        !!this.props.nutrientHistory.length &&
        <GraphVisualizations />
      }
      </Grid.Column>
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
    deficientCategories: state.deficientCategories
  }
}

const mapDispatch = (dispatch) => {
  return {
    initialData() {
      dispatch(fetchCategoryOrderHistory())
      dispatch(fetchNutrientOrderHistory())
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
