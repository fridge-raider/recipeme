import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Card, Container, Form, Grid } from 'semantic-ui-react'
import RecipeCard from './Tile.jsx'
import { getRecipesByIngredient } from '../store'

class FindRecipes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mainIngredient: ''
    }
  }

  render() {
    const { getRecipes } = this.props
    const options = [
      { key: 'chn', text: 'Chinese', value: 'chinese' },
      { key: 'krn', text: 'Korean', value: 'korean'},
      { key: 'ity', text: 'Italian', value: 'italian'}
    ]
    console.log(getRecipes)
    let counter = 0;

    return (
      <Container fluid style={{padding: '1em 2em'}}>
        <Form onSubmit={(evt) => this.props.handleSubmit(evt, this.state.mainIngredient)}>
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
        <br />
        <Card.Group itemsPerRow='3'>
          { getRecipes && getRecipes.map(recipe => {
            return <RecipeCard key={recipe.id} recipe={recipe} /> })
          }
        </Card.Group>
      </Container>
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
    handleSubmit: (evt, ingred) => {
      dispatch(getRecipesByIngredient(ingred))
      evt.preventDefault()
    }
  }
}

export default withRouter(connect(mapProps, mapDispatch)(FindRecipes));
