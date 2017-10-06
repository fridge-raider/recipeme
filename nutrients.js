const Sequelize = require('sequelize')
const db = require('./server/db');
const axios = require('axios')
const secret = require('./secrets')
const fs = require('fs')
const {Ingredient} = require('./server/db/models')

var fileName = require('./trainCategories.json');
var ingredients = new Set();

const rows = [];

fileName.map(recipe => {
	var ing = recipe.ingredients;
	for(var i=0; i<ing.length; i++) {
		ingredients.add(ing[i]);
	}
})

ingredients.forEach(ingredient => {
	// const instance = { name: ''};
  // instance.name = ingredient;
	rows.push('1 serving of ' + ingredient);
})

console.log(rows.length)

let firstRows = rows.slice(0, 1000).join(', ')
let secondRows = rows.slice(1000, 2000).join(', ')
let thirdRows = rows.slice(2000, 3000).join(', ')
let fourthRows = rows.slice(3000, 3700).join(', ') + rows.slice(3720, 4000).join(', ') 
let fifthRows = rows.slice(4000, 4650).join(', ') + rows.slice(4670, 5000).join(', ') 
let sixthRows = rows.slice(5000, 6000).join(', ')
let seventhRows = rows.slice(6000).join(', ')

var instance = axios.create({
  baseURL: "https://trackapi.nutritionix.com/v2/natural/nutrients",
  timeout: 100000000,
  headers: {
 "x-app-id": process.env.NUTRITIONIX_ID,
 "x-app-key":process.env.NUTRITIONIX_KEY,
  }
});


// const Promise1 = instance.post('/',  {"query": firstRows})
//   .then(res => fs.writeFile('./nutrients1000.json', JSON.stringify(res.data.foods), (err) => {
//     if (err) console.log(err)
//   }))
//   .catch(console.error)

// const Promise2 = instance.post('/',  {"query": secondRows})
//   .then(res => fs.writeFile('./nutrients2000.json', JSON.stringify(res.data.foods), (err) => {
//     if (err) console.log(err)
//   }))
//   .catch(console.error)

// const Promise3 = instance.post('/',  {"query": thirdRows})
//   .then(res => fs.writeFile('./nutrients3000.json', JSON.stringify(res.data.foods), (err) => {
//     if (err) console.log(err)
//   }))
//   .catch(console.error)

// const Promise4 = instance.post('/',  {"query": fourthRows})
//   .then(res => fs.writeFile('./nutrients4000.json', JSON.stringify(res.data.foods), (err) => {
//     if (err) console.log(err)
//   }))
//   .catch(console.error)

// const Promise5 = instance.post('/',  {"query": fifthRows})
//   .then(res => fs.writeFile('./nutrients5000.json', JSON.stringify(res.data.foods), (err) => {
//     if (err) console.log(err)
//   }))
//   .catch(console.error)

// const Promise6 = instance.post('/',  {"query": sixthRows})
//   .then(res => fs.writeFile('./nutrients6000.json', JSON.stringify(res.data.foods), (err) => {
//     if (err) console.log(err)
//   }))
//   .catch(console.error)

// const Promise7 = instance.post('/',  {"query": seventhRows})
//   .then(res => fs.writeFile('./nutrients7000.json', JSON.stringify(res.data.foods), (err) => {
//     if (err) console.log(err)
//   }))
//   .catch(console.error)

//const all = [].concat(Promise1).concat(Promise2).concat(Promise3).concat(Promise4).concat(Promise5).concat(Promise6).concat(Promise7)

// function ingredientToNutrient() {
//   axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients')
// }
function main() {
  Ingredient.findAll()
    .then(arr => {
      const subSet = arr.slice(2000)
      console.log('subset', subSet.length)
      fs.writeFile('./ingredients3000.json', JSON.stringify(subSet), (err) => {
        if (err) console.log(err)
      })
    })
    .then(() => console.log('im done'))
    .catch(console.error)

}

main()
