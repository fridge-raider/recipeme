import React from 'react';
import { connect } from 'react-redux'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {getRecipeDetails} from '../store'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

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
    imageUrl = imageUrl + "=s500-c"
    // console.log('hi', recipe)
    return (

      <GridTile
        key={recipe.id}
        title={this.props.recipe.recipeName}
        titlePosition="top"
        titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        subtitle={<span>by <b>{recipe.sourceDisplayName}</b></span>}
        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
      >
        <img 
          src={imageUrl}
          onClick={(evt)=>this.props.handleClick(evt, recipe.id)} />
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
