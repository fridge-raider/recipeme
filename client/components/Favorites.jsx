import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'

class FindRecipes extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    store.dispatch(fetchFavoriteRecipes(req.user.id))
  }

  render() {
    return (
      <div></div>
    )
  }

}