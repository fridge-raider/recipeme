import * as d3 from 'd3';
const categories = ["Grains","Vegetables", "Fruits", "Dairy", "Meat", "Fat", "NutsAndLegumes", "Sugars"]


export default function getNutrientChart(nutrientHistory) {

     // get date row
     const dateRow = []
     const calRow = []
     const fatRow = []
     const satFatRow = []
     const sodiumRow = []
     const carbRow = []
     const fiberRow = []
     const sugarRow = []
     const proteinRow = []
     const potassRow = []
     const pRow = []

     nutrientHistory.forEach(categoryDate => {
       const date = new Date(categoryDate.createdAt).toISOString().split('T')[0]
       if (!dateRow.includes(date)) dateRow.push(date)
     })
     dateRow.sort()

     // for every item, find the category and date to add servings
     nutrientHistory.forEach(item => {
      const index = dateRow.indexOf(new Date(item.createdAt).toISOString().split('T')[0])

      calRow[index] = item.nf_calories
      fatRow[index] = item.nf_total_fat
      satFatRow[index] = item.nf_saturated_fat
      sodiumRow[index] = item.nf_sodium
      carbRow[index] = item.nf_total_carbohydrate
      fiberRow[index] = item.nf_dietary_fiber
      sugarRow[index] = item.nf_sugars
      proteinRow[index] = item.nf_protein
      potassRow[index] = item.nf_potassium
      pRow[index] = item.nf_p

    })

     dateRow.unshift('x')
     calRow.unshift('Calories (kCal)')
     fatRow.unshift('Total Fat (g)')
     satFatRow.unshift('Saturated Fats (g)')
     sodiumRow.unshift('Sodium (mg)')
     carbRow.unshift('Carbs (g)')
     fiberRow.unshift('Fibers (g)')
     sugarRow.unshift('Sugars (g)')
     proteinRow.unshift('Proteins (g)')
     potassRow.unshift('Potassium (mg)')
     pRow.unshift('Phosphorous (mg)') //update this

     const chartObj = {}
     chartObj.data = {
      x: 'x',
      columns: [
         dateRow,
         fatRow,
         satFatRow,
         sodiumRow,
         carbRow,
         fiberRow,
         sugarRow,
         proteinRow,
         potassRow,
         pRow
      ]
   }

    chartObj.axis = {
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

   return chartObj


  }
