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
    // this.renderStyle = this.renderStyle.bind(this)
    this.renderStyle = (picture_url) => {
      return {
        backgroundImage: 'url(' + picture_url + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '33.33vw',
        height: '40vh'
      }
  }
  }


  render() {
    const { recipe } = this.props
    let imageUrl = recipe.imageUrlsBySize["90"].split('=')[0]
    imageUrl = imageUrl + "=s1600-c"
    console.log('image', imageUrl)
    return (
      <div 
        style={styles.root}
        onClick={(evt)=>this.props.handleClick(evt, recipe.id)}
      >
        {/* <GridList
          cellHeight={180}
          style={styles.gridList}
        > */}
            <GridTile
              key={recipe.id}
              title={this.props.recipe.recipeName}
              subtitle={<span>by <b>{recipe.sourceDisplayName}</b></span>}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            >
              <img src={imageUrl} />
            </GridTile>
          
        {/* </GridList> */}
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
