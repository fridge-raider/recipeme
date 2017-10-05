const Sequelize = require('sequelize')
const db = require('./server/db');
const {Ingredient, NutrientsAPIID} = require('./server/db/models')

let setIngredients = new Set(); 
var fileNutrientsIng = require('./nutrientsAll.json')
var fileNutID = require('./nutritionID.json')

const rows = [];
const rowsNut = [];

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

	if(!setIngredients.has(instance.name)) {
		setIngredients.add(instance.name); 
		rows.push(instance); 
	}
})

const seed = () => {
	const allIngredients = rows.map(row => {
		return Ingredient.create(row)
	})

	const allNutID = rowsNut.map(row => {
		return NutrientsAPIID.create(row)
	})

	const totalArrPromise = allNutID.concat(allIngredients)
	return Promise.all(totalArrPromise)
}

const main = () => {
	console.log('Syncing db...');
	db.sync({ force: true })
		.then(() => {
			console.log('Seeding database...')
			return seed();
		}).catch(err => {
			console.log('Error while seeding')
			console.log(err.stack);
		}).then(() => {
			console.log("Done seeding")
			db.close();
			return null;
		});
}

main();
