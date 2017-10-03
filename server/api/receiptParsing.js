const fs = require('fs')
const request = require('request')
const tesseract = require('node-tesseract');
const {Ingredient} = require('../db/models')
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
                        console.log('lines', lines)
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
                        console.log('clean', cleanLines)
                        resolve(cleanLines)
                    })
                }
            });

    });
}

function getReceiptIngredients(parsedReceipt) {

          return Promise.map(parsedReceipt, item => {
            return Ingredient.findOne({
              where: {
                name: {
                  $like: `%${item.name}%`
                }
              }
            })
            .then(potentialMatches => {
              console.log('potentialMatches', potentialMatches)
              if (!potentialMatches) {
                console.log('try again with longest word for item ', item.name)
                const words = item.name.split(' ');
                let longestWord = ''
                let longest = 0
                for (let i = 0; i < words.length; i++) {
                  if (words[i].length > longest) {
                    longest = words[i].length
                    longestWord = words[i]
                  }
                }
                return Ingredient.findOne({
                  where: {
                    name: {
                      $like: `%${longestWord}%`
                    }
                  }
                })
                .then(newMatches => {
                  if (!newMatches) return `unknown ingredient: ${item.name}`
                  else return {ing: newMatches.name, qty: 1, unit: 'unit', price: item.price} // add get most frequent function here
                })
              }
            else {
              return {ing: potentialMatches.name, qty: 1, unit: 'unit', price: item.price} // add get most frequent function here
            }
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
