const fs = require('fs')
const tesseract = require('node-tesseract');
const {Ingredient, ReceiptRepresentation} = require('../db/models')
const Promise = require('bluebird')
const path = require('path')

function returnCleanReceipt(imageName) {

    return new Promise(function (resolve, reject) {
      // Use tesseract to process a file image
      tesseract.process(__dirname + '/' + imageName, function (err, text) {
          if (err) {
              reject(err);
          } else {
              // write the file image to a text file
              fs.writeFileSync('receipt.txt', text, err => {
                  if (err) reject(err)
                  console.log('file has beed saved')
              })

              // read in the text file and start cleaning
              return fs.readFile('receipt.txt', 'utf-8', (err) => {
                  if (err) {
                      reject(err)
                  }
                  const lines = text.split('\n');
                  const cleanLines = [];
                  const priceRegex = /\$*\d+\s*[\.\,\-]\s*\d+\s*\w*\$*/;
                  for (let i = 0; i < lines.length; i++) {
                      const item = {};
                      if (lines[i].match(priceRegex)) {
                          item.price = lines[i].match(priceRegex)[0];
                          item.name = lines[i].substring(0, lines[i].indexOf(item.price)).trim().toLowerCase();
                          item.price = item.price.replace(',', '.').replace(/\s+/, '').replace(/([a-zA-Z])/, '');
                          item.name = item.name.replace(/[^\w\s]/, '');
                          const tempName = item.name.replace(/\s/g, '');
                          if (tempName.match(/^[0-9]*$/)) item.name = null
                          if (tempName.includes('total') || tempName.includes('cash')) item.name = null
                      }
                      if (item.name && item.price) {
                          cleanLines.push(item);
                      }
                  }
                  resolve(cleanLines)
              })
          }
      });
    });
}

function setReceiptRep(item) {
  return ReceiptRepresentation.findOrCreate({
    where: {
      rep: item.name
    }
  })
}

function findByReceiptRep(item) {
  return ReceiptRepresentation.findOne({
    where: {
      rep: item.name
    }
  })
}

function findByPerfectMatch(item) {
  return Ingredient.findOne({
    where: {
      name: {
        $like: `%${item.name}%`
      }
    }
  })
}

function findByLongestMatch(longestWord) {
  return Ingredient.findOne({
    where: {
      name: {
        $like: `%${longestWord}%`
      }
    }
  })
}

function getReceiptIngredients(parsedReceipt) {

  return Promise.mapSeries(parsedReceipt, item => {
    let Promise4 = setReceiptRep(item);
    return Promise4.then(() => {
      const words = item.name.split(' ');
      let longestWord = words.reduce((a, b) => {return (a.length > b.length)? a : b});
      let Promise1 = findByReceiptRep(item);
      let Promise2 = findByPerfectMatch(item);
      let Promise3 = findByLongestMatch(longestWord);
      return Promise.all([Promise1, Promise2, Promise3])
      .then(results => {
        let ingredientName = "unknown";
        let category = "Unsure";
        //check representation first, then perfect matching, and finally longest match
        if(results[0] !== null && results[0].ingredientName !== null) {
          ingredientName = results[0].ingredientName;
          category = results[0].ingredient.category;
        }
        else if(results[1] !== null) {
          ingredientName = results[1].name;
          category = results[1].category;
        }
        else if(results[2] !== null) {
          ingredientName = results[2].name;
          category = results[2].category;
        }
        return {ing: ingredientName, servings: 1, price: item.price, category: category, rep: item.name};
      })
    })
  })
  .then(receiptIngArr => {
    return receiptIngArr
})
}


module.exports = {
    returnCleanReceipt: returnCleanReceipt,
    getReceiptIngredients: getReceiptIngredients
}
