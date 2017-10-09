const Sequelize = require('sequelize')
const db = require('./server/db')
const fs = require('fs')

//[Grains, Vegetables, Fruits, Dairy, Meat, Fat, NutsAndLegumes, Sugars]

const {Ingredient} = require('./server/db/models')

let getAllIngredientsPromise = Ingredient.findAll()

function main() {
	return Ingredient.findAll()
		.then(ingredients => {
			subset = ingredients.slice(0, 1000); 
			console.log(subset); 
			fs.writeFile('./allIngredients.json', JSON.stringify(subset), (err) => {
    		if (err) console.log(err)
  		})
		})
}

main(); 


