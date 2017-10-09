import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class ShoppingList extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <Container fluid style={{padding: '1em 2em'}} >
        <h1>Hello</h1>
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

    }
  }
}

export default withRouter(connect(mapProps, mapDispatch)(ShoppingList));
