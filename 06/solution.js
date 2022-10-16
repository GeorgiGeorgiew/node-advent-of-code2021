const fs = require('fs');
const LINE_LENGTH = 12

fs.readFile('./input', 'utf8' , (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    allFish = data.split(",").map(a => parseInt(a))
    for(day = 0; day < 80; day++) {
        allFish = allFish.map(oneDayOlder).flatMap(a=>a)
    }
    solution = allFish.length;
    console.log(solution)
})

function oneDayOlder(oneFish) {
    if(oneFish == 0) {
        return [6, 8]
    } else {
        return oneFish - 1
    }
}
