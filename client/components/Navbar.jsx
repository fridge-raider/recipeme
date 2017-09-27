import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { Container, Menu, Grid } from 'semantic-ui-react'

class Navbar extends Component {
  
  render() {
    return (
      <Menu>
        <Menu.Item>
        </Menu.Item>
      </Menu>
    )
  }
}

// import React, { Component } from ‘react’
// import PropTypes from ‘prop-types’
// import { connect } from ‘react-redux’
// import { withRouter, Link, NavLink } from ‘react-router-dom’
// import { logout } from ‘../store’
// import { Container, Menu, Grid } from ‘semantic-ui-react’

// /**
//  * COMPONENT
//  *  The Main component is our ‘picture frame’ - it displays the navbar and anything
//  *  else common to our entire app. The ‘picture’ inside the frame is the space
//  *  rendered out by the component’s `children`.
//  */
// class Main extends Component {

//  render() {
//     return (
//       <div>
//         <Menu color=‘grey’ size=‘large’ inverted secondary className=‘nav-bar’>
//           <Menu.Item>
//             <img src=‘https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Olympic_pictogram_Athletics_-_colored.svg/1024px-Olympic_pictogram_Athletics_-_colored.svg.png' />
//             <NavLink to=‘/home’>Run With Friends</NavLink>
//           </Menu.Item>
//           { this.props.isLoggedIn &&
//           <Menu.Item>
//             <a href=‘/profile’>Your Profile & Run History
//             </a>

//          </Menu.Item>
//           }
//           { this.props.isLoggedIn &&
//           <Menu.Item>
//             <a href=‘/’ onClick={this.props.handleClick}>Logout
//             <br></br>
//             <small>{this.props.currentUser.email}</small>
//             </a>
//           </Menu.Item>
//           }
//           { !this.props.isLoggedIn &&
//             <Menu.Item>
//               <a href=‘/login’ onClick={this.props.handleClick}>Login or Sign Up</a>
//             </Menu.Item>
//           }
//         </Menu>
//       </div>

//    )
//   }
// }