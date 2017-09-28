import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Container, Form, Grid } from 'semantic-ui-react'
import RecipeCard from './RecipeCard'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const options = [
      { key: 'chn', text: 'Chinese', value: 'chinese' },
      { key: 'krn', text: 'Korean', value: 'korean'},
      { key: 'ity', text: 'Italian', value: 'italian'}
    ]
    
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Input label='Main ingredient' placeholder='what do you want to eat today?' />
          <Form.Select label='Cuisine' options={options} placeholder='Anything' />
        </Form.Group>
      </Form>
    )
  }

}