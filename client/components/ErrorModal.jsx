import React, {Component} from 'react'
import Dialog from 'material-ui/Dialog';

/**
 * COMPONENT
 */
class ErrorModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: props.open
    }
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({open: false})
  }

  render() {
    return (
      <Dialog
        modal={false}
        open={this.state.open}
        title={this.props.title}
        onRequestClose={this.handleClose}
      >
      {this.props.message}
      </Dialog>
    )
  }
}

export default (ErrorModal);
