const categories = ["Grains", "Vegetables", "Fruits", "Dairy", "Meat", "Fats and Oil", "Nuts and Legumes", "Added Sugars"]
import IconButton from 'material-ui/IconButton';
import React, { Component } from 'react';

export default function getCategoryDeficientChart(deficits) {
  console.log('deficits', deficits)
  const avgDailyConsumption = []
  const dailyRecommendations = []

  // for every item in deficits, add to the consumption and rec arrays
  for (let category in deficits) {

    avgDailyConsumption.push(deficits[category][0])
    dailyRecommendations.push(deficits[category][1])
    categories.push(category)
  }


  avgDailyConsumption.unshift('Average Weekly Purchases')
  dailyRecommendations.unshift('Recommended Weekly Intake')


  const chartObj = {
    padding: {
      top: 10,
      right: 50,
      bottom: 20,
      left: 50,
  },
    data: {
      columns: [
        avgDailyConsumption,
        dailyRecommendations
      ],
      type: 'bar',
      onclick: function (d, i) {
        console.log('clicking', d, i)
      },
    },
    bar: {
      width: {
        ratio: 0.5 // this makes bar width 50% of length between ticks
      }
    },
    axis: {
      x: {
        type: 'category',
        categories: categories,
        label: {
          text: 'Food Group',
          position: 'outer-center'
        }

      },
      y: {
        label: {
          text: 'Servings',
          position: 'outer-middle'
        }
      }
    },
    tooltip: {
      contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
        const tableToReturn = `<div>
        <table class='c3-tooltip'>
        <tbody>
        <tr>
        <th colspan='2'>${categories[d[0].index]}: Click for Recipes!</th>
        </tr>
        <tr>
        <td>
        <span style="background-color:#1f77b4"></span>
        ${defaultTitleFormat(d[0].name)}
        </td>
        <td>${defaultValueFormat(d[0].value)}</td>
        </tr>
        <tr>
        <td>
        <span style="background-color:#ff7f0e"></span>
        ${defaultTitleFormat(d[1].name)}
        </td>
        <td>${defaultValueFormat(d[1].value)}</td>
        </tr>
        </tbody>
        </table>
        </div>`
        return tableToReturn
    }
  }
  }

  return chartObj

}
