//import * as d3 from 'd3';
import c3 from 'c3';
import React, { Component } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Container } from 'semantic-ui-react'
import { Card, CardHeader } from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';
import * as d3 from 'd3';

import { Tabs, Tab } from 'material-ui/Tabs'
import getCategoryChart from './getCategoryChart.jsx'
import getNutrientChart from './getNutrientChart.jsx'
import getCategoryDeficientChart from './getCategoryDeficientChart.jsx'
import getNutrientDeficientChart from './getNutrientDeficientChart.jsx'
import RaisedButton from 'material-ui/RaisedButton'
import history from '../history'
import { getRecipesByDefCategory, fetchIDofDefNutrient, getRecipes } from '../store'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  }
};

const categories = ["Grains", "Vegetables", "Fruits", "Dairy", "Meat", "Fats and Oil", "Nuts and Legumes", "Added Sugars"]
const nutrients = ['nf_total_fat', 'nf_saturated_fat', 'nf_total_carbohydrate', 'nf_dietary_fiber', 'nf_sugars', 'nf_protein']

class GraphVisualizations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'categories',
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleCategoryClick = this.handleCategoryClick.bind(this)
    this.handleNutrientClick = this.handleNutrientClick.bind(this)
  }

  handleChange(value) {
    this.setState({
      value: value,
    });
  }

  handleCategoryClick(category) {
    this.props.handleCategoryClick(categories[category])
  }

  handleNutrientClick(nutrient) {
    this.props.handleNutrientClick(nutrients[nutrient])
  }

  handleNutrientHover(nutrient) {
    //this.props.handleNutrientClick(nutrients[nutrient])
  }

  componentDidUpdate() {



    // CATEGORIES TAB CHARTS
    const { lineGraphObj, pieGraphObj } = getCategoryChart(this.props.categoryHistory)
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

    const categoryDeficientInfo = getCategoryDeficientChart(this.props.deficientCategories.deficits, this.props.handleCategoryClick)

    var categoryDeficitChart = c3.generate({
      bindto: '#category_def_chart',
      data: categoryDeficientInfo.data,
      bar: categoryDeficientInfo.bar,
      axis: categoryDeficientInfo.axis,
      tooltip: categoryDeficientInfo.tooltip,
      padding: categoryDeficientInfo.padding,
    })

    // NUTRIENTS TAB CHARTS
    const { lineGraphNutObj, pieGraphNutObj } = getNutrientChart(this.props.nutrientHistory)
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

    let div; 

    d3.selectAll('#category_def_chart g.tick')
      .on('mouseover', (val) => {
        div = d3.select('#app').insert('div')
        .style('position', 'relative')
        .style('background-color', '#484848')
        .style('opacity', 0.8)
        .style('border-style', 'solid')
        .style('border-color', '#808080')
        .style('display', 'inline-block')
        .style('z-index', 999999)

        let category = ''
        if(val === 0) category = 'grains'
        else if(val === 1) category = 'vegetables'
        else if(val === 2) category = 'fruits'
        else if(val === 3) category = 'dairy'
        else if(val === 4) category = 'meat'
        else if(val === 5) category = 'fats and oils'
        else if(val === 6) category = 'nuts and legumes'
        else if(val === 7) category = 'added sugars'
        let mouseEvent = categoryDeficitChart.internal.d3.event
        console.log(mouseEvent)
        div.html('click for recipes with ' + category)
          .style('left', (mouseEvent.pageX-90)+"px")
          .style('bottom', (mouseEvent.pageY+10)+"px")
          .style('visibility', 'visible')
          .style('padding-left', '7px')
          .style('padding-right', '7px')
          .style('border-radius', '10px')
          .style('border-width', '1px')
          .style('color', '#ffffff')
      })
      .on('mouseout', () => {
        div.remove() 
      })

    d3.selectAll('#category_def_chart g.tick')
    .on('click', this.handleCategoryClick)

    // add on click handler to nutrient def chart ticks
    d3.selectAll('#nutrient_def_chart .tick')
    //.on('mouseover', this.handleNutrientHover)
    .on('click', this.handleNutrientClick)

  }


  render() {

    // CATEGORY TAB CHARTS
    let categoryLineDiv = ReactFauxDOM.createElement('div');
    categoryLineDiv.setAttribute('id', 'category_line_chart');

    let body = d3.select(categoryLineDiv).append('div').attr('id', 'myDiv')




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

        <h2 className="headings" style={{fontSize: 40}}>Your Purchasing Dashboard</h2>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label="By Category" value="categories">
            <div>
              <br />

              <Card >
                <CardHeader
                  title="Purchases vs. Recommended Intake by Category"
                  subtitle="Click Category Labels for Category Specific Recipes"
                  subtitleColor="#03A9F4"
                />
                {categoryDefDiv.toReact()}
              </Card>
              <br />
              <div>
                <GridList
                  cols={2}
                  cellHeight={390}
                  padding={15}
                >
                  <GridTile className="graph-box">
                    <Card >
                      <CardHeader
                        title="Purchases over Time by Category"
                        subtitle="by number of servings"

                      />
                      {categoryLineDiv.toReact()}
                    </Card>
                  </GridTile>
                  <GridTile className="graph-box">
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
            </div>

          </Tab>
          <Tab label="By Nutrient" value="nutrients">
            <div>
              <br />

              <Card >
                <CardHeader
                  title="Purchases vs. Recommended Intake by Nutrient"
                  subtitle="Click Nutrient Labels for Nutrient Specific Recipes"
                  subtitleColor="#03A9F4"
                />
                {nutrientDefDiv.toReact()}
              </Card>
              <br />
              <div>
                <GridList
                  cols={2}
                  cellHeight={390}
                  padding={15}
                >
                  <GridTile>
                    <Card >
                      <CardHeader
                        title="Purchases over Time by Nutrient"
                        subtitle="in grams"
                      />
                      {nutrientLineDiv.toReact()}
                    </Card>
                  </GridTile>
                  <GridTile>
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
    handleCategoryClick: (category) => {
      dispatch(getRecipes([]))
      dispatch(getRecipesByDefCategory(category))
      history.push('/recipes/deficiencies')
    },
    handleNutrientClick: (nutrient) => {
      dispatch(getRecipes([]))
      dispatch(fetchIDofDefNutrient(nutrient))
      history.push('/recipes/deficiencies')
    }
  }
}

export default withRouter(connect(mapProps, mapDispatch)(GraphVisualizations));

