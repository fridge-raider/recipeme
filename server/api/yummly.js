// var Yummly = require("ws-yummly");
var secrets = require('../../secrets');

// Yummly.config({
// 	app_id : process.env.YUMMLY_ID,
// 	app_key : process.env.YUMMLY_KEY,
// });
const Yapp_id = process.env.YUMMLY_ID
const Yapp_key = process.env.YUMMLY_KEY

const NBDapp_key = process.env.NBD_KEY

export const getFoodsbyNut = (nut) => {
  
}


// const getByIngredient = (ingredient) => {
//   Yummly.getMeta('ingredient', ingredient)
//     .then((recipes) => {
//       res.send(recipes)
//     })
//     .catch(console.log)
// }

// export const getByIngredient = (ingredient) => {
//   Yummly.query(ingredient)
//     .maxResults(10)
//     .minRating(3)
//     .get()
//     .then((recipes) => {
//       console.log(recipes, 'recipes')
//     })
// }

export const getByIngredient = (ingredient) => {

}