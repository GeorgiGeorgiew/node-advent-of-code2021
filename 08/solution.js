const fs = require('fs');

fs.readFile('./input', 'utf8' , (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    // const DIGIT_LEDS = ["abcefg", "cf", "acdeg", "acdfg", "bcdf", "abdfg", "abdefg", "acf", "abcdefg", "abcdfg"]

    lines = data.split("\n")
    countDigitsUniqueSegLength = lines.filter(l => l.trim().length>0)
    .map(l => l.split("|")[1].trim())
    .map(outLine => outLine.split(" "))
    .flatMap(a => a)
    .filter(seg => seg.length == 2 || seg.length == 3 || seg.length == 4 || seg.length == 7)
    .length
    
    
    console.log(countDigitsUniqueSegLength)

})