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
    // console.log('hi', recipe)
    return (
        <div> 
        { this.state.hover ? 
        <div
          onMouseLeave={this.handleMouseLeave}
        >  
          <GridTile
            key={recipe.id}
            title="Ingredients"
            titlePosition="top"
            titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 100%,rgba(0,0,0,0.3) 100%,rgba(0,0,0,0) 100%)"
            subtitle={<span><b>{recipe.ingredients.join(', ')}</b></span>}
            subtitleStyle={{whiteSpace: "initial"}}
            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}

          >
            <img 
              src={imageUrl}
              onClick={(evt)=>this.props.handleClick(evt, recipe.id)} />
          </GridTile>
        </div>
          :
        <div
          onMouseEnter={this.handleMouseEnter}>
          <GridTile
            key={recipe.id}
            title={this.props.recipe.recipeName}
            titlePosition="top"
            titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            subtitle={<span>by <b>{recipe.sourceDisplayName}</b></span>}
            actionIcon={<IconButton><StarBorder color="white" /><FavoriteBorder color="white" /></IconButton>}
            actionIcon={<IconButton><FavoriteBorder color="white" /></IconButton>}
          >
          <img 
            src={imageUrl}
            onClick={(evt)=>this.props.handleClick(evt, recipe.id)} />
          </GridTile>
        </div>
        }
        </div>
        

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