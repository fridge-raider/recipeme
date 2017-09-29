import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Container, Form, Grid } from 'semantic-ui-react'
import RecipeCard from './RecipeCard'
import { getRecipesByIngredient } from '../store'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mainIngredient: ''
    }
  }

  render() {
    const options = [
      { key: 'chn', text: 'Chinese', value: 'chinese' },
      { key: 'krn', text: 'Korean', value: 'korean'},
      { key: 'ity', text: 'Italian', value: 'italian'}
    ]
    console.log(this.props.getRecipes)

    return (
      <div>
        <Form onSubmit={this.props.handleSubmit(this.state.mainIngredient)}>
          <Form.Group widths='equal'>
            <Form.Input 
              label='Main ingredient' 
              placeholder='what do you want to eat today?' 
              onChange={evt => this.setState({ mainIngredient: evt.target.value })}
            />
            <Form.Select label='Cuisine' options={options} placeholder='Anything' />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

const mapProps = (state) => {
  return {
    getRecipes: state.getRecipes
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: (ingred) => {
      dispatch(getRecipesByIngredient(ingred))
    }
  }
}

export default withRouter(connect(mapProps, mapDispatch)(Home));