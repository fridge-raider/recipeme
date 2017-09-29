const Sequelize = require('sequelize')
const db = require('./server/db');
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
	const instance = { name: ''};
	instance.name = ingredient;
	rows.push(instance);
})

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
