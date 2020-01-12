'use strict'

const fs = require('fs');

let rawCSV = fs.readFileSync('elements/Periodic_Table_of_Elements.csv', 'utf8');

function csvJSON(csv){
  var lines=csv.split("\n");
  var result = [];
  // NOTE: If your columns contain commas in their values, you'll need
  // to deal with those before doing the next step 
  // (you might convert them to &&& or something, then covert them back later)
  // jsfiddle showing the issue https://jsfiddle.net/
  var headers=lines[0].split(",");
  let headersTemp = []
  for (var k = 0; k < headers.length; k++){
    let noSpaces = headers[k].replace(/ /g, "_").replace(/\(/g, "").replace(/\)/g, "").replace(/[\r\n]/g, "").toLowerCase();
    headersTemp.push(noSpaces);
  }
  headers = headersTemp
  for(var i=1;i<lines.length;i++){
      var obj = {};
      var currentline=lines[i].split(",");
      for(var j=0;j<headers.length;j++){
        // console.log(currentline[j])
          obj[headers[j]] = currentline[j];
      }
      result.push(obj);
  }
  // return result; //JavaScript object
  // return JSON.stringify(result); //JSON
  for(let l = 0; l < result.length-1; l++){
    let toBeSaved = JSON.stringify(result[l])
    fs.writeFileSync(`database/${result[l].atomic_number}_${result[l].element}.json`, toBeSaved);
  }
}

csvJSON(rawCSV)
// console.log(csvObjects)

// function saveToJson(toLocation){
  
// }

// saveToJson('database')