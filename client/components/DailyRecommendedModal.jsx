import React, {Component} from 'react'
import Dialog from 'material-ui/Dialog';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';



/**
 * COMPONENT
 */
class DailyRecommendedModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: this.props.open
    }
    this.handleClose = this.handleClose.bind(this); 
  }

  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps) {
      this.setState({open: nextProps.open})
    }
  }

  handleClose() {
    this.setState({open: false})
  }

  render() {
    console.log("hello am i in here", this.props.open, this.state.open)
    return (
      <Dialog modal={false} 
        open={this.state.open} 
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}>
        <Toolbar default={true}>
          <ToolbarTitle text="Suggested Serving per Food Group" />
        </Toolbar>
        <Table>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn><h4>Grains</h4></TableRowColumn>
              <TableRowColumn>1 slice bread</TableRowColumn>
              <TableRowColumn>1 oz dry cereal</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn><h4>Vegetables</h4></TableRowColumn>
              <TableRowColumn>1 cup raw leafy vegetables</TableRowColumn>
              <TableRowColumn>1/2 cup cut-up raw</TableRowColumn>
            </TableRow>
             <TableRow>
              <TableRowColumn><h4>Fruits</h4></TableRowColumn>
              <TableRowColumn>1 medium (baseball size) fruit</TableRowColumn>
              <TableRowColumn>1/4 cup dried fruit</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn><h4>Dairy</h4></TableRowColumn>
              <TableRowColumn>1/2 oz of cheese</TableRowColumn>
              <TableRowColumn>1 cup milk</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn><h4>Meats</h4></TableRowColumn>
              <TableRowColumn>3 oz cooked meat</TableRowColumn>
              <TableRowColumn>3 oz grilled fish</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn><h4>Fats</h4></TableRowColumn>
              <TableRowColumn>1 tsp soft margarine</TableRowColumn>
              <TableRowColumn>1 Tbsp mayonnaise</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn><h4>Nuts And Legumes</h4></TableRowColumn>
              <TableRowColumn>1/3 cup or 1 and 1/2 oz nuts</TableRowColumn>
              <TableRowColumn>2 Tbsp peanut butter</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn><h4>Sugars</h4></TableRowColumn>
              <TableRowColumn>1 Tbsp sugar</TableRowColumn>
              <TableRowColumn>1 Tbsp jelly or jam</TableRowColumn>
            </TableRow>
          </TableBody> 
        </Table>
      </Dialog>
    )
  }
}

export default (DailyRecommendedModal); 


