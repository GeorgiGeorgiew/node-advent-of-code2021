const fs = require('fs');
const LINE_LENGTH = 12

fs.readFile('./05/input', 'utf8' , (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    lines = data.split("\n").filter(ln => ln.trim().length > 0)
    board = new Array(1000).fill(null).map(()=>new Array(1000).fill(0));

    for(line of lines) {
        point1 = line.split(" -> ")[0]
        point2 = line.split(" -> ")[1]
        x1 = parseInt(point1.split(",")[0])
        y1 = parseInt(point1.split(",")[1])
        x2 = parseInt(point2.split(",")[0])
        y2 = parseInt(point2.split(",")[1])
        if(x1 == x2) { 
            y = y1;
            do {
                board[x1][y] = board[x1][y] += 1
                y = y + Math.sign(y2-y)
            } while(y!=y2)
            board[x2][y2] +=1
        } else if(y1 == y2) { 
            x = x1;
            do {
                board[x][y1] = board[x][y1] += 1
                x = x + Math.sign(x2-x)
            } while(x!=x2)
            board[x2][y2] +=1
        } else if (Math.abs(y2-y1) == Math.abs(x2-x1)) {
            x = x1;
            y = y1;
            do {
                board[x][y] = board[x][y] += 1
                x = x + Math.sign(x2-x)
                y = y + Math.sign(y2-y)
            } while(x!=x2)
            board[x2][y2] += 1
        }
    }
    solution = board.flatMap(a=>a).filter(el => el > 1).length
    console.log(solution)
})