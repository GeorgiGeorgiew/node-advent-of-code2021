const fs = require('fs');
const LINE_LENGTH = 10


fs.readFile('./input', 'utf8' , (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    flashes = 0;
    lines = data.split("\n").filter(l => l.length > 0)
    board = new Array(lines.length)
    for(row = 0; row < lines.length; row++) {
        board[row] = lines[row].trim().split('').map(sym => parseInt(sym))
    }

    for(step = 1; step <= 100; step++) {
        for(row = 0; row < board.length; row++) {
            for(col=0; col < LINE_LENGTH; col++) {
                board[row][col]++;
            }
        }

        for(row = 0; row < board.length; row++) {
            for(col=0; col < LINE_LENGTH; col++) {
                if(board[row][col]>9) {
                    flashOct(board, row, col)
                }
            }
        }    
    }

    console.log(flashes)
})

function flashOct(board, row, col) {
    board[row][col] = 0;
    flashes++
    increaseAndFlashAdjacentIfNotNull(board, row, col)
}

function increaseAndFlashAdjacentIfNotNull(board, row, col) {
    // ALL ADJACENT
    if(row > 0) increaseAndFlashIfNotNull(board, row-1, col)
    if(row+1 < LINE_LENGTH) increaseAndFlashIfNotNull(board, row+1, col)
    if(col > 0) increaseAndFlashIfNotNull(board, row, col-1)
    if(col+1 < LINE_LENGTH) increaseAndFlashIfNotNull(board, row, col+1)

    // INCL DIAGONALLY
    if(row > 0 && col > 0) increaseAndFlashIfNotNull(board, row-1, col-1)
    if(row > 0 && col+1 < LINE_LENGTH) increaseAndFlashIfNotNull(board, row-1, col+1)
    if(row+1 < LINE_LENGTH && col+1 < LINE_LENGTH) increaseAndFlashIfNotNull(board, row+1, col+1)
    if(row+1 < LINE_LENGTH && col > 0) increaseAndFlashIfNotNull(board, row+1, col-1)
}

function increaseAndFlashIfNotNull(board, row, col) {
    if(board[row][col]>0) board[row][col]++
    if(board[row][col]>9) flashOct(board, row, col) 
}