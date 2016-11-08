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
var i = [[4,1],[5,1],[6,1],[7,1]]
var l = [[5,1],[6,1],[5,2],[7,1]]
var j = [[5,1],[6,1],[7,1],[7,2]]
var s = [[5,2],[6,2],[6,1],[7,1]]
var o = [[5,1],[5,2],[6,1],[6,2]]
var z = [[5,1],[6,1],[6,2],[7,2]]
var t = [[5,1],[6,2],[6,1],[7,1]]
var tetrominos = [i,l,j,s,o,z,t];
var random = getRandomInt(0,6);
var pick = tetrominos[random];
var tetromino = new Tetromino(pick, pick[3][0], pick[0][0]);
console.log(tetromino)



function Board (cells) {
  this.cells = cells;
};

function Cell (xCoordinate, yCoordinate, status) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.status = false;
};

function Tetromino (cellArray, rightSide, leftSide) {
  this.cellArray = cellArray;
  this.rightSide = rightSide;
  this.leftSide = leftSide;
  this.xCoordinate;
  this.yCoordinate;
  this.height;
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
  console.log(board);
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

$(document).ready(function() {
  newGame();
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var img = document.getElementById("image");
  var drop = setInterval(draw, 20);

  function dropRandomTetromino() {
    random = getRandomInt(0,6);
    pick = tetrominos[random];
    tetromino = new Tetromino(pick, pick[3][0], pick[0][0]);
    drop = setInterval(draw, 20);
  }

  function drawShape() {
    ctx.beginPath();
    for (i=0;i<4;i++) {
      xCoordinate= x + 50*(tetromino.cellArray[i][0] -1);
      yCoordinate= y + 50*(tetromino.cellArray[i][1] -1);
    ctx.rect(xCoordinate,yCoordinate,50,50);
    ctx.fillStyle = "#0095DD";
    ctx.strokeStyle = "black";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    }
    if(rightPressed && x + 50*tetromino.rightSide < canvas.width && counter % 4 == 0) {
        x += 50;
    } else if(leftPressed && x + 50*(tetromino.leftSide - 1) > 0 && counter % 4 == 0) {
        x -= 50;
      }
    if (downPressed) {
      dy = dy * 4;
    }
    if (rotatePressed) {
          ctx.rotate(1);
    }
  };

  function fixShape() {
    for (var i = 0; i < fixedCoordinates.length; i ++) {
      for (j=0; j <4; j++) {
      ctx.rect(fixedCoordinates[i][0]+ 50*(fixedTetrominos[i].cellArray[j][0] -1),fixedCoordinates[i][1] + 50*(fixedTetrominos[i].cellArray[j][1] -1),50,50);
      ctx.fillStyle = "#0095DD";
      ctx.strokeStyle = "black";
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dy = 2;
    fixShape();
    drawShape();
    tetromino.xCoordinate = x;
    tetromino.yCoordinate = y;
    tetromino.height =
    y += dy;
    counter += 1;
    for (i=0;i<4;i++) {
      if (y + dy > canvas.height- 50*(tetromino.cellArray[i][1] -1)) {
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
// tetromino= new Tetromino ()

});
