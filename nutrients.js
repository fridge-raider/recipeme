const Sequelize = require('sequelize')
const db = require('./server/db');
const axios = require('axios')
const secret = require('./secrets')
const fs = require('fs')

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

// console.log(rows.length)

let newRow = rows.slice(6000)
const rowString = newRow.join(', ')
console.log(newRow)

var instance = axios.create({
  baseURL: "https://trackapi.nutritionix.com/v2/natural/nutrients",
  timeout: 100000000,
  headers: {
 "x-app-id": process.env.NUTRITIONIX_ID,
 "x-app-key":process.env.NUTRITIONIX_KEY,
  }
});


instance.post('/',  {"query": rowString})
  .then(res => fs.writeFile('./nutrientAllIngredientsattempt5.json', JSON.stringify(res.data.foods), (err) => {
    if (err) console.log(err)
  }))
  .catch(console.error)

// function ingredientToNutrient() {
//   axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients')
// }
