import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'

import { Menu } from 'semantic-ui-react'

import {getRecipes, logout} from '../store'

export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      open: false
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }
  handleMouseEnter() {
    this.setState({ hover: true })
  }

  handleMouseLeave() {
    this.setState({ hover: false })
  }

  render() {
    return (
      <Menu size="large" color="grey" inverted secondary className="nav-bar" style={{height: 60}}>
        <Menu.Item className="item">
          <img
            src="http://cdn.appstorm.net/android.appstorm.net/android/files/2013/08/Logo-Burpple1.png"
            onClick={() => this.props.handleClickImg()}
          />
          <NavLink to="/home">
            <span
              onMouseEnter={() => this.handleMouseEnter()}
              className="title"
              style={{fontSize: 30, fontWeight: 'bold'}}
            >RecipeMe</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/findrecipes" onClick={this.props.handleClick}>Find Recipes</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="receipt">Upload Receipt</NavLink>
        </Menu.Item>
        <Menu.Menu position="right">
        <Menu.Item>
          <div onClick={this.props.logout}>Logout</div>
        </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch,ownProps) => {
  return {
    handleClick () {
      dispatch(getRecipes([]))
    },
    handleClickImg () {
      ownProps.history.push('/home')
    },
    logout () {
      dispatch(logout())
      ownProps.history.push('/login')
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Navbar))

