import * as d3 from 'd3';

export default function getCategoryChart(categoryHistory) {

     // get date row
     const dateRow = []
     categoryHistory.forEach(categoryDate => {
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
     console.log('cat hist', categoryHistory)
    categoryHistory.forEach(item => {
      const index = dateRow.indexOf(new Date(item.createdAt).toISOString().split('T')[0])

      if (item['ingredient.category'] === 'Grains') grainRow[index] += item.servingCount
      if (item['ingredient.category'] === 'Vegetables') veggieRow[index] += item.servingCount
      if (item['ingredient.category'] === 'Fruits') fruitRow[index] += item.servingCount
      if (item['ingredient.category'] === 'Dairy') dairyRow[index] += item.servingCount
      if (item['ingredient.category'] === 'Meat') meatRow[index] += item.servingCount
      if (item['ingredient.category'] === 'Fats') fatRow[index] += item.servingCount
      if (item['ingredient.category'] === 'Nuts and Legumes') nutsRow[index] += item.servingCount
      if (item['ingredient.category'] === 'Added Sugars') sugarRow[index] += item.servingCount

    })

     dateRow.unshift('x')
     grainRow.unshift('Grains')
     veggieRow.unshift('Vegetables')
     fruitRow.unshift('Fruits')
     dairyRow.unshift('Dairy')
     meatRow.unshift('Meat')
     fatRow.unshift('Fats and Oil')
     nutsRow.unshift('Nuts and Legumes')
     sugarRow.unshift('Added Sugars')

     const lineGraphObj = {
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
     }

     const pieGraphObj = {
      data: {
       columns: [
          grainRow,
          veggieRow,
          fruitRow,
          dairyRow,
          meatRow,
          fatRow,
          nutsRow,
          sugarRow
       ],
       type: 'pie'
      }
    }


   return {
    lineGraphObj,
    pieGraphObj
   }


  }
