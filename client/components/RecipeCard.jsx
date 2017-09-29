import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Image, Icon, Card, Container, Form, Grid } from 'semantic-ui-react'

export default class RecipeCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { recipe } = this.props
    return (
      <Card>
        <Image src={recipe.smallImageUrls[0]} />
        <Card.Content>
          <Card.Header>
            {recipe.recipeName}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {recipe.sourceDisplayName}
            </span>
          </Card.Meta>
          <Card.Description>
            {recipe.ingredients.join(', ')}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            Link to full recipe
          </a>
        </Card.Content>
      </Card>
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