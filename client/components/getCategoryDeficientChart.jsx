const categories = ["Grains", "Vegetables", "Fruits", "Dairy", "Meat", "Fats and Oil", "Nuts and Legumes", "Added Sugars"]
import IconButton from 'material-ui/IconButton';
import React, { Component } from 'react';

export default function getCategoryDeficientChart(deficits, onClickHandler) {

  const avgDailyConsumption = []
  const dailyRecommendations = []

  // for every item in deficits, add to the consumption and rec arrays
  Object.keys(deficits).forEach(category => {
    avgDailyConsumption.push(deficits[category][0])
    dailyRecommendations.push(deficits[category][1])
  })

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
    }
  }

  return chartObj

}
