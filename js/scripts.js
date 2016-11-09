var x = 0;
var y = 0;
var counter = 0;
var dy = 2;
var cells = [];
var fixedCoordinates = [];
var fixedTetrominos = [];
var shapeWidth = 150;
var shapeHeight = 100;
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var rotatePressed = false;
var iShape = [[4,1],[5,1],[6,1],[7,1]]
var lShape = [[5,1],[6,1],[5,2],[7,1]]
var jShape = [[5,1],[6,1],[7,1],[7,2]]
var sShape = [[5,2],[6,2],[6,1],[7,1]]
var oShape = [[5,1],[5,2],[6,1],[6,2]]
var zShape = [[5,1],[6,1],[6,2],[7,2]]
var tShape = [[5,1],[6,2],[6,1],[7,1]]
var tetrominos = [iShape,lShape,jShape,sShape,oShape,zShape,tShape];
var random = getRandomInt(0,6);
var pick = tetrominos[random];
var tetromino;



function Board (cells) {
  this.cells = cells;
};

function Cell (xCoordinate, yCoordinate, status) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.status = false;
};

function Tetromino (cellArray, rightSide, leftSide, color) {
  this.cellArray = cellArray;
  this.rightSide = rightSide;
  this.leftSide = leftSide;
  this.xCoordinate;
  this.yCoordinate;
  this.height;
  this.color = color;
};

Tetromino.prototype.translate = function() {
  var row1 = [0,0,0,0]
  var row2 = [0,0,0,0]
  var row3 = [0,0,0,0]
  var row4 = [0,0,0,0]
  var grid = [row1,row2,row3,row4]
  for (i=0;i<4;i++) {
    var xIndex = this.cellArray[i][0] -4;
    var yIndex = this.cellArray[i][1];
    grid[yIndex][xIndex] = 1;
  };
  console.log(grid)
  return grid;
};

Tetromino.prototype.rotateLeft  = function(grid) {
  newGrid = [
  [grid[0][3], grid[1][3], grid[2][3], grid[3][3]],
  [grid[0][2], grid[1][2], grid[2][2], grid[3][2]],
  [grid[0][1], grid[1][1], grid[2][1], grid[3][1]],
  [grid[0][0], grid[1][0], grid[2][0], grid[3][0]]
  ];
  console.log(newGrid)
};

Tetromino.prototype.translateBack = function(grid) {
  var count = 0;
  var xValues = [];
  for (var row=0; row<4; row++) {
    for (var column=0; column<4; column++) {
      if (newGrid[row][column] === 1) {
        console.log(row + "," + column);
        this.cellArray[count][0] = 4 + column;
        this.cellArray[count][1] = row;
        xValues.push(this.cellArray[count][0])
        count ++;
      };
    };
  };
  this.rightSide = Math.max(...xValues);
  this.leftSide = Math.min(...xValues);
  console.log(this.cellArray);
};


function newGame() {
  for (var i=1; i<21; i ++) {
    var row = []
    for (var j=1; j<11; j ++) {
      var cell = new Cell (i, j);
      row.push(cell);
    };
    cells.push(row);
  };
  board = new Board (cells);
 };

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

$(document).ready(function() {
  newGame();
  dropRandomTetromino();
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var img = document.getElementById("image");
  var drop = setInterval(draw, 20);

  function drawShape() {
    ctx.beginPath();
    for (i=0;i<4;i++) {
      xCoordinate= x + 50*(tetromino.cellArray[i][0] -1);
      yCoordinate= y + 50*(tetromino.cellArray[i][1] -1);
    ctx.rect(xCoordinate,yCoordinate,50,50);
    ctx.fillStyle = tetromino.color;
    ctx.strokeStyle = "black";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    }
    if(rightPressed && x + 50*tetromino.rightSide < canvas.width && counter % 10 == 0) {
        x += 50;
    } else if(leftPressed && x + 50*(tetromino.leftSide - 1) > 0 && counter % 10 == 0) {
        x -= 50;
      }
    if (downPressed) {
      dy = dy * 4;
    }
    if (rotatePressed && counter % 10 == 0) {
        tetromino.translateBack(tetromino.rotateLeft(tetromino.translate()));
    }
  };

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dy = 2;
    fixShape();
    drawShape();
    tetromino.xCoordinate = x;
    tetromino.yCoordinate = y;
    // tetromino.height =
    y += dy;
    counter += 1;
    for (i=0;i<4;i++) {
      if (y + dy > canvas.height- 50*(tetromino.cellArray[i][1])) {
          clearInterval(drop);
          y = Math.round(y/50)*50;
          tetromino.yCoordinate = y;
          fixedCoordinates.push([tetromino.xCoordinate,tetromino.yCoordinate]);
          fixedTetrominos.push(tetromino);
          // console.log(fixedCoordinates)
          dropRandomTetromino();
          x = 0;
          y = 0;
        }
      }
    };

  function dropRandomTetromino() {
    random = getRandomInt(0,6);
    pick = tetrominos[random];
    if (pick === iShape) {
      var color = "#00f0f0";
    } else if (pick === jShape) {
      var color = "#0000f0";
    } else if (pick === lShape) {
      var color = "#F0A000";
    } else if (pick === oShape) {
      var color = "#F0F000";
    }else if(pick === sShape) {
      var color = "#00F000";
    }else if(pick === tShape) {
      var color = "#A000F0";
    }else if(pick === zShape) {
      var color = "#F00000";
    };
    tetromino = new Tetromino(pick, pick[3][0], pick[0][0], color);
    drop = setInterval(draw, 20);
    console.log(tetromino)
  };

  function fixShape() {
    for (var i = 0; i < fixedCoordinates.length; i ++) {
      for (j=0; j <4; j++) {
      ctx.beginPath();
      ctx.fillStyle = fixedTetrominos[i].color;
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.fillRect(fixedCoordinates[i][0]+ 50*(fixedTetrominos[i].cellArray[j][0] -1),fixedCoordinates[i][1] + 50*(fixedTetrominos[i].cellArray[j][1] -1),50,50);
      ctx.strokeRect(fixedCoordinates[i][0]+ 50*(fixedTetrominos[i].cellArray[j][0] -1),fixedCoordinates[i][1] + 50*(fixedTetrominos[i].cellArray[j][1] -1),50,50);
      ctx.closePath()
      }
    }
  }


  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  function keyDownHandler(e) {
      if(e.keyCode == 39) {
          rightPressed = true;
      }
      else if(e.keyCode == 37) {
          leftPressed = true;
      }
      else if(e.keyCode == 40) {
          downPressed = true;
      }
      else if(e.keyCode == 32) {
          rotatePressed = true;
          console.log(rotatePressed);
      }
  }

  function keyUpHandler(e) {
      if(e.keyCode == 39) {
          rightPressed = false;
      }
      else if(e.keyCode == 37) {
          leftPressed = false;
      }
      else if(e.keyCode == 40) {
          downPressed = false;
      }
      else if(e.keyCode == 32) {
          rotatePressed = false;
          console.log(rotatePressed);
      }
       };
});
