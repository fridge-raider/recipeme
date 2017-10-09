import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { withRouter, Link, NavLink } from 'react-router-dom'
import { Container, Menu, Grid } from 'semantic-ui-react'
import {getRecipes,logout} from '../store'


export class Navbar extends Component {

  render() {
    return (
      <Menu color='grey' size='large' inverted secondary className='nav-bar'>
        <Menu.Item>
          <img src='http://cdn.appstorm.net/android.appstorm.net/android/files/2013/08/Logo-Burpple1.png' />
          <NavLink to='/home'>RecipeMe</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to='/findrecipes' onClick={this.props.handleClick}>Find Recipes</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to='/receipt'>Upload Receipt</NavLink>
        </Menu.Item>
        <Menu.Menu position='right'>
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
    logout () {
      dispatch(logout())
      ownProps.history.push('/login')
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Navbar))

