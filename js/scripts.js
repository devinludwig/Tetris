


$(document).ready(function() {

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = 0;
var dy = 2;
var shapePosition = canvas.width/2;
var rightPressed = false;
var leftPressed = false;

var shapeWidth = 200;
var shapeHeight = 50;
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


function drawShape() {
    ctx.beginPath();
    ctx.rect(shapePosition, y, shapeWidth, shapeHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    if(rightPressed && shapePosition < canvas.width - shapeWidth) {
        shapePosition += 7;
    }
    else if(leftPressed && shapePosition > 0) {
        shapePosition -= 7;
    }
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShape();
    // collisionDetection();
    y += dy;
    if(y + dy > canvas.height - shapeHeight) {
        dy = 0;
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
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
};

setInterval(draw, 10);
});
