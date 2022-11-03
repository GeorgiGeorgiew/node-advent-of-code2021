const fs = require('fs');
var allNodes = []

class Node {
    constructor(name, type, isBigCave, conNodes) {
        this.name = name
        this.type = type
        this.isBigCave = isBigCave
        this.conNodes = conNodes
    }

    connectNode(otherNode) {
        this.conNodes[this.conNodes.length] = otherNode 
    }
}


fs.readFile('./input', 'utf8' , (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    // 1. parse input
    // create Node object - contains array of other Node objects, info weather big cave or small cave, type: START, END, CAVE 
    startNode = new Node("start", 1, false, new Array(0))
    endNode = new Node("end", 2, false, new Array(0))
    allNodes = [startNode, endNode]
    lines = data.split("\n").filter(l => l.length>0)
    for(line of lines) {
        node1Name = line.split('-')[0]
        node2Name = line.split('-')[1]
        node1 = getOrCreateNode(node1Name)
        node2 = getOrCreateNode(node2Name)
        node1.connectNode(node2)
        node2.connectNode(node1)
    }

    // 2. search algorithm
    // create paths by brute force-> to each connected Node, save paths that are complete, discard paths, that violate condition
    curPaths = [[startNode]]
    completedPaths = []
    while(true) {
        //curPaths = curPaths.map(p => mapPathToNextStepPaths(p)).flatMap(a=>a)
        newCurrentPaths = new Array()
        for(curPath of curPaths) {
            newCurrentPaths = newCurrentPaths.concat(mapPathToNextStepPaths(curPath))
        }
        curPaths = newCurrentPaths
        completedPaths = completedPaths.concat(curPaths.filter(p => p[p.length-1].type == 2))
        curPaths = curPaths.filter(p => !violatesCondition(p))
        curPaths = curPaths.filter(p => p[p.length-1].type != 2)
        if(curPaths.length == 0) {
            break
        }
    }
    console.log(completedPaths.length)
})

function getOrCreateNode(nodeName) {
    node = allNodes.find(n => n.name == nodeName)
    if(node != undefined) return node
    isBigCave = nodeName.charAt(0).toUpperCase() == nodeName.charAt(0)
    node = new Node(nodeName, 0, isBigCave, new Array())
    allNodes[allNodes.length] = node
    return node
}

function mapPathToNextStepPaths(path) {
    lastNodeOfPath = path[path.length-1]
    resultPaths = new Array(0)
    for(conNode of lastNodeOfPath.conNodes) {
        resultPaths[resultPaths.length] = path.concat(conNode)
    }
    return resultPaths
}

function violatesCondition(path) {
    passedSmallCaves = path.filter(n => n.type == 0).filter(n => !n.isBigCave)
    isMaxOneSmallCavePassedTwice = passedSmallCaves.length - [...new Set(passedSmallCaves)].length <= 1 // max one duplicate in passed caves
    isStartOnlyOnceInPath = path.filter(n => n.type == 1).length == 1
    return !isMaxOneSmallCavePassedTwice || !isStartOnlyOnceInPath;
}