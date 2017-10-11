const Sequelize = require('sequelize')
const db = require('../server/db');
const {Ingredient, NutrientsAPIID, OrderHistory} = require('../server/db/models')

//var fileName = require('./trainCategories.json');

var ingredients = new Set();

// var fileNutrientsIng = require('./nutrientsAll.json');
// var fileNutID = require('./nutritionID.json')

//setting up orderhistory promises

let fileNutrientsIng = require('./ingredientCategories.js');
let fileNutID = require('./nutritionID.json')

// //setting up orderhistory promises
const order_histories = require('./order_history_seed.js');
const all_order_histories = order_histories.map(order_history => { OrderHistory.create(order_history)});

// const temp = new Set();
// const uniqueIngredients = new Set();
const rowsNut = new Set();

fileNutID.forEach(nutrient => {
	const instance = {
		name: '',
		apiId: 0,
		suggested: 0
	}
	instance.name = nutrient.name
	instance.apiId = nutrient.apiId
	instance.suggested = nutrient.suggested

	rowsNut.add(instance)
})

// fileNutrientsIng.forEach(ingredient => {

// 	const instance = {
// 		name: '',
// 		servingQty: 0,
// 		nf_calories: 0.0,
// 		nf_total_fat: 0.0,
// 		nf_saturated_fat: 0.0,
//   	nf_sodium: 0.0,
//   	nf_total_carbohydrate: 0.0,
//   	nf_dietary_fiber: 0.0,
//   	nf_sugars: 0.0,
//   	nf_protein: 0.0,
//   	nf_potassium: 0.0,
//   	nf_p: 0.0,
// 	}
// 	instance.name = ingredient.food_name
// 	instance.servingQty = ingredient.serving_qty
// 	instance.nf_calories = ingredient.nf_calories
// 	instance.nf_total_fat = ingredient.nf_total_fat
// 	instance.nf_saturated_fat = ingredient.nf_saturated_fat
// 	instance.nf_sodium = ingredient.nf_sodium
// 	instance.nf_total_carbohydrate = ingredient.nf_total_carbohydrate
// 	instance.nf_dietary_fiber = ingredient.nf_dietary_fiber
// 	instance.nf_sugars = ingredient.nf_sugars
// 	instance.nf_protein = ingredient.nf_protein
// 	instance.nf_potassium = ingredient.nf_potassium
// 	instance.nf_p = ingredient.nf_p

// 	if(!temp.has(instance.name)) {
// 		temp.add(instance.name);
// 		uniqueIngredients.add(instance);
// 	}

// })


const seed = () => {
	const ingredientPromises = [];
	const nutIdPromises = [];


	fileNutrientsIng.forEach(row => {
		ingredientPromises.push(Ingredient.create(row));
	})

	rowsNut.forEach(row => {
		nutIdPromises.push(NutrientsAPIID.create(row));
	})


	const totalArrPromise = nutIdPromises.concat(ingredientPromises)
	//console.log(allIngredients.length)

	return Promise.all(totalArrPromise)
					.then(() => {
						return OrderHistory.bulkCreate(all_order_histories)
					})


}

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
