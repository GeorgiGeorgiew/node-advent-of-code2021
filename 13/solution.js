const fs = require('fs');

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    };

    equals(that) {
        return this.x == that.x && this.y == that.y
    }
}

fs.readFile('./input', 'utf8' , (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    pointsData = data.split("\n\n")[0]
    foldsData = data.split("\n\n")[1]

    points = pointsData.split('\n')
        .filter(l => l.length > 0)
        .map(l => new Point(parseInt(l.split(',')[0]), parseInt(l.split(',')[1])))

    folds = foldsData.split('\n').filter(l => l.length > 0).map(str => str.substring(11))

    // Just look at first fold
    isVerticalFold = folds[0].split('=')[0] == "x"
    foldAt = parseInt(folds[0].split('=')[1])

    newPoints = []
    for(point of points) {
        if(isVerticalFold) {
            if(point.x < foldAt) {
                if(newPoints.find(p => p.equals(point)) == undefined ) {
                    newPoints[newPoints.length] = point
                }
            }
            if(point.x > foldAt && point.x <= 2*foldAt) {
                x = 2*foldAt - point.x // mirroring point at vertical lign
                candidateNewPoint = new Point(x , point.y)
                if(newPoints.find(p => p.equals(candidateNewPoint)) == undefined ) {
                    newPoints[newPoints.length] = candidateNewPoint
                }
            }
        } else {
            if(point.y < foldAt) {
                if(newPoints.find(p => p.equals(point)) == undefined ) {
                    newPoints[newPoints.length] = point
                }
            }
            if(point.y > foldAt && point.y <= 2*foldAt) {
                y = 2*foldAt - point.y // mirroring point at horizontal lign
                candidateNewPoint = new Point(point.x , y)
                if(newPoints.find(p => p.equals(candidateNewPoint)) == undefined ) {
                    newPoints[newPoints.length] = candidateNewPoint
                }
            }
        }
    }

    console.log(newPoints)
    console.log(newPoints.length)

})