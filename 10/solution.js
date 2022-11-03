const fs = require('fs');

fs.readFile('./input', 'utf8' , (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    syntaxErrorScore = 0

    closeToOpenMapping = new Map()
    closeToOpenMapping.set(")", "(")
    closeToOpenMapping.set(">", "<")
    closeToOpenMapping.set("}", "{")
    closeToOpenMapping.set("]", "[")

    illegalClosingSymbols = new Map()
    illegalClosingSymbols.set(')', 3)
    illegalClosingSymbols.set(']', 57)
    illegalClosingSymbols.set('}', 1197)
    illegalClosingSymbols.set('>', 25137)
    
    lines = data.split("\n").filter(l => l.trim().length > 0)
    for(line of lines) {
        // Go through every sign -> if it is opening push on stack
        // if it is closing and matches top opening -> pop top opening
        // if it is closing and not matches top opening: break and 
        stack = []
        for(col = 0; col < line.length; col++) {
            curSymbol = line.charAt(col)
            if(closeToOpenMapping.has(curSymbol)) {
                if(stack.slice(-1) == closeToOpenMapping.get(curSymbol)) {
                    stack.pop()
                } else {
                    syntaxErrorScore += illegalClosingSymbols.get(curSymbol)
                    break
                } 
            } else {
                stack.push(curSymbol)
            }
        }
    }
    console.log(syntaxErrorScore)
})
