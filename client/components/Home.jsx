import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Image, Icon, Card, Container, Form, Grid } from 'semantic-ui-react'
import Login 

class HomePage extends Component {

  render () {
    return (
      <div>
      <header class="header" id="top">
        <div class="text-vertical-center">
          <h1>Start Bootstrap</h1>
          <h3>Free Bootstrap Themes &amp; Templates</h3>
          <br />
          <a href="#about" class="btn btn-dark btn-lg js-scroll-trigger">Find Out More</a>
        </div>
      </header>
      </div>
    )
  }
}