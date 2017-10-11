const fs = require('fs')
const tesseract = require('node-tesseract');
const {Ingredient, ReceiptRepresentation} = require('../db/models')
const Promise = require('bluebird')
const path = require('path')
// const im = require('imagemagick');
const ed = require('edit-distance');
const allIngredients = require('../../ingredientNames.js')

var insert, remove, update;
insert = remove = function(node) { return 1; };
update = (stringA, stringB) => { return stringA !== stringB ? 1 : 0; };

function receiptParsingMinDist(item) {
  let searchArr = allIngredients[item.name.charAt(0)];
  let min = item.name.length
  if(searchArr) {
    for(let i=0; i<searchArr.length; i++) {
      var lev = ed.levenshtein(item.name, searchArr[i], insert, remove, update);
      if(lev.distance < min) {
        min = lev.distance;
        //possibleWord = searchArr[i];
      }
    }
  }
  console.log(item.name, item.name.length)
  return min
}

// think about making this more modular - different functions for the if and else
// make function names descriptive
function receiptParsingInitial(text) {
  console.log('text', text)
  const lines = text.split('\n');
  const cleanLines = [];
  const priceRegex = /\$*\d+\s*[\.\,\-]\s*\d+\s*\w*\$*/;
  const itemRegex = /^[A-Za-z\s]+/;
  for (let i = 0; i < lines.length; i++) {
      const item = {};
      if (lines[i].match(priceRegex)) {
          item.price = lines[i].match(priceRegex)[0];
          item.name = lines[i].substring(0, lines[i].indexOf(item.price)).trim().toLowerCase();
          item.price = item.price.replace(',', '.').replace(/\s+/, '').replace(/([a-zA-Z])/, '');
          if(parseFloat(item.price) > 15) {
            console.log("nulling cause of price", item.name, item.price)
            item.price = null; //handles subtotal, total items that aren't handled by exact word matching, cleaning receipts should solve this problem
          }
          item.name = item.name.replace(/[^\w\s]/, '');
          const tempName = item.name.replace(/\s/g, '');
          if (tempName.match(/^[0-9]*$/)) item.name = null
          if (tempName.includes('total') || tempName.includes('cash') || tempName.includes('subtotal')) item.name = null
      } else if(lines[i].match(itemRegex)) {
        console.log('match', lines[i].match(itemRegex))
        console.log('lines', lines[i])
          //if we can get cleaner images with imagemagick, can use levenstein distaces to accuratly determine food items from other items
          item.name = lines[i].match(itemRegex)[0].replace(/[^a-zA-Z]/gi, "").trim().toLowerCase();
          item.name.replace(/[^a-zA-Z]/gi, "");
          if(receiptParsingMinDist(item) > 0) {
            console.log('nulling because not matching levenstien', item.name)
            item.name = null;
          }
          item.price = "0.00";
      }
      if (item.name && item.price) {
        if(item.name.replace(/[^a-zA-Z]/gi, "").length > 4) {
          cleanLines.push(item);
        }

      }
  }
  return cleanLines;

}


function returnCleanReceipt(imageName) {

    const options = {
      1: 'eng',
      psm: 4,
      //binary: '/usr/local/bin/tesseract',
      config: '../../receipt' //add receipt configurations to usr/local/share/tessdata/configs or wherever /tessdata/configs is located on your machine
    }

    //brew install imagemagick
    // const preprocessPromise = new Promise(function(resolve, reject) {
    //   //doesn't do anything but eventually want to get imagemagick configured with textcleaner to
    //   //properly parse low quality, poorly angled, and wrinkled receipts
    //   im.readMetadata(imageName, function(err, metadata){
    //     if (err) reject(err);
    //     console.log('Shot at '+metadata.exif.dateTimeOriginal);
    //     resolve();
    //   })
    // })

    const tesseractPromise = new Promise(function (resolve, reject) {
      // Use tesseract to process a file image
      tesseract.process(imageName, options, function (err, text) {
          if (err) {
              reject(err);
          } else {
              // write the file image to a text file
              console.log("hullo", text);
              fs.writeFileSync('receipt.txt', text, err => {
                  if (err) reject(err)
                  console.log('file has beed saved')
              })

              // read in the text file and start cleaning
              return fs.readFile('receipt.txt', 'utf-8', (err) => {
                  if (err) {
                      reject(err)
                  }
                  cleanLines = receiptParsingInitial(text);

                  resolve(cleanLines)
              })
          }
      });
    });

    return tesseractPromise
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

function findSimilarIngredient(item) {
  let min = item.name.length
  let possibleMatch = "unknown";
  let words = item.name.split(" ");
  for(let j=0; j<words.length; j++) {
    let searchArr = allIngredients[words[j].charAt(0)]
    if(searchArr) {
      for(let i=0; i<searchArr.length; i++) {
        var lev = ed.levenshtein(item.name, searchArr[i], insert, remove, update);
        if(lev.distance < min) {
          min = lev.distance;
          possibleMatch = searchArr[i];
        }
      }
    }
  }
  console.log(item.name, item.name.length, possibleMatch)
  return possibleMatch;
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

        //levenstein if none of those work
        if(ingredientName === "unknown") {
          ingredientName = findSimilarIngredient(item);
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
