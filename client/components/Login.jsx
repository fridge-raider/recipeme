import React, { Component } from 'react';
import { Button, Checkbox, Container, Form, Grid, Icon, Image, Segment } from 'semantic-ui-react'
import RaisedButton from 'material-ui/RaisedButton'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {auth} from '../store'
// import { injectGlobal } from 'styled-components'
// import AliceFont from '../../public/StarsFromOurEyes.ttf';
// injectGlobal`
//   @font-face {
//     font-family: 'PTC55F';
//     src: url(${AliceFont}) format('truetype');
//     font-weight: normal;
//     font-style: normal;
//   }
// `;

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
    const imgCircle = {
      height: "150px",
      width: "180px",
      position: "absolute",
      left: "50vw",
      top:"35vh", 
      marginLeft:"-90px", 
      borderRadius:"50%"
    }

    const button = {
      marginTop: "100px", 
      left: "50vw",
      borderRadius:50
    }

    const food1 = {
      backgroundImage: `url("https://lh3.googleusercontent.com/FR5KGzul750E4SFIjmV6vUFphLzZn9TTDt6YMVi6L4_2XRspoubXNngHdp4B4hV1uvKmf0maNQVpPXUk6exh8w=s320-c-e365")`, 
      backgroundSize: "100%", 
      backgroundRepeat: "no-repeat", 
      backgroundSize: "cover",
      marginBottom:0.5,
      opacity: 1.5
    }

    const food2 = {
      backgroundImage: `url("https://lh3.googleusercontent.com/dTIMzMwlvF3_B2a254WRzrYqooxMwXBqnWY-Zcrv4fpR4i4TWHdZXqHbzB_q8fwOBOX2TaVYUlsS1huNHCxjzx8=s320-c-e365")`, 
      backgroundSize: "100%", 
      backgroundRepeat: "no-repeat", 
      backgroundSize: "cover",
      marginBottom:0.5,
      opacity: 1.5
    }

    const food3 = {
      backgroundImage: `url("https://lh3.googleusercontent.com/4VRowJtHAQ2BiCWKZczFf8rJ1L8m4N4u18FO5UzOHF2F0HiFZvSOH2ldeQo4XqkqiJOvK_E873ufYC2SFLMCQg=s320-c-e365")`,
      backgroundSize: "100%", 
      backgroundRepeat: "no-repeat", 
      backgroundSize: "cover",
      marginBottom:0.5,
      opacity: 1.5, 
    }

    const food4 = {
      backgroundImage: `url("https://lh3.googleusercontent.com/IcYpfainJZDHfnMJqLyJP1L4L1-zaCW-rHXZUAJf8NYTUDcLtf-ZiF-b8ufmNkhD91Uezpmw-YP4cuWgpFiR5A=s320-c-e365")`, 
      backgroundSize: "100%", 
      backgroundRepeat: "no-repeat", 
      backgroundSize: "cover", 
      marginBottom:0.5,
      opacity: 1.5
    }
    const shade = {
      backgroundImage: `url("https://static.pexels.com/photos/139321/pexels-photo-139321.jpeg")`,
      backgroundSize: "100%",
      backgroundSize: "cover"
    }

    return (
      <div style={shade}> 
        <div className="ui grid" style={{marginTop:-10}}> 
          <div className="row" style={{minHeight:"50vh"}}> 
            <div className="four wide column olive" style={food1}></div> 
            <div className="four wide column black" style={food2}> </div>
            <div className="four wide column olive" style={food3}> </div> 
            <div className="four wide column black" style={food4}> </div>  

          </div> 

          <div className="row blur" style={{minHeight:400, padding:0}}> 
             <span className="title" style={{opacity: 1, marginTop: 70, marginLeft: "38vw", color: "#EC2657", fontSize: 100, fontWeight: "bolder", textShadow: "2px 2px white"}}>RecipeME</span>
            <div className="sixteen wide column" ><div style={{marginTop: -50, marginLeft: "39.8vw"}}><a href='/auth/google'><RaisedButton secondary={true} label="Sign Up and Login with Google" style={button}/></a></div></div> 
            <span 
              className="subsubTitle"
              style={{opacity: 1, marginTop: 100, marginLeft: "80vw", color: "white", fontSize: 30, fontWeight: "bolder"}}
            >Made with love ~ p*a*m</span>
          </div> 
          <img style={imgCircle} src="http://cdn.appstorm.net/android.appstorm.net/android/files/2013/08/Logo-Burpple1.png"></img>
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
