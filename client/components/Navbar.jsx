import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { withRouter, Link, NavLink } from 'react-router-dom'
import { Container, Menu, Grid } from 'semantic-ui-react'


export default class Navbar extends Component {
  
  render() {
    return (
      <Menu color='grey' size='large' inverted secondary className='nav-bar'>
        <Menu.Item>
          <img src='http://cdn.appstorm.net/android.appstorm.net/android/files/2013/08/Logo-Burpple1.png' />
          <NavLink to='/'>FeedMe</NavLink>
        </Menu.Item>
        <Menu.Item>
            <NavLink to='/signup'>Sign Up</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to='/login'>Log In</NavLink>
        </Menu.Item>
      </Menu>
    )
  }
}


