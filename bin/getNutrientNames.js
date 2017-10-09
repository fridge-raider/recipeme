const Sequelize = require('sequelize')
const db = require('./server/db');
const {Ingredient, NutrientsAPIID, OrderHistory} = require('./server/db/models')
const fs = require('fs')
const ingredients = require('./ingredientNames.js'); 
let map = {2: [], 5: [], 7: [], a: [], b: [], c: [], d: [], e: [], f: [], g: [], h: [], i: [], j: [], k: [], l: [], m: [], n: [], o: [], p: [], q: [], r: [], s: [], t: [], u: [], v: [], w: [], x: [], y: [], z: []}; 

const seed = () => {
	return Ingredient.findAll({
    attributes : ['name']
  }).then(ingredients => {
    let ingred = ingredients.map(ingredient => ingredient.name); 
    
   	ingred = ingred.sort(); 
   	for(let i=0; i<ingred.length; i++) {
   		let first = ingred[i].charAt(0)
   		map[first].push(ingred[i])
   	}
  	fs.writeFile('./ingredientNames.js', JSON.stringify(map), (err) => {
      if (err) console.log(err)
    })
   console.log(map.a); 
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

	// for(let i=0; i<ingredients.length; i++) {
 //   		let first = ingred[i].charAt(0)
 //   		map[first].push(ingred[i])
 //   	}
 //  	fs.writeFile('./ingredientNames.js', JSON.stringify(map), (err) => {
 //      if (err) console.log(err)
 //    })


}

main();