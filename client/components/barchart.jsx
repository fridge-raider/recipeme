import * as d3 from 'd3'; 
import React, { Component } from 'react'; 
import ReactFauxDOM from 'react-faux-dom'; 

//const someDiv = new ReactFauxDOM.Element('div'); 
const margin = {top: 5, right: 5, bottom: 50, left: 50}; 
const fullWidth = 700; 
const fullHeight = 500; 
class BarChart extends Component {
   render() {
      let div = ReactFauxDOM.createElement('div');
      div.setAttribute('class', 'chart'); 
      // console.log(d3); 
      var dataArray = [23, 13, 21, 14, 37, 15, 18, 34, 30];
      const svg = d3.select(div).append(svg); 
      // svg.append("rect") 
      //    .attr("height", "250px")
      //    .attr("width", "250px")
      //    .attr("fill", "pink");

       svg.selectAll("div")
         .data(dataArray)
         .enter()
         .append("div")
         .style("width", (d) => {return d*10 + "px"})
         .text((d) => { return d; });  

      return div.toReact(); 
   }
}
export default BarChart; 