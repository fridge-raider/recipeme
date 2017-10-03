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
      <Container fluid className='login-container'>
        <Grid centered columns={4}>
        <div>Hello</div>

        <img src='../../public/cookies_recipe_img.jpg'/>
        </Grid>
        <Grid centered columns={2}>
          <Grid.Column>
            <Segment.Group>
              <Segment textAlign='center' color='blue' inverted>

                Welcome to RecipeMe!
              </Segment>
              <Segment>
                <Form onSubmit={this.props.handleSubmit}>
                  <Form.Field>
                    <label>Email</label>
                    <input name='email' type='text' placeholder='joesmith@gmail.com' onChange={this.handleEmail}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input name='password' type='password' placeholder='Password' onChange={this.handlePassword}/>
                  </Form.Field>
                  <br>
                  </br>
                  <Link to="/home">
                    <Button type="submit" color='teal' onClick={(evt)=>this.props.handleSubmit(evt,this.state, 'login')}>
                      Login
                      <Icon name='arrow right'></Icon>
                    </Button>
                  </Link>
                  <Link to="/home">
                  <Button type="submit" color='teal' onClick={(evt)=>this.props.handleSubmit(evt,this.state,'signup')}>
                    New User? Sign Up
                    <Icon name='arrow right'></Icon>
                  </Button>
                </Link>
                {this.props.error && this.props.error.response && <div> {this.props.error.response.data} </div>}
                </Form>
                or<a href='/auth/google'> Sign Up or Log in with Google+</a>
              </Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid>
      </Container>
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
