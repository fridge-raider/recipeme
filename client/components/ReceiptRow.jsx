import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import history from '../history'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import AutoComplete from 'material-ui/AutoComplete';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DropDownMenu from 'material-ui/DropDownMenu';
import Delete from 'material-ui/svg-icons/action/delete'
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash'
import {setReceipt, fetchIngredientNames} from '../store'

export class ReceiptRow extends Component {
  constructor(props) {
    super(props)

    // maintain local state for input while updating receipt
    this.state = {
      newIng:  this.props.ingredient.ing,
      ing: this.props.ingredient.ing,
      servings: 1,
      category: 8,
      category_str: this.props.ingredient.category,
      price: this.props.ingredient.price,
      rep: this.props.ingredient.rep
    }

    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleQtyChange = this.handleQtyChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.updateNameChange = this.updateNameChange.bind(this)
  }

  componentWillMount() {
    let category = 8;
    if(this.props.ingredient.category === 'Grains') category = 0;
    else if(this.props.ingredient.category === 'Fruits') category = 1;
    else if(this.props.ingredient.category === 'Vegetables') category = 2;
    else if(this.props.ingredient.category === 'Dairy') category = 3;
    else if(this.props.ingredient.category === 'Meat') category = 4;
    else if(this.props.ingredient.category === 'Nuts and Legumes') category = 5;
    else if(this.props.ingredient.category === 'Fats') category = 6;
    else if(this.props.ingredient.category === 'Added Sugars') category = 7;
    else if(this.props.ingredient.category === 'Unsure') category = 8;

    this.setState({ category });

  }

  handleCategoryChange(evt, value) {
    let category_str = '';
    if(value === 0) category_str = 'Grains';
    else if(value === 1) category_str = 'Fruits';
    else if(value === 2) category_str = 'Vegetables';
    else if(value === 3) category_str = 'Dairy';
    else if(value === 4) category_str = 'Meat';
    else if(value === 5) category_str = 'Nuts and Legumes';
    else if(value === 6) category_str = 'Fats';
    else if(value === 7) category_str = 'Added Sugars';
    else if(value === 8) category_str = 'Unsure';
    this.setState({ category : value, category_str : category_str }, () => {
      this.props.updateReceipt(this.state, this.props.row, this.props.receipt)
    })

  }
  updateNameChange(ingredient) {
    this.setState({newIng: ingredient})
  }

  handleNameChange() {
    this.props.updateReceipt(this.state, this.props.row, this.props.receipt)
  }

  handleQtyChange(evt, value) {
    this.setState({servings: +value}, () => {
      this.props.updateReceipt(this.state, this.props.row, this.props.receipt)
    })
  }

  handlePriceChange(evt, value) {
    this.setState({price: value.substring(1)}, () => {
      this.props.updateReceipt(this.state, this.props.row, this.props.receipt)
    })
  }

  render() {
    return (

  <TableRow>
    {(this.props.isReceipt)
      ? <TableRowColumn>{this.props.ingredient.rep}</TableRowColumn>
      : null
    }
    <TableRowColumn>
    <div>
      <AutoComplete
        filter={AutoComplete.fuzzyFilter}
        dataSource={this.props.ingredients}
        maxSearchResults={10}
        onClose={this.handleNameChange}
        onUpdateInput={this.updateNameChange}
        hintText={this.props.ingredient.ing || "Unknown"}
      />
    </div>
    </TableRowColumn>

    <TableRowColumn style={{width: 100, marginLeft: 40}}>
    <TextField
    defaultValue={1}
    onChange={(evt, value) => this.handleQtyChange(evt, value)}
    fullWidth={true}
    />
    </TableRowColumn>
    <TableRowColumn>
      <DropDownMenu value={this.state.category} onChange ={(evt, value) => this.handleCategoryChange(evt, value)}>
        <MenuItem value={0} primaryText="Grains" />
        <MenuItem value={1} primaryText="Fruits" />
        <MenuItem value={2} primaryText="Vegetables" />
        <MenuItem value={3} primaryText="Dairy" />
        <MenuItem value={4} primaryText="Meat" />
        <MenuItem value={5} primaryText="Nuts and Legumes" />
        <MenuItem value={6} primaryText="Fats" />
        <MenuItem value={7} primaryText="Added Sugars" />
        <MenuItem value={8} primaryText="Unsure" />
      </DropDownMenu>
    </TableRowColumn>
    <TableRowColumn style={{width:40}}>
      <Delete onClick={(row, receipt, callback) => {this.props.removeItemReceipt(this.props.row, this.props.receipt, this.props.callback)}} />
    </TableRowColumn>
  </TableRow>

    )
  }

}

const mapState = (state) => {
  return {
    ingredients: state.ingredients
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateReceipt(state, row, receipt) {
      let item = {ing: state.newIng, servings: state.servings, price: state.price, category: state.category_str, rep: state.rep};
      receipt[row] = item;

      dispatch(setReceipt(receipt))
    },
    removeItemReceipt(row, receipt, callback) {
      receipt.splice(row, 1);
      dispatch(setReceipt(receipt));
      callback();
    }
  }
}

export default connect(mapState, mapDispatch)(ReceiptRow)

