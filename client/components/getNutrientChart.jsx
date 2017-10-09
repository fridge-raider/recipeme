import * as d3 from 'd3';


export default function getNutrientChart(nutrientHistory) {

     // get date row
     const dateRow = []

     nutrientHistory.forEach(categoryDate => {
       const date = new Date(categoryDate.createdAt).toISOString().split('T')[0]
       if (!dateRow.includes(date)) dateRow.push(date)
     })
     dateRow.sort()

     const calRow = new Array(dateRow.length).fill(0)
     const fatRow = new Array(dateRow.length).fill(0)
     const satFatRow = new Array(dateRow.length).fill(0)
     const sodiumRow = new Array(dateRow.length).fill(0)
     const carbRow = new Array(dateRow.length).fill(0)
     const fiberRow = new Array(dateRow.length).fill(0)
     const sugarRow = new Array(dateRow.length).fill(0)
     const proteinRow = new Array(dateRow.length).fill(0)
     const potassRow = new Array(dateRow.length).fill(0)
     const pRow = new Array(dateRow.length).fill(0)

     // for every item, find the category and date to add servings
     console.log('nutrient history', nutrientHistory)
     nutrientHistory.forEach(item => {
      const index = dateRow.indexOf(new Date(item.createdAt).toISOString().split('T')[0])

      calRow[index] += item.nf_calories
      fatRow[index] += item.nf_total_fat
      satFatRow[index] += item.nf_saturated_fat
      sodiumRow[index] += item.nf_sodium
      carbRow[index] += item.nf_total_carbohydrate
      fiberRow[index] += item.nf_dietary_fiber
      sugarRow[index] += item.nf_sugars
      proteinRow[index] += item.nf_protein
      potassRow[index] += item.nf_potassium
      pRow[index] += item.nf_p

    })

     dateRow.unshift('x')
     calRow.unshift('Calories (kCal)')
     fatRow.unshift('Total Fat')
     satFatRow.unshift('Saturated Fats')
     carbRow.unshift('Carbs')
     fiberRow.unshift('Fibers')
     sugarRow.unshift('Sugars')
     proteinRow.unshift('Proteins')
     sodiumRow.unshift('Sodium')
     potassRow.unshift('Potassium')
     pRow.unshift('Phosphorous')

     console.log('calRow', calRow)

     const lineGraphNutObj = {
       data: {
        x: 'x',
        columns: [
           dateRow,
           fatRow,
           satFatRow,
           //sodiumRow,
           carbRow,
           fiberRow,
           sugarRow,
           proteinRow,
           //potassRow,
           //pRow
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
     }

     const pieGraphNutObj = {
      data: {
       columns: [
        fatRow,
        satFatRow,
        //sodiumRow,
        carbRow,
        fiberRow,
        sugarRow,
        proteinRow,
        //potassRow,
        //pRow
       ],
       type: 'pie'
      }
    }


    console.log('linegraph', lineGraphNutObj)
    console.log('pie', pieGraphNutObj)
   return {
    lineGraphNutObj,
    pieGraphNutObj
   }


  }
