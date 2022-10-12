const fs = require('fs');
const LINE_LENGTH = 12

fs.readFile('./input', 'utf8' , (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    var boards = []
    var inputs = data.split("\n\n")
    var draftNums = inputs[0].split(",").map(a => parseInt(a))
    for(i = 1; i < inputs.length; i++) {
        boards[boards.length] = inputs[i].split("\n").map(row => row.split(" ").filter(e => e!="").map(e => parseInt(e)))
    }

    for (draftNum of draftNums) {
        boards = boards.map(brd => crossOffOnBoard(brd, draftNum))
        var solutionBoard = boards.find(brd => horizontalMatch(brd) || verticalMatch(brd))
        if(solutionBoard != undefined) {
            sumOfUnmarkedNumbers = solutionBoard.flatMap(num => num).filter(e => e!=-1).reduce((a, b) => a + b, 0);
            solution = sumOfUnmarkedNumbers * draftNum;
            console.log("Solution: " + solution)
            return
        }
    }

})

function crossOffOnBoard(board, draftNum) {
    return board.map(rw => crossOffInRow(rw, draftNum))
}

function crossOffInRow(row, boardNum) {
    return row.map(el => {return el==draftNum ? -1 : el})
}

function horizontalMatch(board) {
    return board.find(rw => rw.reduce((a, b) => a + b, 0)==-5)
}

function verticalMatch(board) {
    const arrayColumn = (arr, n) => arr.map(x => x[n]);
    return [0,1,2,3,4].map(col => arrayColumn(board, col)).find(colVec => colVec.reduce((a, b) => a + b, 0)==-5)
}