const fs = require('fs');

fs.readFile('./input', 'utf8' , (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    basins = []
    lines = data.split("\n").filter(l => l.trim().length > 0)
    board = new Array(lines.length)
    for(i = 0; i < board.length; i++) {
      board[i] = lines[i].trim().split('').map(x => parseInt(x))
    }
    for(row = 0; row < board.length; row++) {
      for(col = 0; col < board[row].length; col++) {
        if(board[row][col]!=9) {
          basin = getAdjacentBasin(basins, row, col) || new Array(0)
          if(row < 2 ) {
            console.log("row: " + row + " col: " + col)
            console.log(basin)
          }
          if(basin.length == 0) basins[basins.length] = basin
          basin[basin.length] = [row, col]
        }
      }
    }

    solution = basins.map(b => b.length).sort((a,b) => b - a).slice(0, 3).reduce((a,b) => a*b, 1)
//    console.log(basins.sort((a,b) => a.length - b.length))
//    console.log(basins.map(b => b.length).sort((a,b) => b - a).slice(0, 3))
    console.log(solution)
})

function getAdjacentBasin(basins, row, col) {
  return basins.find(b => isAdjacentBasin(b, row, col))
}

function isAdjacentBasin(basin, row, col) {
  return basin.find(elemOfBasin => (elemOfBasin[0]==row && Math.abs(elemOfBasin[1]-col)==1) || (elemOfBasin[1]==col && Math.abs(elemOfBasin[0]-row)==1))
}