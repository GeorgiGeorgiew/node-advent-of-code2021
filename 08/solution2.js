const fs = require('fs');

fs.readFile('./input', 'utf8' , (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    //const DIGIT_LEDS = ["abcefg", "cf", "acdeg", "acdfg", "bcdf", "abdfg", "abdefg", "acf", "abcdefg", "abcdfg"]

    //  aaaa
    // b    c
    // b    c
    //  dddd
    // e    f
    // e    f
    //  gggg

    // Solved by some deductive steps

    lines = data.split("\n").filter(l => l.trim().length>0)
    sum = 0
    for(line of lines) {
        lineSeparated = line.split("|")
        signalPattern = lineSeparated[0].trim().split(" ")
        outputValues = lineSeparated[1].trim().split(" ")


        ledsForDigit = new Array(10)
    
        // I know the numbers 1,4,7,8 through their number of digits (cf, bcdf ,acf, abcdefg)
        ledsForDigit[1] = signalPattern.find(ptrn => ptrn.length==2)
        ledsForDigit[7] = signalPattern.find(ptrn => ptrn.length==3)
        ledsForDigit[4] = signalPattern.find(ptrn => ptrn.length==4)
        ledsForDigit[8] = signalPattern.find(ptrn => ptrn.length==7)
        
        //  6 -> 6 digits and cf not both in this (now also we know which is c, which is f)
        ledsForDigit[6] = signalPattern.filter(ptrn => ptrn.length==6)
        .find(ptrn => ptrn.indexOf(ledsForDigit[1].charAt(0))==-1 || ptrn.indexOf(ledsForDigit[1].charAt(1))==-1)

        // now also we know which is c, which is f
        correctFLed = ledsForDigit[1].split('').find(led => ledsForDigit[6].split('').indexOf(led) != -1)
        correctCLed = ledsForDigit[1].indexOf(correctFLed) == 0 ? ledsForDigit[1].charAt(1) : ledsForDigit[1].charAt(0)   

        //2 -> 5 digits and only c of (cf)
        ledsForDigit[2] = signalPattern.filter(ptrn => ptrn.length==5)
        .filter(ptrn => ptrn.indexOf(correctCLed)!=-1)
        .filter(ptrn => ptrn.indexOf(correctFLed)==-1)[0]
        //5 -> 5 digits and only f of (cf)
        ledsForDigit[5] = signalPattern.filter(ptrn => ptrn.length==5)
        .filter(ptrn => ptrn.indexOf(correctCLed)==-1)
        .filter(ptrn => ptrn.indexOf(correctFLed)!=-1)[0]
        //3 -> 5 digits and both cf of (cf)
        ledsForDigit[3] = signalPattern.filter(ptrn => ptrn.length==5)
        .filter(ptrn => ptrn.indexOf(correctCLed)!=-1)
        .filter(ptrn => ptrn.indexOf(correctFLed)!=-1)[0]
        
        // the one led in 6 and not in 5 is the correct E led
        correctELed = ledsForDigit[6].split('').find(led => ledsForDigit[5].indexOf(led)==-1) 

        // 0 is the one remaining 6 led pattern where original E led is present
        ledsForDigit[0] = signalPattern.filter(ptrn => ptrn.length==6)
        .filter(ptrn => ptrn != ledsForDigit[6]).find(ptrn => ptrn.indexOf(correctELed)!=-1)
        // 9 is remaining 6 led pattern
        ledsForDigit[9] = signalPattern.filter(ptrn => ptrn.length==6)
        .filter(ptrn => ptrn != ledsForDigit[6]).find(ptrn => ptrn != ledsForDigit[0])


        decoded = outputValues.map(oval => decodePtrn(oval, ledsForDigit)).map(a => a.toString())
        decodedNumForLine = parseInt(decoded.join(''))
        sum += decodedNumForLine
    }
    console.log(sum)

})

function isLedDigitPermutation(ptrn1, ptrn2) {
    return ptrn1.length == ptrn2.length && ptrn1.split('').find(elem => ptrn2.indexOf(elem)==-1) == undefined
}

function decodePtrn(ptrn, ledsForDigit) {
    return ledsForDigit.findIndex(led => isLedDigitPermutation(ptrn, led))
}