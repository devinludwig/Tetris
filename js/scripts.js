function Board (cells) {
  this.cells = cells;
}

function Cell (xCoordinate, yCoordinate, status) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.status = false;
}

$(document).ready(function() {

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var img = document.getElementById("image");
var x = canvas.width/2;
var y = 0;
var counter = 0;
var dy = 2;
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var rotatePressed = false;

var fixedShapes = [];
var shapeWidth = 150;
var shapeHeight = 100;
var shapePadding = 10;
var shapeOffsetTop = 30;
var shapeOffsetLeft = 30;

// var shapes = [];
// for(c=0; c<shapeColumnCount; c++) {
//     shapes[c] = [];
//     for(r=0; r<shapeRowCount; r++) {
//         shapes[c][r] = { x: 0, y: 0, status: 1 };
//     }
// }

// function collisionDetection() {
//     for(c=0; c<shapeColumnCount; c++) {
//         for(r=0; r<shapeRowCount; r++) {
//             var b = shapes[c][r];
//             if(b.status == 1) {
//                 if(x > b.x && x < b.x+shapeWidth && y > b.y && y < b.y+shapeHeight) {
//                     dy = -dy;
//                     b.status = 0;
//                 }
//             }
//         }
//     }
// }

function Tetromino ( x, y, shape, orientation, color) {
  Tetromino.shape = shape;
  Tetromino.x = x;
  Tetromino.y = y;
  Tetromino.orientation = orientation;
  Tetromino.color = color;
};

// Tetromino.prototype.drawShape() {
// }

function newGame() {
  for (var i=0; i<10; i ++) {
    for (var j=0; j<20; j ++) {
      var cell = new Cell (i, j);
    }
  }
}

function drawShape() {
  ctx.beginPath();
  ctx.drawImage(img,x,y,shapeWidth,shapeHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  if(rightPressed && x < canvas.width - shapeWidth && counter % 4 == 0) {
      x += 50;
  } else if(leftPressed && x > 0 && counter % 4 == 0) {
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
  for (var i = 0; i < fixedShapes.length; i ++) {
    ctx.drawImage(img,fixedShapes[i][0],fixedShapes[i][1],shapeWidth,shapeHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
  }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dy = 2;
    fixShape();
    drawShape();
    // collisionDetection();
    y += dy;
    counter += 1;
    if (y + dy > canvas.height - shapeHeight) {
        clearInterval(drop);
        y = Math.round(y/50)*50;
        fixedShapes.push([x,y]);
        console.log(fixedShapes)
        drop = setInterval(draw, 20);
        x = canvas.width/2;
        y = 0;
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
var drop = setInterval(draw, 20);

});
