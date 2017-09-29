import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Container, Form, Grid } from 'semantic-ui-react'

export default class RecipeCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div class="ui link cards">
        <div class="card">
          <div class="image">
            <img src="/images/avatar2/large/matthew.png" />
          </div>
          <div class="content">
            <div class="header">Matt Giampietro</div>
            <div class="meta">
              <a>Friends</a>
            </div>
            <div class="description">
              Matthew is an interior designer living in New York.
            </div>
          </div>
          <div class="extra content">
            <span class="right floated">
              Joined in 2013
            </span>
            <span>
              <i class="user icon"></i>
              75 Friends
            </span>
          </div>
        </div>
      </div>
    )
  }
}

// const mapState = (state) => {
//   return {
//     getRecipes: state.getRecipes
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
    
//   }
// }