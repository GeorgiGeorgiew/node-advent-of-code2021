const fs = require('fs');

fs.readFile('./input', 'utf8' , (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    input = data.split(",").map(a => parseInt(a))
    maxVal = input.reduce((a,b) => Math.max(a,b), 0)
    horizPosWithMinSteps = 0;
    minSteps = -1;
    for(candidateForHorizPos = 0; candidateForHorizPos <= maxVal; candidateForHorizPos++) {
        steps = input.map(a => Math.abs(a - candidateForHorizPos)).reduce((a,b)=>a+b, 0)
        if(minSteps == -1 || steps < minSteps) {
            horizPosWithMinSteps = candidateForHorizPos;
            minSteps = steps
        }
    }
    
    console.log("horizontalPos: " + horizPosWithMinSteps)
    console.log("minSteps: " + minSteps)

})