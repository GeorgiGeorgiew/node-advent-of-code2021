const fs = require('fs');
const LINE_LENGTH = 12

fs.readFile('./input', 'utf8' , (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    allFish = data.split(",").map(a => parseInt(a))
    fishPerCounter = new Array(9).fill(0);
    allFish.forEach(f => fishPerCounter[f]++)
    for(day = 0; day < 256; day++) {
        fishPerCounter = oneDayLater(fishPerCounter)
    }
    solution = fishPerCounter.reduce((a,b)=>a+b, 0)
    console.log(solution)
})

function oneDayLater(fishPerCounterInput) {
    fishPerCounterOutput = new Array(9).fill(0)
    for(i = 1; i <= 8; i++) {
        fishPerCounterOutput[i-1] = fishPerCounterInput[i]
    }
    fishPerCounterOutput[8] = fishPerCounterInput[0]
    fishPerCounterOutput[6] = fishPerCounterOutput[6] + fishPerCounterInput[0]
    return fishPerCounterOutput;
}
