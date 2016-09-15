var c = document.getElementById("backgroundCanvas");
var ctx = c.getContext("2d");

// define a basic vector class
function Vector(x,y) {
    var self = this;
    self.x = x;
    self.y = y;
    self.tx = x;
    self.ty = y;
    self.update = function() {
      self.x += (self.tx - self.x) / 10;
      self.y += (self.ty - self.y) / 10;
    }
    self.setTargetVector = function(v) {
      self.tx = v.x;
      self.ty = v.y;
    }
    self.setTarget = function(targetX, targetY) {
      self.tx = targetX;
      self.ty = targetY;
    }
    self.getLength = function() {
      return Math.sqrt(self.x * self.x + self.y * self.y);
    }
    self.setLength = function(length){
      var l = self.getLength();
      self.x = (self.x / l) * length;
      self.y = (self.y / l) * length;
    }
    self.add = function(v) {
      return new Vector(self.x+v.x,self.y+v.y);
    }
    self.sub = function(v) {
      return new Vector(self.x-v.x,self.y-v.y);
    }
    self.getRotated = function(angle){
      return new Vector(  (Math.cos(angle) * self.x) - (Math.sin(angle) * self.y),
                          (Math.sin(angle) * self.x) + (Math.cos(angle) * self.y));
    }
}

// create the vectors
var p_topLeft;
var p_topLeft_movable;
var p_topRight;
var p_topRight_movable;
var p_bottomRight;
var p_bottomRight_movable;
var p_bottomLeft;
var p_bottomLeft_movable;
var p_middle;
var p_middleTop;
var p_middleBottom;

var middleOffset;
var mouseDistanceFromCenter;

var p_mouse;

var gradient1;
var gradient2;
var gradient3;
var gradient4;

$( document ).ready(function() {
  // make the canvas scale to window size
  c.width  = window.innerWidth;
  c.height = window.innerHeight;

  if(document.getElementsByClassName("speakers-container").length ){
    var speakercontainer = document.getElementsByClassName("speakers-container")[0];
    var height = speakercontainer.clientHeight + speakercontainer.offsetTop + 50;

    if(c.height < height) c.height = height;
  }

  // initialize all points
  p_topLeft = new Vector(0, 0);
  p_topLeft_movable = new Vector(0, 0);
  p_topRight = new Vector(c.width, 0);
  p_topRight_movable = new Vector(c.width, 0);
  p_bottomRight = new Vector(c.width, c.height);
  p_bottomRight_movable = new Vector(c.width, c.height);
  p_bottomLeft = new Vector(0, c.height);
  p_bottomLeft_movable = new Vector(200, c.height);
  p_middle = new Vector(c.width/2, c.height/2);
  p_middleTop = new Vector(c.width/2, c.height/2);
  p_middleBottom = new Vector(c.width/2, c.height/2);

  middleOffset = new Vector(0, 0);
  mouseDistanceFromCenter;

  p_mouse = new Vector(c.width/2, c.height/2);

  // update the gradients
  updateGradients();

  // make the draw function called continiously
  setInterval(draw, 33);
});

function updateGradients(){
  // gradient for left rectangle
  gradient1 = ctx.createLinearGradient(p_middleTop.x, p_middleTop.y, p_bottomRight_movable.x, p_bottomRight_movable.y);
  gradient1.addColorStop(0,"#e162d8");
  gradient1.addColorStop(1,"#0048a7");

  // gradient for top triangle
  gradient2 = ctx.createLinearGradient(c.width/2, 0, p_middleTop.x, p_middleTop.y);
  gradient2.addColorStop(0, "#20d591");
  gradient2.addColorStop(1, "#553ecc");

  // gradient for right rectangle
  gradient3 = ctx.createLinearGradient(p_topLeft_movable.x, p_topLeft_movable.y, p_middleBottom.x, p_middleBottom.y);
  gradient3.addColorStop(0, "#e84242");
  gradient3.addColorStop(1, "#e162d8");

  // gradient for bottom triangle
  gradient4 = ctx.createLinearGradient(p_middleBottom.x, p_middleBottom.y, c.width/2, c.height);
  gradient4.addColorStop(0, "#20d591");
  gradient4.addColorStop(1, "#ffeb1e");

}

// update the mouse position
$("body").mousemove(function(e) {
  p_mouse.x = e.pageX;
  p_mouse.y = e.pageY;

  mouseDistanceFromCenter = Math.sqrt(Math.pow(c.width/2 - p_mouse.x, 2) + Math.pow(c.height/2 - p_mouse.y, 2));
  var maxDistance = Math.sqrt(Math.pow(c.width/2, 2) + Math.pow(c.height/2, 2));

  // var offsetRotated = middleOffset.getRotated((Math.PI/2) * (mouseDistanceFromCenter / maxDistance));
  //
  // // set the length in relation to the distance of canvas center
  // // offsetRotated.setLength(0.2*mouseDistanceFromCenter);
  //
  // p_middle.setTargetVector(p_mouse);
  // p_middleTop.setTargetVector(p_mouse.sub(offsetRotated));
  // p_middleBottom.setTargetVector(p_mouse.add(offsetRotated));


  // p_topLeft.setTarget(
  p_topLeft_movable.setTarget((c.width/2 - p_mouse.x) * 0.8, 0);
  p_bottomLeft_movable.setTarget((c.width/2 - p_mouse.x) * 0.8, c.height);
  p_topRight_movable.setTarget(c.width + ((c.width/2 - p_mouse.x) * 0.8 ), 0);
  p_bottomRight_movable.setTarget(c.width+ ((c.width/2 - p_mouse.x) * 0.8 ), c.height);
});

$(window).resize(function() {
  // make the canvas scale to window size
  c.width  = window.innerWidth;
  c.height = window.innerHeight;

  if(document.getElementsByClassName("speakers-container").length > 0){
    var speakercontainer = document.getElementsByClassName("speakers-container")[0];
    var height = speakercontainer.clientHeight + speakercontainer.offsetTop + 50;

    if(c.height < height) c.height = height;
  }

  // initialize all points
  p_topLeft.setTarget(0, 0);
  p_topLeft_movable.setTarget(0, 0);
  p_topRight.setTarget(c.width, 0);
  p_topRight_movable.setTarget(c.width, 0);
  p_bottomRight.setTarget(c.width, c.height);
  p_bottomRight_movable.setTarget(c.width, c.height);
  p_bottomLeft.setTarget(0, c.height);
  p_bottomLeft_movable.setTarget(200, c.height);
  p_middle.setTarget(c.width/2, c.height/2);
  p_middleTop.setTarget(c.width/2, c.height/2 - 200);
  p_middleBottom.setTarget(c.width/2, c.height/2 + 200);

  middleOffset.setTarget(0, 200);
  mouseDistanceFromCenter;

  p_mouse = new Vector(c.width/2, c.height/2);

  // update the gradients
  updateGradients();
  draw();
});


function draw(){
  // update the positions
  p_middle.update();
  p_middleTop.update();
  p_middleBottom.update();
  p_topLeft_movable.update();
  p_topLeft.update();
  p_bottomLeft_movable.update();
  p_bottomLeft.update();
  p_topRight_movable.update();
  p_topRight.update();
  p_bottomRight_movable.update();
  p_bottomRight.update();


  var time = Date.now() * 0.001;

  var rx = Math.sin( time * 0.4 ) * 0.8;
  // ry = Math.sin( time * 0.3 ) * 0.1,
  // rz = Math.sin( time * 0.1 ) * 1;

  var offsetRotated = middleOffset.getRotated((Math.PI/2) * rx);

  // set the length in relation to the distance of canvas center
  // offsetRotated.setLength(0.2*mouseDistanceFromCenter);

  p_middle.setTarget(c.width - p_mouse.x, c.height - p_mouse.y);
  p_middleTop.setTargetVector(p_middle.sub(offsetRotated));
  p_middleBottom.setTargetVector(p_middle.add(offsetRotated));


  // clear canvas
  ctx.clearRect(0, 0, c.width, c.height);

  // draw left rectangle
  ctx.fillStyle = gradient3;
  ctx.beginPath();
  ctx.moveTo(p_topLeft.x, p_topLeft.y);
  ctx.lineTo(p_topLeft_movable.x, p_topLeft_movable.y);
  ctx.lineTo(p_middleTop.x, p_middleTop.y);
  ctx.lineTo(p_middleBottom.x, p_middleBottom.y);
  ctx.lineTo(p_bottomLeft_movable.x, p_bottomLeft_movable.y);
  ctx.lineTo(p_bottomLeft.x, p_bottomLeft.y);
  ctx.closePath();
  ctx.fill();

  // draw top triangle
  ctx.fillStyle = gradient2;
  ctx.beginPath();
  ctx.moveTo(p_topLeft_movable.x - 2, p_topLeft_movable.y);
  ctx.lineTo(p_topRight_movable.x + 2, p_topRight_movable.y);
  ctx.lineTo(p_middleTop.x, p_middleTop.y + 1);
  ctx.closePath();
  ctx.fill();

  // draw right rectangle
  ctx.fillStyle = gradient1;
  ctx.beginPath();
  ctx.moveTo(p_topRight_movable.x, p_topRight_movable.y);
  ctx.lineTo(p_topRight.x, p_topRight.y);
  ctx.lineTo(p_bottomRight.x, p_bottomRight.y);
  ctx.lineTo(p_bottomRight_movable.x, p_bottomRight_movable.y);
  ctx.lineTo(p_middleBottom.x, p_middleBottom.y);
  ctx.lineTo(p_middleTop.x, p_middleTop.y);
  ctx.closePath();
  ctx.fill();

  // draw bottom triangle
  ctx.fillStyle = gradient4;
  ctx.beginPath();
  ctx.moveTo(p_bottomRight_movable.x , p_bottomRight_movable.y);
  ctx.lineTo(p_bottomLeft_movable.x, p_bottomLeft.y);
  ctx.lineTo(p_middleBottom.x, p_middleBottom.y);
  ctx.closePath();
  ctx.fill();

  updateGradients();
}
