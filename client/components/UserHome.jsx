import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchCategoryOrderHistory, fetchNutrientOrderHistory, fetchDeficientCategories, fetchDeficientNutrients, getRecipesByDefCategory, getRecipesByIngredient} from '../store'
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
    console.log('cathist', this.props.categoryHistory)
    console.log('nutrienthist', this.props.nutrientHistory)
    return (
      <Container fluid>
      <Grid columns={2} divided padded='horizontally' relaxed className='main-grid'>
      <Grid.Column width={5} className='patient-column'>
        <div>Favorited Recipes</div>
      </Grid.Column>
      <Grid.Column width={11} className='nurse-column'>
      {!!this.props.categoryHistory.length &&
        !!this.props.nutrientHistory.length &&
        <GraphVisualizations />
      }
      </Grid.Column>
    </Grid>
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
      dispatch(getRecipesByIngredient('chicken'))
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
