const fs = require('fs');
const LINE_LENGTH = 12
var linesCounter = 0
var gamma = ""
var epsilon = ""

fs.readFile('./input', 'utf8' , (err, data) => {

    var sumForEachCol = new Array(LINE_LENGTH).fill(0)

    if (err) {
      console.error(err)
      return
    }
    var lines = data.split("\n")
    for(line in lines) {
        if(lines[line].trim() == 0) {
            continue;
        }
        linesCounter++;
        for(col = 0; col < LINE_LENGTH; col++) {
            sumForEachCol[col] += parseInt(lines[line].charAt(col));
        }
    }

    for(i = 0; i < LINE_LENGTH; i++) {
        if(sumForEachCol[i] > linesCounter - sumForEachCol[i]) {
            gamma += "1"
            epsilon += "0"
        } else {
            gamma += "0"
            epsilon += "1"
        }
    }
    
    console.log(parseInt(gamma, 2) * parseInt(epsilon, 2))
})