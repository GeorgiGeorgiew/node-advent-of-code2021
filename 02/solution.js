const fs = require('fs');

fs.readFile('./input', 'utf8' , (err, data) => {

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
        } else if (motion == "down") {
            depth += amount;
        } else if (motion == "up") {
            depth -= amount;
        }
    }

    console.log(horizontalPos * depth);
  })