import React from 'react';
import { connect } from 'react-redux'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import {getRecipeDetails} from '../store'


export class RecipeTiles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleMouseEnter(e) {
    this.setState({ hover: true })
  }

  handleMouseLeave (e) {
    this.setState({ hover: false })
  }


  render() {
    //1600
    const { recipe } = this.props
    let imageUrl = recipe.imageUrlsBySize["90"].split('=')[0]
    imageUrl = imageUrl + "=s1600-c"
    const actionIcons = [<StarBorder color="white" />, <FavoriteBorder color="white" />]
    // console.log('hi', recipe)
    return (
        <GridTile
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          key={recipe.id}
          title={this.hover ? "Ingredients" : recipe.recipeName}
          subtitle={<span>by <b>{recipe.sourceDisplayName}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={imageUrl}
            onClick={(evt) => this.props.handleClick(evt, recipe.id)} />
        </GridTile>



    )
  }

}


const mapDispatch = (dispatch) => {
  return {
    handleClick(evt, recipeId) {
      dispatch(getRecipeDetails(recipeId))
    }
  }
}

export default connect(null, mapDispatch)(RecipeTiles)