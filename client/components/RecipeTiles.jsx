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
    console.log('hi')
    this.setState({ hover: true })
  }

  handleMouseLeave (e) {
    console.log('bye')
    this.setState({ hover: false })
  }


  render() {
    //1600
    const { recipe } = this.props
    let imageUrl = recipe.imageUrlsBySize["90"].split('=')[0]
    imageUrl = imageUrl + "=s1600-c"
    const actionIcons = [<StarBorder color="white" recipe={recipe}/>, <FavoriteBorder color="white" />]
    // console.log('hi', recipe)
    let hover = false
    const subtitleStr = `by ${recipe.sourceDisplayName}`
    return (
        <GridTile
          key={recipe.id}
          onMouseEnter={(e) => {
            console.log('hi', hover)
            return hover = true
          }}
          onMouseLeave={(e) => {
            console.log('bye', hover)
            return hover = false
          }}
          title={hover ? "Ingredients" : recipe.recipeName}
          titlePosition="top"
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 50%,rgba(0,0,0,0) 100%)"
          subtitle={<span><b>{subtitleStr}</b></span>}
          subtitleStyle={{whiteSpace: "initial"}}
          titleStyle={{fontSize: 18}}
          actionIcon={<IconButton style={{width: "none"}}>{actionIcons}</IconButton>}
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