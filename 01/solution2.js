const fs = require('fs');

fs.readFile('./input', 'utf8' , (err, data) => {

    counter = 0;

    if (err) {
      console.error(err)
      return
    }
    var lines = data.split('\n')
    for(let i = 3; i < lines.length; i++) {
        if(parseInt(lines[i]) > parseInt(lines[i-3])) counter++;
    }
    console.log(counter);
  })