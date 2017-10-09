import React, { Component } from 'react'
import { Button, Checkbox, Form, Dropdown, Input, TextArea, Icon, Table } from 'material-ui'
import { connect } from 'react-redux'

export class CheckReceiptForm extends Component {
  constructor(props) {
    super(props)

    // maintain local state for input while updating receipt
    this.state = {
      purchases: this.props.receipt
    }
  }

  render() {

    this.props.receipt.forEach(item => (
      rowData.push({item: item.name, qty: 1, measure: "unit", price: item.price})
    ))

    return (

      <Form onSubmit={(evt, data) => this.props.handleSubmit(evt, data, this.state.purchases)}>

      <Table basic='very' celled collapsing>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Item</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Measure</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {this.props.receipt.map(item => (
        <Table.Row key={item.name}>
          <Table.Cell width="8">
          {item.ing.slice(0,7) === 'unknown' ?
          <Form.Field key={`${item.name}-unknown`} required color="yellow" control={Input} defaultValue={item.ing}/>
          : <Form.Field key={`${item.name}-known`} required control={Input} defaultValue={item.ing}/>
        }
          </Table.Cell>
          <Table.Cell>
            <Form.Field required control={Input} defaultValue={1} />
          </Table.Cell>
          <Table.Cell>
          <Form.Field required control={Dropdown} defaultValue='unit' fluid search selection options={[{key: "unit", value: "unit", text: "unit"},{key: "oz", value: "oz", text: "oz"},{key: "gal", value: "gal", text: "gal"},{key: "lbs", value: "lbs", text: "lbs"}]}/>
          </Table.Cell>
          <Table.Cell>
          <Form.Field required control={Input} defaultValue={`\$${item.price}`} />
        </Table.Cell>
        </Table.Row>
      ))}
      </Table.Body>
      </Table>


      <Form.Field>
        <Button primary type="submit">
        Submit<Icon name='right chevron' />
        </Button>
        </Form.Field>
      </Form>
    )
  }

}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, data, purchases) {
      console.log('data',data,'evt', evt, evt.target, 'purchase')
    }
  }
}

export default connect(null, mapDispatch)(CheckReceiptForm)

