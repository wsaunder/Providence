
  var mountain = {
      name: "Mountain",
      food: 1,
      stone: 2,
      metal: 1,
      mana: 0,
      priority:5,
      //player: 0
    }
    var desert = {
      name: "Desert",
      food: 1,
      stone: 0,
      metal: 0,
      mana: 1,
      priority:6,
      //player: 0
    }
    var hills = {
      name: "Hills",
      food: 2,
      stone: 1,
      metal: 1,
      mana: 0,
      priority:4,
      //player: 0
    }
    var plains = {
      name: "Plains",
      food: 3,
      stone: 0,
      metal: 1,
      mana: 0,
      priority:2,
      //player: 0
    }
    var pasture = {
      name: "Pasture",
      food: 4,
      stone: 0,
      metal: 0,
      mana: 0,
      priority:1,
      //player: 0
    }
    var forest = {
      name: "Forest",
      food: 3,
      stone: 1,
      metal: 0,
      mana: 0,
      priority:3,
      //player: 0
    }


    function Player(number) {
      this.playerNumber = number;
      this.food = 0;
      this.stone = 0;
      this.metal = 0;
      this.mana = 0;
      this.tiles = [];
    }

    // function Pops(playerNumber, meeples) {
    //   this.playerNumber = playerNumber;
    //   this.pops = meeples
    // }
    const pops = []


    var landColor = {Mountain: "FireBrick", Pasture: "LawnGreen", Forest: "ForestGreen", Desert: "Peru", Hills: "DarkGoldenrod", Plains: "Wheat"};
    var color = "white";
    var any_selected = false;
    var meeple = 1;
    var temple = 0;
    var land = null;
    var turn = 0;
    var action = true;
    var currentPlayer = 1;
    var totalPlayers = 2;
    var players = [];


    function setColor(choice){
      color = choice.toString();
    }
    function setLand(choice){
      if (choice == 'Mountain'){
        land = mountain;
      } else if (choice == 'Desert') {
        land = desert;
      } else if (choice == 'Hills') {
        land = hills;
      } else if (choice == 'Plains') {
        land = plains;
      } else if (choice == 'Pasture') {
        land = pasture;
      } else if (choice == 'Forest'){
        land = forest;
      } else {
        land = null;}
      if (choice != null) {
        setColor(landColor[choice]);
      }
      document.getElementById('landSelection').innerHTML = choice;
    }

    function addMeeple(number) {
      meeple = number;
    }
    function addTemple(number) {
      temple = number;
    }
    var phases = ['Numbers', 'Intervention', 'Multiply', 'Intervention', 'Go Forth', 'Intervention', 'Holy War'];

    window.addEventListener("load", function() {
      var canvas = document.getElementById("hexCanvas");
      getHexGridWH();
      var grid = new HT.Grid(1000,600);
      var player1 = new Player(1);
      var player2 = new Player(2);
      players.push(player1);
      players.push(player2);


      // function getCursorPosition(canvas, evt) {
      //   const rect = canvas.getBoundingClientRect();
      //   return {
      //     x: evt.clientX - rect.left,
      //     y: evt.clientY - rect.top
      //   };
      // }

      createTilePosition = (e) => {
        const rect = canvas.getBoundingClientRect()
        let p = new HT.Point(e.clientX - rect.left, e.clientY - rect.top)
        createTile(p);
      }
      getTilePosition = (e) => {
        const rect = canvas.getBoundingClientRect()
        let p = new HT.Point(e.clientX - rect.left, e.clientY - rect.top)
        followerSource(grid.GetHexAt(p))
        canvas.removeEventListener("click", getTilePosition)
      }
      changeTilePosition = (e) => {
        const rect = canvas.getBoundingClientRect()
        let p1 = new HT.Point(e.clientX - rect.left, e.clientY - rect.top)
        changeTile(p1)
      }

      addTile = () => {
        canvas.addEventListener("mouseup", createTilePosition)
      }
      // checks if any hexes have been clicked yet
      changeTile = (p) => {
        console.log("changetile")
        if(color != "white"){
          grid.GetHexAt(p).land = land;
          console.log(grid.GetHexAt(p))

          draw(grid.GetHexAt(p))
          disable()

        }
        else {
          notifyMessage("Please select a land")
        }
        canvas.removeEventListener("click", changeTilePosition)
      }

      canvas.addEventListener("click", (e) =>{
        const rect = canvas.getBoundingClientRect()
        let p = new HT.Point(e.clientX - rect.left, e.clientY - rect.top)
        console.log(grid.GetHexAt(p))
      })

      createTile = (p) => {
        // pops = new Pops(currentPlayer, meeple)
        if (action == true) {
          if (any_selected == true) {
            if (grid.CheckNeighbors(p) == true && color != "white" && grid.GetHexAt(p).selected == false) {
                grid.GetHexAt(p).player = currentPlayer;
                grid.GetHexAt(p).meeples += meeple;
                grid.GetHexAt(p).temples += temple;
                meeple = 1;
                temple = 0;
                // grid.GetHexAt(p).pops.push(pops)
                grid.GetHexAt(p).pops.push({player: currentPlayer, pops: meeple})
                grid.GetHexAt(p).selected = true;
                grid.GetHexAt(p).land = land;
                grid.GetHexAt(p).draw(canvas.getContext("2d"), color);

                action = false;
                disable();
                players[currentPlayer-1].tiles.push(grid.GetHexAt(p))
                canvas.removeEventListener("mouseup", createTilePosition)
              }
        }  else if (color != "white") {
          any_selected = true;
          grid.GetHexAt(p).player = currentPlayer;
          grid.GetHexAt(p).land = land;
          grid.GetHexAt(p).meeples += meeple;
          // grid.GetHexAt(p).pops.push(pops)
          grid.GetHexAt(p).pops.push({player: currentPlayer, pops: meeple})
          grid.GetHexAt(p).selected = true;
          grid.GetHexAt(p).draw(canvas.getContext("2d"), color);
          players[currentPlayer-1].tiles.push(grid.GetHexAt(p))
          meeple = 1;
          action = false;
          disable();
          canvas.removeEventListener("mouseup", createTilePosition)
        } else {
            notifyMessage("Please select a land")
          }
        }
      }
      notifyMessage = (message) => {
        $(document).ready(()=>{
          $.notify(message, { position: "top center"} )
        })
      }
      draw = function(hex) {
        setLand(hex.land.name)
        hex.draw(canvas.getContext("2d"), color)
      }
      gridExport = function(){
        return grid
      }
      pExport = () => {
        return currentPlayer
      }
      canvasExport = () => {
        return canvas
      }

      addHex = function(name, x, y) {

        var hex = new HT.Hexagon(name, x, y);
        hex.draw(canvas.getContext("2d"), color);
      }
      //function firstClick(selected){
      //  if selected = true {
      //    return true;
      //  } else {
      //    return false;
      //  }
      //};


      nextTurn = function() {
        //updateResources();
        console.log(players[currentPlayer-1].tiles)
        turn += 1;
        if (turn > 7) {
          turn = 1;
        }
        document.getElementById('phase').innerHTML = phases[turn-1]

        action = true;
        enable()
        currentPlayer = 1
        if (turn == 1) {
          numbers();
          resetCost()
        }
        if (turn == 3) {
          multiply();
          resetCost()
        }
        if (turn == 5) {
          goForth();
          resetCost()
        }
        if (turn == 7) {
          holyWar();
          resetCost()
        }
      }

      nextPlayer = function(){
        if (action == false){
          action = true;
          enable();
        }
        currentPlayer += 1;
        if (currentPlayer > totalPlayers) {
          currentPlayer = 1;
        }
        color = "white";
        setLand(null);
        document.getElementById('player#').innerHTML = currentPlayer;
      }
      disable = function() {
        $(document).ready(function(){
          $('.actionButton').hide();
          })
          land = null
          color= "white"
          document.getElementById('landSelection').innerHTML = ""
      }
      enable = function() {
        $(document).ready(function(){
          $('.actionButton').show();
          })
        action = true
      }

      updateResources = function(){
          for (var n in grid.Hexes) {
            if (grid.Hexes[n].land) {
              for (var p in players) {
                // players[p].tiles = 0;
                if (grid.Hexes[n].player == players[p].playerNumber) {
                  //players[p].tiles = 0;
                  //players[p].tiles += 1;
                  players[p].food += grid.Hexes[n].land.food;
                  players[p].stone += grid.Hexes[n].land.stone;
                  players[p].metal += grid.Hexes[n].land.metal;
                  players[p].mana += grid.Hexes[n].land.mana + grid.Hexes[n].temples;
                }
              }
            }
          }

        update()
       }
       update = () =>{
         $(document).ready(()=> {
           $("#food1").text(player1.food)
           $("#stone1").text(player1.stone)
           $("#metal1").text(player1.metal)
           $("#mana1").text(player1.mana)

           $("#food2").text(player2.food)
           $("#stone2").text(player2.stone)
           $("#metal2").text(player2.metal)
           $("#mana2").text(player2.mana)

           $('#addTile').text(addTileCost)
           $('#changeTile').text(changeTileCost)
           $('#move').text(moveCost)
           $('#addFood').text(foodCost)
           $('#addStone').text(stoneCost)
           $('#addMetal').text(metalCost)

         })

         // document.getElementById("food1").innerHTML = player1.food;
         // document.getElementById("stone1").innerHTML = player1.stone;
         // document.getElementById("metal1").innerHTML = player1.metal;
         // document.getElementById("mana1").innerHTML = player1.mana;
         //
         // document.getElementById("food2").innerHTML = player2.food;
         // document.getElementById("stone2").innerHTML = player2.stone;
         // document.getElementById("metal2").innerHTML = player2.metal;
         // document.getElementById("mana2").innerHTML = player2.mana;


       }
  })
  setTimeout(()=> {
    update()
  }
  , 3000)
