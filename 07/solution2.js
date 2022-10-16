const fs = require('fs');

fs.readFile('./input', 'utf8' , (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    input = data.split(",").map(a => parseInt(a))
    maxVal = input.reduce((a,b) => Math.max(a,b), 0)
    horizPosWithMinSteps = 0;
    minFuelUsage = -1;
    for(candidateForHorizPos = 0; candidateForHorizPos <= maxVal; candidateForHorizPos++) {
        fuelUsage = input.map(a => calcFuelUsage(Math.abs(a - candidateForHorizPos))).reduce((a,b)=>a+b, 0)
        if(minFuelUsage == -1 || fuelUsage < minFuelUsage) {
            horizPosWithMinSteps = candidateForHorizPos;
            minFuelUsage = fuelUsage
        }
    }
    
    console.log("horizontalPos: " + horizPosWithMinSteps)
    console.log("minSteps: " + minFuelUsage)

})

function calcFuelUsage(diff) {
    // Gaussian sum formula
    return diff * (diff + 1) / 2
}