//utils
import _ from 'lodash'
import * as moment from 'moment'

//react-redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import history from '../history'
import ReceiptRow from './ReceiptRow.jsx'
import { setReceiptToOrderHistory, setFrequencyForItem, setReceiptToIngredients, setReceiptToRepresentations, fetchIngredientNames, fetchCategoryOrderHistory, fetchNutrientOrderHistory} from '../store'

//UI-frameworks
import Dialog from 'material-ui/Dialog';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'




/**
 * COMPONENT
 */
class CheckReceiptIng extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: true,
      createdAt: Date.now(),
      receipts: this.props.currentReceipt
    }
    this.handleClose = this.handleClose.bind(this)
    this.confirmReceipt = this.confirmReceipt.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.rerenderTable = this.rerenderTable.bind(this)
  }

  rerenderTable() {
    this.setState({ receipts: this.props.currentReceipt })
  }

  componentWillMount() {
    this.props.getAllIngredientNames();
  }

  render() {
    console.log(this.props.isReceipt)
    return (
      <Dialog modal={true} open={this.state.open} onClick={this.handleClose} autoScrollBodyContent={true}>
      <Table>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
        enableSelectAll={false}>
      <TableRow>
        {(this.props.isReceipt)
          ? <TableHeaderColumn><h3>Representation</h3></TableHeaderColumn>
          : null
        }
        <TableHeaderColumn><h3>Item</h3></TableHeaderColumn>
        <TableHeaderColumn style={{width: 100}}><h3 style={{marginLeft:-20}}>Servings</h3></TableHeaderColumn>
        <TableHeaderColumn><h3>Category</h3></TableHeaderColumn>
        <TableRowColumn style={{width:40}}></TableRowColumn>
      </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {this.props.currentReceipt.map((item, index) => {
            return <ReceiptRow key={index} ingredient={item} row={index} receipt={this.props.currentReceipt} callback={this.rerenderTable} isReceipt={this.props.isReceipt}/>
        })
        }
      </TableBody>
      <TableFooter style={{paddingBottom:'20px'}} adjustForCheckbox={false}>
        <TableRow>
          <TableRowColumn>
            <DatePicker
              hintText="Purchased Date"
              locale="en-US"
              firstDayOfWeek={0}
              onChange={(evt, val) => {this.handleDate(evt, val)}}
            />
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

  handleDate(evt, val) {
    val = Date.parse(val);
    this.setState({createdAt: val})
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
      if(order.ingredientName !== "") {
        let orderHistoryInstance = { ingredientName: order.ing , userId: this.props.user.id, servings: order.servings, price: order.price, week: this.state.createdAt, createdAt: this.state.createdAt }
        let ingredientsInstance = {name: order.ing, category: order.category}
        let repInstance = {name: order.rep, ingredientName: order.ing};
        orders.push(orderHistoryInstance);
        ingredients.push(ingredientsInstance);
        reps.push(repInstance);
      }
    })
    this.props.confirmReceipt(orders, ingredients, reps);
    history.push('/home')
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
      dispatch(fetchCategoryOrderHistory());
      dispatch(fetchNutrientOrderHistory());
    },
    getAllIngredientNames() {
      dispatch(fetchIngredientNames());
    }
  }
}

export default connect(mapState, mapDispatch)(CheckReceiptIng);


