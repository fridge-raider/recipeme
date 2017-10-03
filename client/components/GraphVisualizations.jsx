import * as d3 from 'd3';
import c3 from 'c3' ;
import React, { Component } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Card, Container, Form, Grid, Header } from 'semantic-ui-react'

const categories = ["Grains","Vegetables", "Fruits", "Dairy", "Meat", "Fat", "NutsAndLegumes", "Sugars"]

class GraphVisualizations extends Component {

   componentDidMount() {
     console.log('histories', this.props.categoryHistory, this.props.nutrientHistory)

     // get date row
     const dateRow = []
     this.props.categoryHistory.map(categoryDate => {
       const date = new Date(categoryDate.createdAt).toISOString().split('T')[0]
       if (!dateRow.includes(date)) dateRow.push(date)
     })
     dateRow.sort()

     // get category rows
     const grainRow = new Array(dateRow.length).fill(0)
     const veggieRow = new Array(dateRow.length).fill(0)
     const fruitRow = new Array(dateRow.length).fill(0)
     const dairyRow = new Array(dateRow.length).fill(0)
     const meatRow = new Array(dateRow.length).fill(0)
     const fatRow = new Array(dateRow.length).fill(0)
     const nutsRow = new Array(dateRow.length).fill(0)
     const sugarRow = new Array(dateRow.length).fill(0)

     // for every item, find the category and date to add servings
    this.props.categoryHistory.map(item => {
      const index = dateRow.indexOf(new Date(item.createdAt).toISOString().split('T')[0])

      if (item['ingredient.category'] === 'Grains') grainRow[index] = item.servingCount
      if (item['ingredient.category'] === 'Vegetables') veggieRow[index] = item.servingCount
      if (item['ingredient.category'] === 'Fruits') fruitRow[index] = item.servingCount
      if (item['ingredient.category'] === 'Dairy') dairyRow[index] = item.servingCount
      if (item['ingredient.category'] === 'Meat') meatRow[index] = item.servingCount
      if (item['ingredient.category'] === 'Fat') fatRow[index] = item.servingCount
      if (item['ingredient.category'] === 'NutsAndLegumes') nutsRow[index] = item.servingCount
      if (item['ingredient.category'] === 'Sugars') sugarRow[index] = item.servingCount

    })

     dateRow.unshift('x')
     grainRow.unshift('Grains')
     veggieRow.unshift('Vegetables')
     fruitRow.unshift('Fruits')
     dairyRow.unshift('Dairy')
     meatRow.unshift('Meat')
     fatRow.unshift('Fat')
     nutsRow.unshift('Nuts And Legumes')
     sugarRow.unshift('Added Sugars')

     console.log('dateRow', dateRow)
     console.log('grainRow', grainRow)
     console.log('veggieRow', veggieRow)


      var chart = c3.generate({

         data: {
            x: 'x',
            columns: [
               dateRow,
               grainRow,
               veggieRow,
               fruitRow,
               dairyRow,
               meatRow,
               fatRow,
               nutsRow,
               sugarRow
            ]
         },
         axis: {
            x: {
               type: 'timeseries',
               tick: {
                  format: '%m-%d-%Y'
               }
            },
            y: {
              min: 0,
              padding : {
                bottom : 0
              }
            }
         }
      });

      console.log(chart);
   }



   render() {
      let div = ReactFauxDOM.createElement('div');
      div.setAttribute('id', 'chart');
      return (
        <Container fluid>
        <Header as='h2' textAlign='center'>Purchasing History</Header>
        {div.toReact()}
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

