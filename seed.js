const Sequelize = require('sequelize')
const db = require('./server/db');
const {Ingredient, NutrientsAPIID} = require('./server/db/models')

var fileName = require('./trainCategories.json');
var ingredients = new Set();

var fileNutrientsIng = require('./nutrientsIngredients.json');
var fileNutID = require('./nutritionID.json')

const rows = [];
const rowsNut = [];

// fileName.map(recipe => {
// 	var ing = recipe.ingredients;
// 	for(var i=0; i<ing.length; i++) {
// 		ingredients.add(ing[i]);
// 	}
// })

fileNutID.forEach(nutrient => {
	const instance = {
		name: '',
		apiId: 0
	}
	instance.name = nutrient.name
	instance.apiId = nutrient.apiId

	rowsNut.push(instance)
})

fileNutrientsIng.forEach(ingredient => {
	const instance = { 
		name: '', 
		servingQty: 0, 
		nf_calories: 0.0,
		nf_total_fat: 0.0,
		nf_saturated_fat: 0.0,
  	nf_sodium: 0.0,
  	nf_total_carbohydrate: 0.0,
  	nf_dietary_fiber: 0.0,
  	nf_sugars: 0.0,
  	nf_protein: 0.0,
  	nf_potassium: 0.0,
  	nf_p: 0.0,
	}
	instance.name = ingredient.food_name
	instance.servingQty = ingredient.serving_qty
	instance.nf_calories = ingredient.nf_calories
	instance.nf_total_fat = ingredient.nf_total_fat
	instance.nf_saturated_fat = ingredient.nf_saturated_fat
	instance.nf_sodium = ingredient.nf_sodium
	instance.nf_total_carbohydrate = ingredient.nf_total_carbohydrate
	instance.nf_dietary_fiber = ingredient.nf_dietary_fiber
	instance.nf_sugars = ingredient.nf_sugars
	instance.nf_protein = ingredient.nf_protein
	instance.nf_potassium = ingredient.nf_potassium
	instance.nf_p = ingredient.nf_p

	rows.push(instance)
})

// ingredients.forEach(ingredient => {
// 	const instance = { name: ''};
// 	instance.name = ingredient;
// 	rows.push(instance);
// })

const seed = () => {
	const allIngredients = rows.map(row => {
		return Ingredient.create(row);
	})
	console.log('hi', rowsNut)
	const allNutID = rowsNut.map(row => {
		// console.log(row)
		return NutrientsAPIID.create(row);
	})

	const totalArrPromise = allNutID.concat(allIngredients)
	console.log(totalArrPromise); 
	return Promise.all(totalArrPromise)
}

// seed()
// 	.then(() => console.log("hi"))


const main = () => {
	console.log('Syncing db...');
	db.sync({ force: true })
		.then(() => {
			console.log('Seeding database...');
			return seed();
		}).catch(err => {
			console.log('Error while seeding');
			console.log(err.stack);
		}).then(() => {
			console.log("Done seeding");
			db.close();
			return null;
		});
}

main();
