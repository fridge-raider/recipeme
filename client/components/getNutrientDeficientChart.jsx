const nutrients = ['Total Fat', 'Sat Fat', 'Carbs', 'Fiber', 'Sugar', 'Protein']

export default function getNutrientDeficientChart(deficits) {

     const avgDailyConsumption = []
     const dailyRecommendations = []
      console.log('deficits', deficits)

     // for every item in deficits, add to the consumption and rec arrays
     for (let nutrient in deficits) {
       if (nutrient === 'nf_total_fat' || nutrient === 'nf_saturated_fat' || nutrient === 'nf_dietary_fiber' || nutrient === 'nf_protein' || nutrient === 'nf_sugars' || nutrient === 'nf_total_carbohydrate') {
        avgDailyConsumption.push(deficits[nutrient][0])
        dailyRecommendations.push(deficits[nutrient][1])
        nutrients.push(nutrient)
       }
     }

     avgDailyConsumption.unshift('Average Weekly Purchases')
     dailyRecommendations.unshift('Recommended Weekly Intake')

     const chartObj = {
      padding: {
        top: 10,
        right: 50,
        bottom: 20,
        left: 70,
    },
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
          text: 'Grams',
          position: 'outer-middle'
        }
      }
  }
    }

   return chartObj


  }
