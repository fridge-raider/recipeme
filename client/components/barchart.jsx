import * as d3 from 'd3'; 
import c3 from 'c3' ;
import React, { Component } from 'react'; 
import ReactFauxDOM from 'react-faux-dom'; 
//import dataFile from './data.csv'; 

//const someDiv = new ReactFauxDOM.Element('div'); 



// const margin = {top: 5, right: 5, bottom: 50, left: 50}; 
// const graphWidth = 960 - margin.left - margin.right; 
// const graphHeight = 500 - margin.top - margin.bottom; 
// const timeScale = d3.scaleTime().domain([new Date(2013, 13, 1), new Date(2017, 29, 9)]).range([0, 20]); 


class BarChart extends Component {





   componentDidMount() {
      var chart = c3.generate({
         
         data: {
            x: 'x',
            columns: [
               ['x',  '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'], 
               ['produce', 150, 200, 100, 400, 150, 250],
               ['dairy', 130, 340, 200, 500, 250, 350],
               ['soda', 130, 340, 140, 500, 250, 350],
               ['snacks', 130, 340, 150, 300, 200, 350],
               ['breads', 130, 160, 200, 500, 250, 350]
            ]
         }, 
         axis: {
            x: {
               type: 'timeseries', 
               tick: {
                  format: '%Y-%m-%d'
               }
            }
         }
      });

      console.log(chart); 
   }





   render() {
      let div = ReactFauxDOM.createElement('div');
      div.setAttribute('id', 'chart'); 
      return div.toReact(); 
   }
}
export default BarChart; 