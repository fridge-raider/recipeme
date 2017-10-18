import * as d3 from 'd3';

function begOfWeekDate(date) {
  const day = new Date(date).getDay();
  return new Date(new Date(date).setHours(-24 * day)).toISOString().split('T')[0];
}

export default function getCategoryChart(categoryHistory) {

  // get date row
  const dateRow = []
  categoryHistory.forEach(categoryDate => {
    const date = begOfWeekDate(categoryDate.createdAt)
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
  categoryHistory.forEach(item => {
    const index = dateRow.indexOf(begOfWeekDate(item.createdAt))

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
    padding: {
      top: 10,
      right: 50,
      bottom: 20,
      left: 50,
    },
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
        },
        label: {
          text: 'Date',
          position: 'outer-center'
        }
      },
      y: {
        min: 0,
        padding: {
          bottom: 0
        },
        label: {
          text: 'Servings',
          position: 'outer-middle'
        }
      }
    }
  }

  const pieGraphObj = {
    padding: {
      top: 0,
      right: 0,
      bottom: 10,
      left: 0,
    },
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
