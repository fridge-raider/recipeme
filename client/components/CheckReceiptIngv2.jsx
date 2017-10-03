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
import { setReceiptToOrderHistory, setFrequencyForItem } from '../store'; 

/**
 * COMPONENT
 */
class CheckReceiptIng extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
    this.handleClose = this.handleClose.bind(this); 
    this.confirmReceipt = this.confirmReceipt.bind(this); 
  }

  render() {
    console.log('receipt yayyy', this.props.receipt)
    return (
      <Dialog modal={true} open={this.state.open} onClick={this.handleClose} >
      <Table>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
        enableSelectAll={false}>
      <TableRow>
        <TableHeaderColumn><h3>Item</h3></TableHeaderColumn>
        <TableHeaderColumn><h3>Servings</h3></TableHeaderColumn>
        <TableHeaderColumn><h3>Category</h3></TableHeaderColumn>
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
            <RaisedButton type="submit" label="Confirm Purchases" primary={true} onClick={this.confirmReceipt}/>
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

  confirmReceipt(e) {
    e.preventDefault(); 
    this.handleClose(); 
    const orders = []; 
    //re-naming keys and adding userId for easy mapping to OrderHistory table 
    this.props.currentReceipt.forEach(order => {
      let temp = { ingredientName: order.ing , userId: this.props.user.id, servings: order.qty, units: order.unit, price: order.price }
      orders.push(temp); 
    })
    this.props.confirmReceipt(orders); 
  }
}

const mapState = (state) => {
  return {
    currentReceipt: state.currentReceipt, 
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    confirmReceipt(receipt) {
      dispatch(setReceiptToOrderHistory(receipt)); 
    }
  }
}

export default connect(mapState, mapDispatch)(CheckReceiptIng); 


