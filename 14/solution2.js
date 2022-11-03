const fs = require('fs');

fs.readFile('./input', 'utf8' , (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    pairInsertionRules = new Map()
    startingPolymer = data.split("\n\n")[0].trim()
    pairInsertionRulesLines = data.split("\n\n")[1]
    
    pairInsertionRulesLines.split("\n").filter(l => l.length > 0).map(a => a.trim())
        .forEach(l => pairInsertionRules.set(l.split(" -> ")[0], l.split(" -> ")[1]))

    currPolyMerDupleOccurMap = new Map()
    curStartingDupl = startingPolymer.substring(0,2)
    curEndingDupl = startingPolymer.substring(startingPolymer.length-2, startingPolymer.length)
    
    // create map with occurences of duples in starting polymer
    for(i = 0; i < startingPolymer.length - 1; i++) {
        dupl = startingPolymer.substring(i, i+2)
        if(currPolyMerDupleOccurMap.has(dupl)) {
            currPolyMerDupleOccurMap.set(dupl, currPolyMerDupleOccurMap.get(dupl)+1)
        } else {
            currPolyMerDupleOccurMap.set(dupl, 1)
        }
    }

    for(step = 0; step < 40; step++) {
        curStartingDupl = curStartingDupl.charAt(0) + pairInsertionRules.get(curStartingDupl)
        curEndingDupl = pairInsertionRules.get(curEndingDupl) + curEndingDupl.charAt(1)
        nextPolymerDupleOccurMap = new Map()
        for([curDupl, curDuplOccur] of currPolyMerDupleOccurMap.entries()) {
            newDuple1 = curDupl.charAt(0) + pairInsertionRules.get(curDupl)
            newDuple2 = pairInsertionRules.get(curDupl) + curDupl.charAt(1)
            if(nextPolymerDupleOccurMap.has(newDuple1)) {
                nextPolymerDupleOccurMap.set(newDuple1, nextPolymerDupleOccurMap.get(newDuple1) + curDuplOccur)
            } else {
                nextPolymerDupleOccurMap.set(newDuple1, curDuplOccur)
            }
            if(nextPolymerDupleOccurMap.has(newDuple2)) {
                nextPolymerDupleOccurMap.set(newDuple2, nextPolymerDupleOccurMap.get(newDuple2) + curDuplOccur)
            } else {
                nextPolymerDupleOccurMap.set(newDuple2, curDuplOccur)
            }
        }
        currPolyMerDupleOccurMap = nextPolymerDupleOccurMap
    }

    totalOccurancesMap = new Map()
    for([curDupl, curDuplOccur] of currPolyMerDupleOccurMap) {
        char1 = curDupl.charAt(0)
        char2 = curDupl.charAt(1)
        if(totalOccurancesMap.has(char1)) {
            totalOccurancesMap.set(char1, totalOccurancesMap.get(char1) + curDuplOccur)
        } else {
            totalOccurancesMap.set(char1, curDuplOccur)
        }
        if(totalOccurancesMap.has(char2)) {
            totalOccurancesMap.set(char2, totalOccurancesMap.get(char2) + curDuplOccur)
        } else {
            totalOccurancesMap.set(char2, curDuplOccur)
        }
    }
    // very first character and last character are counted once (all the rest are counted twice)... 
    // therefore +1 for those before deviding by two in the end
    totalOccurancesMap.set(curStartingDupl.charAt(0), totalOccurancesMap.get(curStartingDupl.charAt(0))+1)
    totalOccurancesMap.set(curEndingDupl.charAt(1), totalOccurancesMap.get(curEndingDupl.charAt(1))+1)


    maxOccur = Array.from(totalOccurancesMap.values()).reduce((a,b) => Math.max(a,b))
    minOccur = Array.from(totalOccurancesMap.values()).reduce((a,b) => Math.min(a,b))
    console.log(maxOccur/2 - minOccur/2)

})