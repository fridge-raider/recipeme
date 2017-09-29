import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import history from '../history'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import _ from 'lodash'
import ReceiptRow from './ReceiptRow.jsx'
import Dialog from 'material-ui/Dialog';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton'

/**
 * COMPONENT
 */
export default class CheckReceiptIng extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
    this.handleClose = this.handleClose.bind(this)
  }

  render() {
    console.log('receipt', this.props.receipt)
    return (
      <Dialog modal={true} open={this.state.open} onClick={this.handleClose} >
      <Table>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
        enableSelectAll={false}>
      <TableRow>
        <TableHeaderColumn><h3>Item</h3></TableHeaderColumn>
        <TableHeaderColumn><h3>Quantity</h3></TableHeaderColumn>
        <TableHeaderColumn><h3>Measure</h3></TableHeaderColumn>
        <TableHeaderColumn><h3>Price</h3></TableHeaderColumn>
      </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {this.props.receipt.map((item, index) => {
            return <ReceiptRow key={index} ingredient={item} row={index} receipt={this.props.receipt}/>
        })
        }
      </TableBody>
      <TableFooter style={{backgroundColor:'#F0F0F0', paddingBottom:'20px'}}>
        <TableRow>
          <TableRowColumn>
          </TableRowColumn>
          <TableRowColumn style={{textAlign: 'right'}}>
            <RaisedButton type="submit" label="Confirm Purchases" primary={true} onClick={this.props.confirmReceipt}/>
          </TableRowColumn>
        </TableRow>
      </TableFooter>
    </Table>

      </Dialog>
    )
  }

  handleClose() {
    this.setState({open: false})
  }
}



