var x = 0;
var y = 0;
var counter = 0;
var cells = [];
var fixedCoordinates = [];
var fixedTetrominos = [];
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var rotation;

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
  // console.log(grid)
  return grid;
};

Tetromino.prototype.rotateLeft  = function(grid) {
  newGrid = [
  [grid[0][3], grid[1][3], grid[2][3], grid[3][3]],
  [grid[0][2], grid[1][2], grid[2][2], grid[3][2]],
  [grid[0][1], grid[1][1], grid[2][1], grid[3][1]],
  [grid[0][0], grid[1][0], grid[2][0], grid[3][0]]
  ];
  // console.log(newGrid)
};

Tetromino.prototype.translateBack = function(grid) {
  var count = 0;
  var xValues = [];
  for (var row=0; row<4; row++) {
    for (var column=0; column<4; column++) {
      if (newGrid[row][column] === 1) {
        // console.log(row + "," + column);
        this.cellArray[count][0] = 4 + column;
        this.cellArray[count][1] = row;
        xValues.push(this.cellArray[count][0])
        count ++;
      };
    };
  };
  this.rightSide = Math.max(...xValues);
  this.leftSide = Math.min(...xValues);
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
};

$(document).ready(function() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("image");
    var drop;
    var cellSize;

  $("#start-game").click(function (){
    fixedTetrominos = [];
    fixedCoordinates = [];
    y = 0;
    clearInterval(drop);
    newGame();
    dropRandomTetromino();
  });

  function drawShape() {
    ctx.beginPath();
    if (x + cellSize*(tetromino.leftSide - 1) < 0) {
      x= -1*(cellSize*(tetromino.leftSide - 1));
    } else if (x + cellSize*(tetromino.rightSide) > canvas.width) {
      x= canvas.width - (cellSize*(tetromino.rightSide));
    }
    for (i=0;i<4;i++) {
      xCoordinate= x + cellSize*(tetromino.cellArray[i][0] -1);
      yCoordinate= y + cellSize*(tetromino.cellArray[i][1] -1);
      ctx.rect(xCoordinate,yCoordinate,cellSize,cellSize);
      ctx.fillStyle = tetromino.color;
      ctx.strokeStyle = "black";
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }

    if (rightPressed && x + cellSize*tetromino.rightSide < canvas.width && counter % 20 == 0 && board.cells[Math.floor(yCoordinate/cellSize)][xCoordinate/cellSize + 1].status === false && board.cells[Math.ceil(yCoordinate/cellSize)][xCoordinate/cellSize + 1].status === false) {
      x += cellSize;
    } else if (leftPressed && x + cellSize*(tetromino.leftSide - 1) > 0 && counter % 20 == 0 && board.cells[Math.floor(yCoordinate/cellSize)][xCoordinate/cellSize - 1].status === false && board.cells[Math.ceil(yCoordinate/cellSize)][xCoordinate/cellSize - 1].status === false) {
      x -= cellSize;
    };
    if (downPressed) {
      dy = dy * 5;
    };
  };

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dy = cellSize/70;
    fixShape();
    drawShape();
    tetromino.xCoordinate = x;
    tetromino.yCoordinate = y;
    counter += 1;
    for (i=0;i<4;i++) {
      if (y + dy > canvas.height - cellSize*(tetromino.cellArray[i][1]))
      {
          clearInterval(drop);
          y = Math.round(y/cellSize)*cellSize;
          tetromino.yCoordinate = y;
          for (var index=0; index<4; index++) {
          board.cells[tetromino.cellArray[index][1]+tetromino.yCoordinate/cellSize - 1][tetromino.cellArray[index][0]+tetromino.xCoordinate/cellSize -1].status = true;
          }
          fixedCoordinates.push([tetromino.xCoordinate,tetromino.yCoordinate]);
          fixedTetrominos.push(tetromino);
          dropRandomTetromino();
          x = 0;
          y = 0;
        }
      if (fixedTetrominos.length > 0) {
        for (j=0; j<fixedTetrominos.length; j++) {
          for (k=0; k<4; k++) {
         if (tetromino.cellArray[i][1]*cellSize + tetromino.yCoordinate > fixedTetrominos[j].yCoordinate + (fixedTetrominos[j].cellArray[k][1]-1)*cellSize  && (tetromino.cellArray[i][0]*cellSize + tetromino.xCoordinate === fixedTetrominos[j].xCoordinate + fixedTetrominos[j].cellArray[k][0]*cellSize)) {
           clearInterval(drop);
           y = Math.round(y/cellSize)*cellSize;
           tetromino.yCoordinate = y;
           for (var index=0; index<4; index++) {
           board.cells[tetromino.cellArray[index][1]+tetromino.yCoordinate/cellSize -1][tetromino.cellArray[index][0]+tetromino.xCoordinate/cellSize -1].status = true;
         };
           fixedCoordinates.push([tetromino.xCoordinate,tetromino.yCoordinate]);
           fixedTetrominos.push(tetromino);
           dropRandomTetromino();
           x = 0;
           y = 0;
          }
         }
        }
       }
      }
      y += dy;
    };

    function resizeCanvas() {
        canvas.height = window.innerHeight - window.innerHeight%20;
        canvas.width = canvas.height/2;
        cellSize = canvas.width/10;
        console.log(canvas.height);
        console.log(canvas.width);
    };
    // Register an event listener to call the resizeCanvas() function
    // each time the window is resized.
    window.addEventListener('resize', resizeCanvas, false);
    // Draw canvas border for the first time.

    resizeCanvas(canvas);

    function fixShape() {
      for (var i = 0; i < fixedCoordinates.length; i ++) {
        for (var j=0; j <4; j++) {
          ctx.beginPath();
          ctx.fillStyle = fixedTetrominos[i].color;
          ctx.strokeStyle = "black";
          ctx.stroke();
          ctx.fillRect(fixedCoordinates[i][0]+ cellSize*(fixedTetrominos[i].cellArray[j][0] -1),fixedCoordinates[i][1] + cellSize*(fixedTetrominos[i].cellArray[j][1] -1),cellSize,cellSize);
          ctx.strokeRect(fixedCoordinates[i][0]+ cellSize*(fixedTetrominos[i].cellArray[j][0] -1),fixedCoordinates[i][1] + cellSize*(fixedTetrominos[i].cellArray[j][1] -1),cellSize,cellSize);
          ctx.closePath();
        }
      }
    }

  function dropRandomTetromino() {
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
    drop = setInterval(draw, 5);
    console.log(tetromino)
  };

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  function keyDownHandler(e) {
      if (e.keyCode == 39) {
          rightPressed = true;
      }
      else if(e.keyCode == 37) {
          leftPressed = true;
      }
      else if(e.keyCode == 40) {
          downPressed = true;
      }
      else if(e.keyCode == 32) {
          rotation = setInterval(tetromino.translateBack(tetromino.rotateLeft(tetromino.translate())), 100);
      }
  };

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
          clearInterval(rotation);
      }
   };
});
