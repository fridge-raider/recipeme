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
import { setReceiptToOrderHistory, setFrequencyForItem, setReceiptToIngredients, setReceiptToRepresentations, fetchIngredientNames} from '../store'; 
import * as moment from 'moment'; 

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

  componentWillMount() {
    this.props.getAllIngredientNames();  
  }

  render() {
    return (
      <Dialog modal={true} open={this.state.open} onClick={this.handleClose} autoScrollBodyContent={true}>
      <Table>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
        enableSelectAll={false}>
      <TableRow>
        <TableHeaderColumn><h3>Representation</h3></TableHeaderColumn>
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
      <TableFooter style={{paddingBottom:'20px'}}>
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
    const ingredients = []; 
    const reps = []; 
    //re-naming keys and adding userId for easy mapping to OrderHistory table 
    this.props.currentReceipt.forEach(order => {
      console.log(order); 
      let orderHistoryInstance = { ingredientName: order.ing , userId: this.props.user.id, servings: order.servings, price: order.price, week: Date.now() }
      let ingredientsInstance = {name: order.ing, category: order.category}
      let repInstance = {name: order.rep, ingredientName: order.ing}; 
      orders.push(orderHistoryInstance); 
      ingredients.push(ingredientsInstance); 
      reps.push(repInstance); 
    })
    this.props.confirmReceipt(orders, ingredients, reps); 
  }
}

const mapState = (state) => {
  return {
    currentReceipt: state.currentReceipt, 
    user: state.user, 
    ingredients: state.ingredients
  }
}

const mapDispatch = (dispatch) => {
  return {
    confirmReceipt(orders, ingredients, reps) {
      dispatch(setReceiptToIngredients(ingredients))
      dispatch(setReceiptToRepresentations(reps)); 
      dispatch(setReceiptToOrderHistory(orders)); 
    }, 
    getAllIngredientNames() {
      dispatch(fetchIngredientNames()); 
    }
  }
}

export default connect(mapState, mapDispatch)(CheckReceiptIng); 


