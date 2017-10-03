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
	const instance = { name: ''};
	instance.name = ingredient;
	rows.push(ingredient);
})

let trialRows = rows.splice(0,50)
const rowString = trialRows.join(', ')

var instance = axios.create({
  baseURL: "https://trackapi.nutritionix.com/v2/natural/nutrients",
  timeout: 10000,
  headers: {
 "x-app-id": process.env.NUTRITIONIX_ID,
 "x-app-key":process.env.NUTRITIONIX_KEY,
  }
});

console.log(instance, 'plsssss')

let dataFoods = [];

instance.post('/',  {"query": rowString})
  // .then(res => {
  //   dataFoods.push(res.data)
  // })
  // .then(() => fs.writeFile('./nutrientfifty.json', dataFoods, (err) => {
  //   if (err) console.log(err)
  // }))
  .then(res => fs.writeFile('./nutrientfifty.json', JSON.stringify(res.data), (err) => {
    if (err) console.log(err)
  }))
  .catch(console.error)

// function ingredientToNutrient() {
//   axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients')
// }
