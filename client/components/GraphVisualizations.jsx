import * as d3 from 'd3';
import c3 from 'c3' ;
import React, { Component } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Card, Container, Form, Grid, Header } from 'semantic-ui-react'
import {Tabs, Tab} from 'material-ui/Tabs'
import getCategoryChart from './getCategoryChart.jsx'
import getNutrientChart from './getNutrientChart.jsx'

const categories = ["Grains","Vegetables", "Fruits", "Dairy", "Meat", "Fat", "NutsAndLegumes", "Sugars"]

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};


class GraphVisualizations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'categories',
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({
      value: value,
    });
  };

   componentDidMount() {
      const categoryChartInfo = getCategoryChart(this.props.categoryHistory)
      var categoryChart = c3.generate({
        bindto: '#category_chart',
        data: categoryChartInfo.data,
        axis: categoryChartInfo.axis
      })

      const nutrientChartInfo = getNutrientChart(this.props.nutrientHistory)
      var nutrientChart = c3.generate({
        bindto: '#nutrient_chart',
        data: nutrientChartInfo.data,
        axis: nutrientChartInfo.axis
      })
  }



   render() {
      let categoryDiv = ReactFauxDOM.createElement('div');
      categoryDiv.setAttribute('id', 'category_chart');

      let nutrientDiv = ReactFauxDOM.createElement('div');
      nutrientDiv.setAttribute('id', 'nutrient_chart');

      return (
        <Container >
        <Header as='h2' textAlign='center'>Purchasing History</Header>
          <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
        <Tab label="By Category" value="categories">
        <div>
          <h2 style={styles.headline}>Categories</h2>
          {categoryDiv.toReact()}
        </div>
      </Tab>
      <Tab label="By Nutrient" value="nutrients">
      <div>
        <h2 style={styles.headline}>Nutrients</h2>
        {nutrientDiv.toReact()}
      </div>
    </Tab>


      </Tabs>


        </Container>
      )
  }
}


const mapProps = (state) => {
  return {
    categoryHistory: state.categoryHistory,
    nutrientHistory: state.nutrientHistory,
    deficientCategories: state.deficientCategories,
    deficientNutrients: state.deficientNutrients
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: (evt, ingred) => {
      dispatch(getRecipesByIngredient(ingred))
      evt.preventDefault()
    }
  }
}

export default withRouter(connect(mapProps, mapDispatch)(GraphVisualizations));

