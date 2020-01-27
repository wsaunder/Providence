

genesis = function(){

};
numbers = function(){
  updateResources();
  resetCost();
};
multiply = function(){
  // loop through a players tiles adding a follower in the order of fewest followers then pasture-plains-forests-hills-mountains-desert and reduce food for each until zero.
  //sort players
for (var p in players) {

  var player = players[p]
  var tiles = player.tiles
  //meeples eat food temples eat stone
  for (var m in tiles){
    player.food -= tiles[m].meeples
    player.stone -= tiles[m].temples
  }
  //total temples
  var templeSum = 0
  for (var t in tiles){
    templeSum += tiles[t].temples
  }
    //find pop difference
  var highPops = highPop(tiles)
  var lowPops = lowPop(tiles)
  // find temple difference
  var highTemps = highTemp(tiles)
  var lowTemps = lowTemp(tiles)
  //various tile sorting
  var sorted = tiles.sort((a,b) => a.land.priority - b.land.priority)
  // var sortedPop=tiles.sort((a,b) => a.meeples - b.meeples)
  var sortedPop = sortPop(tiles)
  // got food?
  if (player.food > 0){
    // highPop > lowPop?
     while (highPops != lowPops && player.food > 0){
       if (sortedPop[0].meeples == lowPops ) {
         addPlayerPop(sortedPop[0], player)
         subtractFood(player)
         lowPops = lowPop(sortedPop)
         draw(sortedPop[0])
         // sortedPop = tiles.sort((a,b) => a.meeples - b.meeples)
         sortedPop = sortPop(tiles)
         }
      }
      // not enough food for everybody?
      if (player.food < tiles.length){
        sorted = sorted.slice(0,player.food)
        for (s in sorted){
          addPlayerPop(sorted[s], player)
          subtractFood(player)
          draw(sorted[s])
        }
      }
      else{
        //plenty of food to go around
        while (player.food > 0){
          addPlayerPop(sorted[0], player)
          subtractFood(player)
          draw(sorted[0])
          sorted.push(sorted.shift())
        }
      }
    }
    checkArray = (array) =>{
      for (i in array) {
        console.log(array[i].Id)
      }
    }
    //remove followers if food is negative
  if (player.food < 0){
    remove = removeSort(tiles)
    let i =0
    while (player.food < 0 && i < 10){
      subtractPlayerPop(remove[i], player)

      checkArray(remove)
      draw(remove[i])
      if (remove[0].pops[0].pops == 0){
        console.log("removed " + remove[0].Id)
        remove[0].meeples = 0
        remove[0].player = 0
        remove[0].pops = []
        // player.tiles.find(t => t.Id == remove[0].Id  )
        for( let y = 0; y < players[0].tiles.length; y++){
          if ( players[0].tiles[y].Id === remove[0].Id) {
            players[0].tiles.splice(y, 1);
          }
        }
        draw(remove[0])
        i = -1
        remove = remove.slice(i+2)
        // console.log(remove[i].Id)
      }
      addFood(player)
      console.log("iteration " + i)
      i++
    }
    for (i in player.tiles){
      if(player.tiles.meeples === 0){
        players.tiles.splice(i,1)
      }
    }

  }

  if (player.stone > 0){
    var revSorted = tiles.sort((b,a) => a.land.priority - b.land.priority)
    var sortedTemp = tiles.sort((a,b) => a.temples - b.temple)
    while (highTemps != lowTemps && player.stone > 0){
      if (sortedTemp[0].temples == lowTemps ) {
        addTemp(sortedTemp[0])
        subtractStone(player)
        draw(sortedTemp[0])
        lowTemps = lowTemp(sortedTemp)
        sortedTemp = tiles.sort((a,b) => a.temples - b.temples)
        }
     }
     // not enough food for everybody?
     if (player.stone < tiles.length){
       revSorted = revSorted.slice(0,player.stone)
       for (s in revSorted){
         addTemp(revSorted[s])
         subtractStone(player)
         draw(revSorted[s])
       }
     }
     else{
       //plenty of food to go around
       while (player.stone > 0){
         addTemp(revSorted[0])
         subtractStone(player)
         draw(revSorted[0])
         revSorted.push(revSorted.shift())
       }
     }
  }
}
update()




};
goForth = function(){
  // if tile population > 2 move followers to neighboring tile if home tile pop 2+= neighboring tiles
  //cycle through players, cycle through tiles, check pop of tile, if 3+ check pop of neighbors

  //cycle through players
  for (var p in players){
    //cycle through their tiles
    var p1 = players[p]
    for (var t1 in p1.tiles){
      let moves =[]
      validMoves(p1, p1.tiles[t1], moves)
      let i = 0
      while (moves.length > 0 && i<5){
        i++
        let pops = {player: p1.playerNumber, pops: 1}

        if (findPops(moves[0], p1) != undefined){ //player has pops in tiles
          addPlayerPop(moves[0], p1)
        }else{
          moves[0].pops.push(pops)
          addPop(moves[0])
          if (moves[0].player == 0){
            moves[0].player = p1.playerNumber
          }
        }

        subtractPlayerPop(p1.tiles[t1], p1)
        draw(moves[0])
        draw(p1.tiles[t1])
        moves=[]
        validMoves(p1, p1.tiles[t1] ,moves)

      }
    }
  }

  // followers move from desert up to pasture down
};
holyWar = function(){
  //if pops from 2 different players on same tile each player rolls pop d6 + metal where maxpop=3. Highest wins. If tie, everyone -1 pop, repeat.
  //cycle through tiles ... probably less computation to cycle through players
  for (var p in players){
    var p1 = players[p]
    for (var t in p1.tiles){
      var t1 = p1.tiles[t]
      if (t1.pops.length > 1){


        // how about a new array. I need player, diceroll, pops, metal
        //metal = players.find(o => o.playerNumber === player).metal
        //rollDice(pops) + metal
        //sort array, count roll = array[0].roll
        //if count >1; array.length = count
        //while arr.length>1 reroll count ++; reroll; sort array, count roll = array[0].roll; if count >1; array.length = count
        // population = winner pop - reroll tieCount


        var results = []
        for (var c in t1.pops){
          let roll = {player: t1.pops[c].player, roll: diceRoll(t1.pops[c].pops) + findMetal(t1.pops[c].player), metal: findMetal(t1.pops[c].player), pops: t1.pops[c].pops}
          results.push(roll)
        }
        var winner = 0
        console.log(results)
        results.sort((a,b) => b.roll - a.roll)
        let highRoll = results[0].roll
        let tieCount = 0
        for(var w in results){
          if (results[w].roll == highRoll){
            tieCount ++
          }
        }
        results.length = tieCount
        console.log("results.length " + results.length)
        let ii = 1
        while (results.length > 1 && ii < 10){
          for (var q in results){
            results[q].roll = diceRoll(results[q].pops -ii) + results[q].metal
          }
          results.sort((a,b) => b.roll - a.roll)
          highRoll = results[0].rolls
          tieCount = 0
          for(var w in results){
            if (results[w].roll == highRoll){
              tieCount ++
            }
          }
          results.length = tieCount
          console.log("ii = " + ii)
          ii++
        }

        winner = results[0].player
        let population = t1.pops.find(o => o.player === winner)
        t1.pops=[{player: winner, pops: population.pops}]
        t1.player = winner
        t1.meeples = t1.pops[0].pops
        draw(t1)

      }
    }
  }

  //if pops array.length > 1 roll off
  //figure out how to display result later
  //rearrange ownership
  players.forEach(m => m.metal = 0)
};


findMetal = (player) => {
  m = players.find(o => o.playerNumber === player).metal
  return m
}

findPops = (hex, p) => {
  let obj = hex.pops.find(o => o.player === p.playerNumber)
  return obj
}

addPop = (hex) => {
  hex.meeples += 1
  // hex.pops[0].pops+=1
}
addPlayerPop = (hex, p) => {
  hex.meeples++
  findPops(hex, p).pops++
  // obj.pops++

}
subtractPlayerPop = (hex, p) => {
  hex.meeples--
  findPops(hex, p).pops--
  // obj.pops--
}
subtractPop = (hex) => {
  hex.meeples -= 1
  // hex.pops[0].pops-=1
}
addTemp = (hex) => {
  hex.temples += 1
}
addFood = (p) => {
  p.food += 1
}
subtractFood = (p) => {
  p.food -= 1
}
addStone = (p) => {
  p.stone += 1
}
subtractStone = (p) => {
  p.stone -= 1
}
highPop = (array) => {
  h = 0
  for (i in array){
    if (array[i].meeples > h){
      h = array[i].meeples
    }
  }
return h
}
lowPop = (array) => {
  l = 100
  for (i in array){
    if (array[i].meeples < l){
      l = array[i].meeples
    }
  }
  return l
}
highTemp = (array) => {
  var highTemp = 0
  for (i in array){
    if (array[i].tmeples > highTemp){
      highTemp = array[i].temples
    }
  }
  return highTemp
}
lowTemp = (array) => {
  var lowTemp = 100
  for (i in array){
    if (array[i].temples < lowTemp){
      lowTemp = array[i].temples
    }
  }
  return lowTemp
}

sortPop = (array) => {
  array = array.sort((a,b) => {
    if(a.meeples < b.meeples) return -1
    if(a.meeples > b.meeples) return 1
    if (a.land.priority < b.land.priority) return -1
    if (a.land.priority > b.land.priority) return 1
  })
  return array
}
removeSort = (array) => {
  array = array.sort((a,b) => {
    if(a.meeples < b.meeples) return -1
    if(a.meeples > b.meeples) return 1
    if (a.land.priority < b.land.priority) return 1
    if (a.land.priority > b.land.priority) return -1
  })
  return array
}
validMoves = (p, tile, moves) => {
    //tile with 3 or more pops

    if (findPops(tile, p).pops > 2){
      //cycle through neighboring tiles
      for (var c in tile.neighbors){
        var grid = gridExport()
        var hex = grid.GetHexById(tile.neighbors[c])
        let diff = findPops(tile, p).pops - hex.meeples
        if (diff > 1 && hex.selected == true){

          moves.push(hex)
        }
      }
    }
  moves = sortPop(moves)
  return moves
}

diceRoll = (dice) => {
  var result = 0
  for (d=0; d< dice; d++){
    var result = result + 1 + Math.floor(Math.random() * 6)
  }
  return result
}

reduceMana = () => {
  p.mana -= 1
}
