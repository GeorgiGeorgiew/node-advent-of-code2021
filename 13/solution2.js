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
    for (fold of folds) {
        newPoints = []
        isVerticalFold = fold.split('=')[0] == "x"
        foldAt = parseInt(fold.split('=')[1])    

        for (point of points) {
            if (isVerticalFold) {
                if (point.x < foldAt) {
                    if (newPoints.find(p => p.equals(point)) == undefined) {
                        newPoints[newPoints.length] = point
                    }
                }
                if (point.x > foldAt && point.x <= 2 * foldAt) {
                    x = 2 * foldAt - point.x // mirroring point at vertical lign
                    candidateNewPoint = new Point(x, point.y)
                    if (newPoints.find(p => p.equals(candidateNewPoint)) == undefined) {
                        newPoints[newPoints.length] = candidateNewPoint
                    }
                }
            } else {
                if (point.y < foldAt) {
                    if (newPoints.find(p => p.equals(point)) == undefined) {
                        newPoints[newPoints.length] = point
                    }
                }
                if (point.y > foldAt && point.y <= 2 * foldAt) {
                    y = 2 * foldAt - point.y // mirroring point at horizontal lign
                    candidateNewPoint = new Point(point.x, y)
                    if (newPoints.find(p => p.equals(candidateNewPoint)) == undefined) {
                        newPoints[newPoints.length] = candidateNewPoint
                    }
                }
            }
        }
        points = newPoints
    }

    console.log(points)
    outputLines = Array(6)
    for(i = 0; i < outputLines.length; i++) {
        outputLines[i] = new String("                                         ")
    }

 
    for(point of points) {
        outputLines[point.y] = outputLines[point.y].substring(0, point.x) + 'X' + outputLines[point.y].substring(point.x+1)
    }

    console.log(outputLines)

})