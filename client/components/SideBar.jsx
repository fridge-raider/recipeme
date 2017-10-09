import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  handleToggle () {
    this.setState({open: !this.state.open});
  }

  render() {
    return (
        <Drawer open={this.state.open}>
          <MenuItem>Search Bar</MenuItem>
          <MenuItem>Favorited Recipes</MenuItem>
          <MenuItem>Shopping List</MenuItem>
        </Drawer>
    );
  }
}
