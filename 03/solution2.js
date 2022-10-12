const fs = require('fs');
const LINE_LENGTH = 12

fs.readFile('./input', 'utf8' , (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    var lines = data.split("\n").filter(ln => ln.trim().length>0)
    var oxygenRating = findRating(lines, 0, true)
    var co2Rating = findRating(lines, 0, false)

    console.log(parseInt(oxygenRating, 2) * parseInt(co2Rating, 2))
})

function findRating(curCandidates, curCol, continueWithBiggerCandidate) {
    if(curCol >= LINE_LENGTH || curCandidates.length == 1) {
        return curCandidates[0]
    }
    nextCandidateA = []
    nextCandidateB = []
    for(line of curCandidates) {
        if(line.charAt(curCol) == "1") {
            nextCandidateA[nextCandidateA.length] = line;
        } else {
            nextCandidateB[nextCandidateB.length] = line;
        }
    }
    if(continueWithBiggerCandidate ^ nextCandidateA.length >= nextCandidateB.length) { 
            return findRating(nextCandidateB, curCol+1, continueWithBiggerCandidate)
        } else {
            return findRating(nextCandidateA, curCol+1, continueWithBiggerCandidate)
        }
}