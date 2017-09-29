import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import history from '../history'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import _ from 'lodash'
import CheckReceiptForm from './CheckReceiptForm.jsx'

/**
 * COMPONENT
 */
export default class CheckReceiptIng extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
    this.close = this.close.bind(this)
  }

  render() {
    return (
      <Modal open={this.state.open} closeIcon onClose={this.close} size='large'>
      <Modal.Header>Confirm your purchases: </Modal.Header>
      <Modal.Content>
        <CheckReceiptForm receipt={this.props.receipt}/>
      </Modal.Content>
    </Modal>
    )
  }

  close() {
    this.setState({open: false})
  }
}



