const nutrients = ['Calories (kCal)', 'Total Fat (g)', 'Sat Fat (g)', 'Sodium (mg)', 'Carbs (g)']

export default function getNutrientDeficientChart(deficits) {

     const avgDailyConsumption = []
     const dailyRecommendations = []


     // for every item in deficits, add to the consumption and rec arrays
     for (let nutrient in deficits) {
        avgDailyConsumption.push(deficits[nutrient][0])
        dailyRecommendations.push(deficits[nutrient][1])
        nutrients.push(nutrient)
     }

     avgDailyConsumption.unshift('Average Weekly Purchases')
     dailyRecommendations.unshift('Recommended Weekly Intake')
     const chartObj = {
      data: {
        columns: [
           avgDailyConsumption,
           dailyRecommendations
        ],
        type: 'bar'
      },
      bar: {
        width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
        }
    },
    axis: {
      x: {
          type: 'category',
          categories: nutrients,
          label: {
            text: 'Nutrients',
            position: 'outer-center'
          }

      },
      y: {
        label: {
          text: 'Units',
          position: 'outer-middle'
        }
      }
  }
    }

   return chartObj


  }
