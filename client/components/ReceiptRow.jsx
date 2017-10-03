import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import history from '../history'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash'
import {setReceipt} from '../store'

export class ReceiptRow extends Component {
  constructor(props) {
    super(props)

    // maintain local state for input while updating receipt
    this.state = {
      ing: this.props.ingredient.ing,
      servings: 1,
      category: 0,
      price: this.props.ingredient.price
    }

    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleQtyChange = this.handleQtyChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  handleCategoryChange(evt, value) {
    let category = ''; 
    if(value === 0) category = 'Grains'; 
    else if(value === 1) category = 'Fruits'; 
    else if(value === 2) category = 'Vegtables'; 
    else if(value === 3) category = 'Dairy'; 
    else if(value === 4) category = 'Meat'; 
    else if(value === 5) category = 'Nuts and Legumes'; 
    else if(value === 6) category = 'Fats'; 
    else if(value === 7) category = 'Added Sugars'; 
    this.setState({ category : value }, () => {
      //this.props.updateReceipt(this.state, this.props.row, this.props.receipt)
    })

  }

  handleNameChange(evt, value) {
    this.setState({ing: value}, () => {
      this.props.updateReceipt(this.state, this.props.row, this.props.receipt)
    })
  }

  handleQtyChange(evt, value) {
    this.setState({servings: +value}, () => {
      this.props.updateReceipt(this.state, this.props.row, this.props.receipt)
    })
  }

  handlePriceChange(evt, value) {
    this.setState({price: value.substring(1)}, () => {
      console.log('this.state after setting', this.state)
      this.props.updateReceipt(this.state, this.props.row, this.props.receipt)
    })
  }

  render() {

    return (

  <TableRow>
    <TableRowColumn>
      <TextField
      defaultValue={this.props.ingredient.ing}
      onChange={(evt, value) => this.handleNameChange(evt, value)}
      />
    </TableRowColumn>

    <TableRowColumn>
    <TextField
    defaultValue={1}
    onChange={(evt, value) => this.handleQtyChange(evt, value)}
    />
    </TableRowColumn>
    <TableRowColumn>
      <DropDownMenu value={this.state.category} onChange ={(evt, value) => this.handleCategoryChange(evt, value)}>
        <MenuItem value={0} primaryText="Grains" />
        <MenuItem value={1} primaryText="Fruits" />
        <MenuItem value={2} primaryText="Vegtables" />
        <MenuItem value={3} primaryText="Dairy" />
        <MenuItem value={4} primaryText="Meat" />
        <MenuItem value={5} primaryText="Nuts and Legumes" />
        <MenuItem value={6} primaryText="Fats" />
        <MenuItem value={7} primaryText="Added Sugars" />
      </DropDownMenu> 
    </TableRowColumn>

    <TableRowColumn>
    <TextField defaultValue={`\$${this.props.ingredient.price}`}
    onChange={(evt, value) => this.handlePriceChange(evt, value)}
    />
    </TableRowColumn>

  </TableRow>

    )
  }

}

const mapState = (state) => {
  return {
    currentReceipt: state.currentReceipt
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateReceipt(state, row, receipt) {
      let item = {ing: state.ing, servings: state.servings, price: state.price}; 
      receipt[row] = item; 
      dispatch(setReceipt(receipt))
    }
  }
}

export default connect(mapState, mapDispatch)(ReceiptRow)

