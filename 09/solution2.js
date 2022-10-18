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
        if(isLocalMin(row, col, board)) {
          basins[basins.length] = determineBasin(board, [[row, col]])
        }
      }
    }
    console.log(basins.map(a => a.length).sort((a,b)=>b-a).splice(0,3).reduce((a,b)=>a*b, 1))
})

function determineBasin(board, pointsInBasin) {
  newPointsInBasin = pointsInBasin
  .map(p => adjacentPoints(p))
  .flatMap(a => a)
  .filter(a => board[a[0]][a[1]]!=9)
  .reduce((pts, pt) => arrOfDuplesContainsDuple(pts, pt) ? pts : pts.concat([pt]),[...pointsInBasin])

  if(newPointsInBasin.length == pointsInBasin.length) {
    return pointsInBasin;
  }
  return determineBasin(board, newPointsInBasin)
}

function adjacentPoints(p) {
  result = []
  if(p[0]>0) result[result.length] = [p[0]-1, p[1]]
  if(p[1]>0) result[result.length] = [p[0], p[1]-1]
  if(p[0]<99) result[result.length] = [p[0]+1, p[1]]
  if(p[1]<99) result[result.length] = [p[0], p[1]+1]
  return result
}

function equalPoints(p1, p2) {
  return p1[0] == p2[0] && p1[1] == p2[1]
}

function isLocalMin(row, col, board) {
  return (row <= 0 || board[row-1][col] > board[row][col]) &&
          (col <= 0 || board[row][col-1] > board[row][col]) &&
          (row >= board.length-1 || board[row+1][col] > board[row][col]) &&
          (col >= board[row].length-1 || board[row][col+1] > board[row][col])
}

function arrOfDuplesContainsDuple(arr, dup) {
  for (i = 0; i < arr.length; i++) {
      if (arr[i][0] == dup[0] && arr[i][1] == dup[1]) {
          return true;
      }
  }
  return false;
}