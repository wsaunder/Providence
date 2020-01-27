resetCost = () => {
  foodCost = 1
  stoneCost = 1
  metalCost = 1
  addTileCost = 1
  changeTileCost = 1
  moveCost = 1
}
let foodCost = 1
let stoneCost = 1
let metalCost = 1
let addTileCost = 1
let changeTileCost = 1
let moveCost = 1

let sourceTile = null
  // Miracles:
  // add tile + follower, reveal tile buttons, createTile(p)
  addTileMiracle = () => {
    let p = players[pExport()-1]
    let canvas = canvasExport()
    if (p.mana >= addTileCost){
      enable()
      notifyMessage("Select a land and a tile to add")
      canvas.addEventListener("mouseup", createTilePosition)
      p.mana -= addTileCost
      addTileCost +=1
      p.food +=1
      update()
    }
    if(addTileCost >3){
      $(document).ready(()=> {
        $('#addTileMiracle').hide()
      })
    }
  }
  // change tile, reveal tile buttons, stripped down createTile function
changeTileMiracle = () => {
  let p = players[pExport()-1]
  let canvas = canvasExport()
  if (p.mana >= changeTileCost){
    enable()
    notifyMessage("Select a land and a tile to change")
    canvas.addEventListener("click", changeTilePosition)
    p.mana -= changeTileCost
    changeTileCost +=1
    update()
  }
}
  // move any number of followers from 1 tile to adjacent,
  //    new button! click source, input number, click destination
moveFollower = () => {
  notifyMessage("Click the tile you want to move meeples from")
  let canvas = canvasExport()
  canvas.addEventListener("click", getTilePosition)

}
followerSource = (tile) => {
  sourceTile = tile
  notifyMessage("How many followers?")
}
movementCount = () =>{
  quantity = document.getElementById("quantity").value
  let p = players[pExport()-1]
  console.log(sourceTile)
  console.log(findPops(sourceTile, p))
}

  // increase food by 1

  foodMiracle = () => {
    let p = players[pExport()-1]
    if (p.mana >= foodCost)  {
      notifyMessage("You've gained 1 food")
      p.food +=1
      p.mana -= foodCost
      foodCost +=1
      update()
    }
  }
  // increase stone by 1
  stoneMiracle = () => {
    let p = players[pExport()-1]
    if (p.mana >= stoneCost)  {
      notifyMessage("You've gained 1 stone")
      p.stone +=1
      p.mana -= stoneCost
      update()
      stoneCost +=1
    }
  }
  // add +1 to holy war rolls this round (metal+1)
  metalMiracle = () => {
    let p = players[pExport()-1]
    if (p.mana >= metalCost)  {
      notifyMessage("You've gained 1 metal")
      p.metal +=1
      p.mana -= metalCost
      update()
      metalCost +=1
    }
  }
// end Miracles
