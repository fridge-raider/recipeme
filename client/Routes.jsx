import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, UserHome, Navbar, FindRecipes, ReceiptUpload, Data, Recipes, RecRecipesNutr, SideBar} from './components'
import {me} from './store'
import {fetchFavoriteRecipes} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
    //store.dispatch(fetchFavoriteRecipes(req.user.id))
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Router history={history}>

      { (this.props.isLoggedIn)
        ? (<div className ="container-fluid">
              <Main>
                <Navbar />
                  <Switch>
                    {/* Routes placed here are available to all visitors */}
                    <Route path='/findrecipes' component={FindRecipes} />
                    <Route path='/recipes/deficiencies' component={Recipes} />
                    <Route path='/receipt' component={ReceiptUpload} />
                    <Route path='/data' component={Data} />
                    <Route path='/home' component={UserHome} />
                    <Route path='/recnutrientrecipes' component={RecRecipesNutr} />
                    <Route path='/' component={UserHome} />
                  </Switch>
              </Main>
            </div>)
        : <Login />

      }
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
