import * as d3 from 'd3';
import c3 from 'c3';
import React, { Component } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Card, Container, Form, Grid, Header } from 'semantic-ui-react'
import { Tabs, Tab } from 'material-ui/Tabs'
import getCategoryChart from './getCategoryChart.jsx'
import getNutrientChart from './getNutrientChart.jsx'
import getCategoryDeficientChart from './getCategoryDeficientChart.jsx'
import getNutrientDeficientChart from './getNutrientDeficientChart.jsx'
import RaisedButton from 'material-ui/RaisedButton'
import history from '../history'
import {getRecipesByDefCategory, fetchIDofDefNutrient} from '../store'

const categories = ["Grains", "Vegetables", "Fruits", "Dairy", "Meat", "Fat", "NutsAndLegumes", "Sugars"]


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

   componentDidUpdate() {
     console.log('this.props', this.props)
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

      const categoryDeficientInfo = getCategoryDeficientChart(this.props.deficientCategories.deficits)
      var categoryDeficitChart = c3.generate({
        bindto: '#category_def_chart',
        data: categoryDeficientInfo.data,
        bar: categoryDeficientInfo.bar
      })

      console.log('categroy def chart', categoryDeficitChart)

      const nutrientDeficientInfo = getNutrientDeficientChart(this.props.deficientNutrients.deficits)
      var nutrientDeficitChart = c3.generate({
        bindto: '#nutrient_def_chart',
        data: nutrientDeficientInfo.data,
        bar: nutrientDeficientInfo.bar
      })
  }


  render() {

     console.log('re-rendering')
      let categoryDiv = ReactFauxDOM.createElement('div');
      categoryDiv.setAttribute('id', 'category_chart');

      let nutrientDiv = ReactFauxDOM.createElement('div');
      nutrientDiv.setAttribute('id', 'nutrient_chart');

      let categoryDefDiv = ReactFauxDOM.createElement('div', categoryDiv);
      categoryDefDiv.setAttribute('id', 'category_def_chart');

      let nutrientDefDiv = ReactFauxDOM.createElement('div', nutrientDiv);
      nutrientDefDiv.setAttribute('id', 'nutrient_def_chart');

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
           {!!Object.keys(this.props.deficientCategories).length &&
              <div>You could use some more {this.props.deficientCategories.defCategory}!
              <br/>
              <RaisedButton color="blue"
              onClick={(evt)=>this.props.handleCategoryClick(evt, this.props)}
              >Get Recipes
              </RaisedButton>
              </div>
            }
        </div>
      </Tab>
      <Tab label="By Nutrient" value="nutrients">
      <div>
        <h2 style={styles.headline}>Nutrients</h2>
      <div>
        <Container>
          {nutrientDiv.toReact()}
        </Container>
        <Container>
          {nutrientDefDiv.toReact()}
        </Container>
        {!!Object.keys(this.props.deficientNutrients).length &&
              <div>
              <h2>You could use some more {this.props.deficientNutrients.defNutrient}!
              <RaisedButton
              onClick={(evt)=>this.props.handleNutrientClick(evt, this.props)}
              >Get Recipes with {this.props.deficientNutrients.defNutrient}
              </RaisedButton>
              </h2>
              </div>
              }
      </div>
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
    },
    handleCategoryClick: (evt, state) => {
      dispatch(getRecipesByDefCategory(state.deficientCategories.defCategory))
      history.push('/recipes/deficiencies')
    },
    handleNutrientClick: (evt, state) => {
      dispatch(getRecipes([]))
      dispatch(fetchIDofDefNutrient(state.deficientNutrients.defNutrient))
      history.push('/recipes/deficiencies')
    }
  }
}

export default withRouter(connect(mapProps, mapDispatch)(GraphVisualizations));

