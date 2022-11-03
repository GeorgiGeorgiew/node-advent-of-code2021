const fs = require('fs');

fs.readFile('./input', 'utf8' , (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    pairInsertionRules = new Map()
    currentPolymer = data.split("\n\n")[0].trim()
    pairInsertionRulesLines = data.split("\n\n")[1]
    
    pairInsertionRulesLines.split("\n")
        .forEach(l => pairInsertionRules.set(l.split(" -> ")[0], l.split(" -> ")[1]))

    for(step = 0; step < 10; step++) {
        newPolymer = ""
        for(idx = 0; idx < currentPolymer.length - 1; idx++) {
            newPolymer += currentPolymer.charAt(idx)
            newPolymer += pairInsertionRules.get(currentPolymer.substring(idx, idx+2))
        }
        newPolymer += currentPolymer.substring(currentPolymer.length-1)
        currentPolymer = newPolymer
    }

    occurancesMap = new Map()
    for(elem of currentPolymer.split('')) {
        if(occurancesMap.has(elem)) {
            curOccurOfElem = occurancesMap.get(elem) + 1
            occurancesMap.set(elem, curOccurOfElem)
        } else {
            occurancesMap.set(elem, 1)
        }
    }

    maxOccur = Array.from(occurancesMap.values()).reduce((a,b) => Math.max(a,b))
    minOccur = Array.from(occurancesMap.values()).reduce((a,b) => Math.min(a,b))
    console.log(maxOccur - minOccur)

})