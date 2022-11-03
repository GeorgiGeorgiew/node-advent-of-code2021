const fs = require('fs');

openSymbolsScore = new Map()
openSymbolsScore.set('(', 1)
openSymbolsScore.set('[', 2)
openSymbolsScore.set('{', 3)
openSymbolsScore.set('<', 4)

closeToOpenMapping = new Map()
closeToOpenMapping.set(")", "(")
closeToOpenMapping.set(">", "<")
closeToOpenMapping.set("}", "{")
closeToOpenMapping.set("]", "[")

fs.readFile('./input', 'utf8' , (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    lines = data.split("\n").filter(l => l.trim().length > 0)
    scores = []
    for(line of lines) {
        // Go through every sign -> if it is opening push on stack
        // if it is closing and matches top opening -> pop top opening
        // if it is closing and not matches top opening: break and dont score
        // if line is finished score remaining 
        stack = []
        for(col = 0; col < line.length; col++) {
            curSymbol = line.charAt(col)
            if(closeToOpenMapping.has(curSymbol)) {
                if(stack.slice(-1) == closeToOpenMapping.get(curSymbol)) {
                    stack.pop()
                } else {
                    stack = []
                    break
                } 
            } else {
                stack.push(curSymbol)
            }
        }
        if(stack.length > 0) scores[scores.length] = scoreStack(stack, 0)
    }
    solution = scores.sort((a,b) => a - b )[Math.floor(scores.length / 2)]
    console.log(solution)
})

function scoreStack(stack, curScore) {
    if(stack.length == 0) return curScore;
    symbol = stack.pop()
    return scoreStack(stack, curScore*5 + openSymbolsScore.get(symbol))
}