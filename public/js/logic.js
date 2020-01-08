

Genesis = function(){

};
Numbers = function(){
  updateResources();
};
Multiply = function(){
  // loop through a players tiles adding a follower in the order of fewest followers then pasture-plains-forests-hills-mountains-desert and reduce food for each until zero.
  //sort players
for (var p in players) {
  //got food?
  for (var m in players[p].tiles){
    players[p].food -= players[p].tiles[m].meeples
  }
  if (players[p].food > 0){
    //find highest pop
    var highPop = 0
    var sorted = players[p].tiles.sort((a,b) => a.land.priority - b.land.priority)
    while (players[p].food >= players[p].tiles.length){
      for (var t in players[p].tiles){
         var tilePops = [players[p].tiles[t].meeples]
         highPop = Math.max(tilePops)
         lowPop = Math.min(tilePops)
         if (highPop != lowPop){
           var sortedPop = players[p].tiles.sort((a,b) => a.meeples - b.meeples)
           for (var s in sortedPop){
             if (sortedPop[s].meeples < highPop ) {
               difference = highPop-sortedPop[s].meeples
               if (difference > 0){
                 sortedPop[s].meeples += difference
                 players[p].food -= difference
                 draw(sortedPop[s])
               }
             }
           }
         }
        players[p].tiles[t].meeples +=1
        players[p].food -=1
        draw(players[p].tiles[t])
      }
    }

    index = players[p].food
    for (var s =0; s < index; s++){
      sorted[s].meeples +=1
      players[p].food -=1
      draw(sorted[s])
    }
  }

  var templeSum = 0
  for (var t in players[p].tiles){
    templeSum += players[p].tiles[t].temples
  }
  if (players[p].stone>templeSum){
    var highTemple = 0
    var sorted = players[p].tiles.sort((b,a) => a.land.priority - b.land.priority)
    while (players[p].stone >= players[p].tiles.length){
      for (var t in players[p].tiles){
         var tileTemps = [players[p].tiles[t].temples]
         highTemp = Math.max(tileTemps)
         lowTemp = Math.min(tileTemps)
         if (highTemp != lowTemp){
           var sortedTemp = players[p].tiles.sort((a,b) => a.temples - b.temples)
           for (var s in sortedtemp){
             if (sortedTemp[s].temples < highTemp ) {
               difference = highTemp-sortedTemp[s].temples
               if (difference > 0){
                 sortedTemp[s].temples += difference
                 players[p].stone -= difference
                 draw(sortedTemp[s])
               }
             }
           }
         }
        players[p].tiles[t].temples +=1
        players[p].stone -=1
        draw(players[p].tiles[t])
      }
    }

    index = players[p].stone
    for (var s =0; s < index; s++){
      sorted[s].temples +=1
      players[p].stone -=1
      draw(sorted[s])
    }
  }
}
update()
  //remove followers if food is negative

  //add shrines until shrine = stone
  //fewest shrines then desert-mountain-hills-forest-plains-pasture
// window.location =""


};
goForth = function(){
  // if tile population > 2 move followers to neighboring tile if home tile pop 2+= neighboring tiles
  // followers move from desert up to pasture down
};
holyWar = function(){
  //if pops from 2 different players on same tile each player rolls pop d6 + metal where maxpop=3. Highest wins. If tie, everyone -1 pop, repeat.
};
Intervention = function(){
  // Miracles: {add tile + follower,
  // change tile,
  // move any number of followers from 1 tile to adjacent,
  // increase food by 1
  // increase stone by 1
  // add +1 to holy war rolls this round (metal+1)
  // }
  //3 of each, cost increases 1,2,3
};
