const fs = require('fs');

fs.readFile('./input', 'utf8' , (err, data) => {

    var aim = 0;
    var horizontalPos = 0;
    var depth = 0;

    if (err) {
      console.error(err)
      return
    }
    var lines = data.split("\n")
    for(line in lines) {
        var motion = lines[line].split(" ")[0]
        var amount = parseInt(lines[line].split(" ")[1])
        if(motion == "forward") {
            horizontalPos += amount;
            depth += aim * amount;
        } else if (motion == "down") {
            aim += amount;
        } else if (motion == "up") {
            aim -= amount;
        }
    }
    console.log(horizontalPos * depth);
  })