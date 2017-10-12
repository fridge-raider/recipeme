const Sequelize = require('sequelize')
const db = require('../server/db');
const {Ingredient} = require('../server/db/models')
const fs = require('fs')
//Meat, Grains, Vegetables, Fruits, Dairy, Fat, NutsAndLegumes, Sugars
const seed = () => {

	// return Ingredient.findAll({
	// 	where: {
	// 		category: 'Vegtables'
	// 	}
	// }).then(allIngredients => {
	// 	console.log(allIngredients)
	// 	let promises = allIngredients.map(ingred => {
	// 		return ingred.update({category:'Vegetables'})
	// 	})
	// 	return Promise.all(promises)
	// })

	return Ingredient.findAll().then(ingredients => {
		sorted = ingredients.sort();
  	fs.writeFile('./ingredientCategories.js', JSON.stringify(sorted), (err) => {
      if (err) console.log(err)
    })
	})

}

const main = () => {
	console.log('Syncing db...');
	db.sync({ force: false })
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
