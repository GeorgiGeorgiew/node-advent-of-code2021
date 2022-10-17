const fs = require('fs');

fs.readFile('./input', 'utf8' , (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    lines = data.split("\n").filter(l => l.trim().length > 0)
    board = new Array(lines.length)
    for(i = 0; i < board.length; i++) {
      board[i] = lines[i].split('').map(x => parseInt(x))
    }
    sum = 0
    for(row = 0; row < board.length; row++) {
      for(col = 0; col < board[row].length; col++) {
        if(isLocalMin(row, col, board)) {
          sum += board[row][col] + 1
        }
      }
    }

    console.log(sum)

})

function isLocalMin(row, col, board) {
  return (row <= 0 || board[row-1][col] > board[row][col]) &&
          (col <= 0 || board[row][col-1] > board[row][col]) &&
          (row >= board.length-1 || board[row+1][col] > board[row][col]) &&
          (col >= board[row].length-1 || board[row][col+1] > board[row][col])
}