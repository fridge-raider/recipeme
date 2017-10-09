import React, { Component } from 'react';
import { Button, Checkbox, Container, Form, Grid, Icon, Image, Segment } from 'semantic-ui-react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {auth} from '../store'


class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }

  handleEmail(evt) {
    this.setState({email: evt.target.value})
  }

  handlePassword(evt) {
    this.setState({password: evt.target.value})
  }

  render(){
    return (
        <div className="ui grid" style={{marginTop:0, zIndex: 1}}> 
          <div className="row" style={{minHeight:200}}> 
            <div className="four wide column olive"> </div> 
            <div className="four wide column black"> </div>
            <div className="four wide column olive"> </div> 
            <div className="four wide column black"> </div>  

          </div> 
          <div className="row" style={{minHeight:200, zIndex: 1}}> 
            <div className="four wide column black"> </div> 
            <div className="four wide column olive"> </div> 
            <div className="four wide column black"> </div> 
            <div className="four wide column olive"> </div> 
          </div> 
          <img class="ui medium circular image" src="http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png" style={{zIndex: 3, display:"inline-block"}}></img> 
          <div className="row" style={{minHeight:400, zIndex: 1}}> 
            <div className="sixteen wide column grey"> </div> 
          </div> 


        </div> 
    )
  }
}

const mapState = (state) => {
  return {
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt, state, action) {
      evt.preventDefault()
      const email = state.email
      const password = state.password
      dispatch(auth(email, password, action))
    }
  }
}

export default connect(mapState, mapDispatch)(Login)
