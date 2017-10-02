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
      qty: 1,
      unit: 'unit',
      price: this.props.ingredient.price
    }

    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleQtyChange = this.handleQtyChange.bind(this)
    this.handleUnitChange = this.handleUnitChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  handleUnitChange(evt, value) {
    const unit = (value === 0) ? 'unit' : ((value === 1) ? 'oz' : ((value === 2) ? 'gal' : 'lbs')); 
    this.setState({unit: unit}, () => {
      this.props.updateReceipt(this.state, this.props.row, this.props.receipt)
    })

  }

  handleNameChange(evt, value) {
    this.setState({ing: value}, () => {
      this.props.updateReceipt(this.state, this.props.row, this.props.receipt)
    })
  }

  handleQtyChange(evt, value) {
    this.setState({qty: +value}, () => {
      this.props.updateReceipt(this.state, this.props.row, this.props.receipt)
    })
  }

  handlePriceChange(evt, value) {
    console.log('this.state before setting', this.state)
    console.log('value', value)
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
      <SelectField
        value={this.state.unit}
        onChange={(evt, value) => this.handleUnitChange(evt, value)}
      >
        <MenuItem value='unit' label='unit' primaryText="unit" />
        <MenuItem value='oz' label='oz' primaryText="oz" />
        <MenuItem value='gal' label='gal' primaryText="gal" />
        <MenuItem value='lbs' label='lbs' primaryText="lbs" />
      </SelectField>
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
      receipt[row] = state
      console.log('receipt', receipt)
      console.log('state', state)
      dispatch(setReceipt(receipt))
    }
  }
}

export default connect(mapState, mapDispatch)(ReceiptRow)

