const Sequelize = require('sequelize')
const db = require('./server/db');
const {Ingredient} = require('./server/db/models')

var fileName = require('./trainCategories.json');
var ingredients = new Set();

var fileNutrientsIng = require('./nutrientsIngredients.json');
var file = require('./try.json')

const rows = [];

// fileName.map(recipe => {
// 	var ing = recipe.ingredients;
// 	for(var i=0; i<ing.length; i++) {
// 		ingredients.add(ing[i]);
// 	}
// })



fileNutrientsIng.map(ingredient => {
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
	console.log('chicken', ingredient.food_name)
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
		Ingredient.create(row);
	})
	return Promise.all(allIngredients)
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
