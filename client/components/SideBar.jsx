import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

export default class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  handleToggle () {
    this.setState({open: !this.state.open});
  }

  render() {
    console.log(' in sidebar component')
    return (
      <Sidebar.Pushable as={Segment}>
      <Sidebar as={Menu} animation='push' width='large' visible={this.state.open} icon='labeled' vertical inverted>
        <Menu.Item name='home'>
          <Icon name='home' />
          Search Recipes
        </Menu.Item>
        <Menu.Item name='gamepad'>
          <Icon name='gamepad' />
          Favorited Recipes
        </Menu.Item>
        <Menu.Item name='camera'>
          <Icon name='camera' />
          Shopping List
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher>
        <Segment basic>
          <Header as='h3'>Application Content</Header>
          <Image src='/assets/images/wireframe/paragraph.png' />
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
    );
  }
}
