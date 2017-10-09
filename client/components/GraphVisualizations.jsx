import * as d3 from 'd3';
import c3 from 'c3';
import React, { Component } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Container, Header } from 'semantic-ui-react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';

import { Tabs, Tab } from 'material-ui/Tabs'
import getCategoryChart from './getCategoryChart.jsx'
import getNutrientChart from './getNutrientChart.jsx'
import getCategoryDeficientChart from './getCategoryDeficientChart.jsx'
import getNutrientDeficientChart from './getNutrientDeficientChart.jsx'
import RaisedButton from 'material-ui/RaisedButton'
import history from '../history'
import {getRecipesByDefCategory, fetchIDofDefNutrient, getRecipes} from '../store'

const categories = ["Grains", "Vegetables", "Fruits", "Dairy", "Meat", "Fat", "NutsAndLegumes", "Sugars"]

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  }
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

    // CATEGORIES TAB CHARTS
      const {lineGraphObj, pieGraphObj} = getCategoryChart(this.props.categoryHistory)
      var categoryLineChart = c3.generate({
        bindto: '#category_line_chart',
        data: lineGraphObj.data,
        axis: lineGraphObj.axis,
        padding: lineGraphObj.padding
      })

      var categoryPieChart = c3.generate({
        bindto: '#category_pie_chart',
        data: pieGraphObj.data,
        padding: pieGraphObj.padding
      })

      const categoryDeficientInfo = getCategoryDeficientChart(this.props.deficientCategories.deficits)

      var categoryDeficitChart = c3.generate({
        bindto: '#category_def_chart',
        data: categoryDeficientInfo.data,
        bar: categoryDeficientInfo.bar,
        axis: categoryDeficientInfo.axis,
        tooltip: categoryDeficientInfo.tooltip,
        padding: categoryDeficientInfo.padding
      })

      // NUTRIENTS TAB CHARTS
      const {lineGraphNutObj, pieGraphNutObj} = getNutrientChart(this.props.nutrientHistory)
      var nutrientLineChart = c3.generate({
        bindto: '#nutrient_line_chart',
        data: lineGraphNutObj.data,
        axis: lineGraphNutObj.axis,
        padding: lineGraphNutObj.padding

      })

      var nutrientPieChart = c3.generate({
        bindto: '#nutrient_pie_chart',
        data: pieGraphNutObj.data,
        padding: pieGraphNutObj.padding
      })

      const nutrientDeficientInfo = getNutrientDeficientChart(this.props.deficientNutrients.deficits)
      var nutrientDeficitChart = c3.generate({
        bindto: '#nutrient_def_chart',
        data: nutrientDeficientInfo.data,
        bar: nutrientDeficientInfo.bar,
        axis: nutrientDeficientInfo.axis,
        padding: nutrientDeficientInfo.padding
      })

      // let ticks = d3.selectAll('.tick')
      // const test = ReactFauxDOM.createElement('div')
      // test.innerHTML = 'hi'
      // let tick1 = d3.select('.tick text').data([0])

      // let testImg = ReactFauxDOM.createElement('div');
      // testImg.setAttribute('id', 'test_img');

      // d3.select('.tick text')
      // .append("svg")
      // // .attr("xlink:href", "http://placekitten.com/200/300")
      // .attr("width", "20")
      // .attr("height", "20");
      // console.log('tick1', tick1)

      // ticks.on('click', function(value,index){
      //   console.dir(this);
      //   console.dir([value, index]);
      // });

  }


  render() {

    // CATEGORY TAB CHARTS
      let categoryLineDiv = ReactFauxDOM.createElement('div');
      categoryLineDiv.setAttribute('id', 'category_line_chart');

      let categoryPieDiv = ReactFauxDOM.createElement('div');
      categoryPieDiv.setAttribute('id', 'category_pie_chart');

      let categoryDefDiv = ReactFauxDOM.createElement('div');
      categoryDefDiv.setAttribute('id', 'category_def_chart');


      // NUTRIENT TAB CHARTS
      let nutrientLineDiv = ReactFauxDOM.createElement('div');
      nutrientLineDiv.setAttribute('id', 'nutrient_line_chart');

      let nutrientPieDiv = ReactFauxDOM.createElement('div');
      nutrientPieDiv.setAttribute('id', 'nutrient_pie_chart');

      let nutrientDefDiv = ReactFauxDOM.createElement('div');
      nutrientDefDiv.setAttribute('id', 'nutrient_def_chart');

      return (
        <Container>

        <h2>Your Purchasing Dashboard</h2>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
        <Tab label="By Category" value="categories">
        <div>
        <br/>

          <Card >
          <CardHeader
          title="Purchases vs. Recommended Intake by Category"
          subtitle="Click Bars for Category Specific Recipes"
        />
          {categoryDefDiv.toReact()}
        </Card>
        <br/>
        <div>
        <GridList
        cols={2}
        cellHeight={390}
        padding={15}
      >
      <GridTile className='graph-box'>
        <Card >
        <CardHeader
        title="Purchases over Time by Category"
        subtitle="by number of servings"

      />
        {categoryLineDiv.toReact()}
        </Card>
    </GridTile>
    <GridTile className='graph-box'>
        <Card >
        <CardHeader
        title="Category Distribution"
        subtitle="by number of servings"
      />
        {categoryPieDiv.toReact()}
        </Card>
        </GridTile>
        </GridList>
        </div>

           {/*!!Object.keys(this.props.deficientCategories).length &&
              <div>
              <h2>You could use some more {this.props.deficientCategories.defCategory}!
              <br/>
              <RaisedButton color="blue"
              onClick={(evt)=>this.props.handleCategoryClick(evt, this.props)}
              >Get Recipes
              </RaisedButton>
              </h2>
              </div>
           */}
        </div>




        </Tab>
      <Tab label="By Nutrient" value="nutrients">
      <div>
      <br/>

        <Card >
        <CardHeader
        title="Purchases vs. Recommended Intake by Nutrient"
        subtitle="Click Bars for Nutrient Specific Recipes"
      />
        {nutrientDefDiv.toReact()}
      </Card>
      <br/>
      <div>
      <GridList
      cols={2}
      cellHeight={390}
      padding={15}
    >
    <GridTile className='graph-box'>
      <Card >
      <CardHeader
      title="Purchases over Time by Nutrient"
      subtitle="in grams"
    />
      {nutrientLineDiv.toReact()}
      </Card>
  </GridTile>
  <GridTile className='graph-box'>
      <Card >
      <CardHeader
      title="Nutrient Distribution"
      subtitle="in grams"
    />
      {nutrientPieDiv.toReact()}
      </Card>
      </GridTile>
      </GridList>
      </div>
      {/*!!Object.keys(this.props.deficientNutrients).length &&
        <div>
        <h2>You could use some more {this.props.deficientNutrients.defNutrient}!
        <RaisedButton
        onClick={(evt)=>this.props.handleNutrientClick(evt, this.props)}
        >Get Recipes
        </RaisedButton>
        </h2>
        </div>
      */}

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
    handleCategoryClick: (category) => {
      dispatch(getRecipes([]))
      dispatch(getRecipesByDefCategory(category))
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

