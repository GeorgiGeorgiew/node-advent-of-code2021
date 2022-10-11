const fs = require('fs');
//const {EOL} = require('os');

fs.readFile('./input', 'utf8' , (err, data) => {

    counter = 0;
    curDepth = -1;

    if (err) {
      console.error(err)
      return
    }
    var lines = data.split("\n")
    for(line in lines) {
        if(curDepth < lines[line]) counter++;
        curDepth = lines[line];
    }
    console.log(counter);
  })