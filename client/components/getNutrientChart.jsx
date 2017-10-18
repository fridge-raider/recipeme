export default function getNutrientChart(nutrientHistory) {

  // get date row
  const dateRow = []

  nutrientHistory.forEach(categoryDate => {
    const date = begOfWeekDate(categoryDate.createdAt)
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
  nutrientHistory.forEach(item => {
    const index = dateRow.indexOf(begOfWeekDate(item.createdAt))

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


  const lineGraphNutObj = {
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
        fatRow,
        satFatRow,
        carbRow,
        fiberRow,
        sugarRow,
        proteinRow,
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
        label: {
          text: 'Grams',
          position: 'outer-middle'
        }
      }
    }
  }

  const pieGraphNutObj = {
    padding: {
      top: 0,
      right: 0,
      bottom: 10,
      left: 0,
    },
    data: {
      columns: [
        fatRow,
        satFatRow,
        carbRow,
        fiberRow,
        sugarRow,
        proteinRow
      ],
      type: 'pie'
    }
  }

  return {
    lineGraphNutObj,
    pieGraphNutObj
  }
}

function begOfWeekDate(date) {
  const day = new Date(date).getDay();
  return new Date(new Date(date).setHours(-24 * day)).toISOString().split('T')[0];
}
