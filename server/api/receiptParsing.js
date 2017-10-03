const fs = require('fs')
const request = require('request')
const tesseract = require('node-tesseract');
const {Ingredient, ReceiptRepresentation} = require('../db/models')
const Promise = require('bluebird')

function returnCleanReceipt(imageName) {

    return new Promise(function (resolve, reject) {
      console.log('imageName', imageName)
      // Use tesseract to process a file image
      tesseract.process(__dirname + '/' + imageName, function (err, text) {
          console.log('text', text)
          if (err) {
              reject(err);
          } else {
              console.log('text',text)
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
  console.log("item in setReceipt", item.name)
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
    const words = item.name.split(' '); 
    let longestWord = words.reduce((a, b) => {return (a.length > b.length)? a : b}); 
    let Promise1 = findByReceiptRep(item); 
    let Promise2 = findByPerfectMatch(item); 
    let Promise3 = findByLongestMatch(longestWord); 
    let Promise4 = setReceiptRep(item); 
    return Promise.all([Promise1, Promise2, Promise3, Promise4])
      .then(results => {
        let ingredientName = "unknown"; 
        //loop only goes up to Promise3 because Promise4 is used to set the ReceiptRepresentation Table
        for(i=0; i<results.length-1; i++) {
          if(results[i] !== null) {
            ingredientName = results[i].name; 
            break; 
          }
        }
        return {ing: ingredientName, qty: 1, unit: 'unit', price: item.price}; 
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
