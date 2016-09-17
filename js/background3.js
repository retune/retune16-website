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
var p_top_tl;
var p_top_bl;
var p_top_tm;
var p_top_bm;
var p_top_tr;
var p_top_br;

var p_bottom_tl;
var p_bottom_bl;
var p_bottom_tm;
var p_bottom_bm;
var p_bottom_tr;
var p_bottom_br;

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
  p_top_tl = new Vector(0, 0);
  p_top_bl = new Vector(0, c.height/2);
  p_top_tm = new Vector(c.width/2, 0);
  p_top_bm = new Vector(c.width/2, c.height/2);
  p_top_tr = new Vector(c.width, 0);
  p_top_br = new Vector(c.width, c.height/2);

  p_bottom_bl = new Vector(0, c.height);
  p_bottom_tm = new Vector(c.width/2, c.height/2);
  p_bottom_bm = new Vector(c.width/2, c.height);
  p_bottom_br = new Vector(c.width, c.height);

  p_mouse = new Vector(c.width/2, c.height/2);

  // update the gradients
  updateGradients();

  // make the draw function called continiously
  setInterval(draw, 33);
});

function updateGradients(){
  // gradient for top left rectangle
  gradient1 = ctx.createLinearGradient(p_top_tl.x, p_top_tl.y, p_top_bm.x, p_top_bm.y);
  gradient1.addColorStop(0,"#e162d8");
  gradient1.addColorStop(1,"#0048a7");

  // gradient for top right rect
  gradient2 = ctx.createLinearGradient(p_top_tr.x, p_top_tr.y, p_top_bm.x, p_top_bm.y);
  gradient2.addColorStop(0, "#20d591");
  gradient2.addColorStop(1, "#553ecc");

  // gradient for bottom left rectangle
  gradient3 = ctx.createLinearGradient(p_top_bl.x, p_top_bl.y, p_bottom_tm.x, p_bottom_tm.y);
  gradient3.addColorStop(0, "#e84242");
  gradient3.addColorStop(1, "#e162d8");

  // gradient for bottom right triangle
  gradient4 = ctx.createLinearGradient(p_bottom_br.x, p_bottom_br.y, p_bottom_tm.x, p_bottom_tm.y);
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
  p_top_tm.setTarget((c.width - p_mouse.x), 0);
  p_top_bm.setTarget((c.width - p_mouse.x), c.height - p_mouse.y);
  p_top_bl.setTarget(0, c.height - p_mouse.y);
  p_top_br.setTarget(c.width, c.height - p_mouse.y);
  p_bottom_tm.setTarget(p_mouse.x, c.height - p_mouse.y);
  p_bottom_bm.setTarget(p_mouse.x, c.height);
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
  p_top_tl.setTarget(0, 0);
  p_top_bl.setTarget(0, c.height/2);
  p_top_tm.setTarget(c.width/2, 0);
  p_top_bm.setTarget(c.width/2, c.height/2);
  p_top_tr.setTarget(c.width, 0);
  p_top_br.setTarget(c.width, c.height/2);

  p_bottom_bl.setTarget(0, c.height);
  p_bottom_tm.setTarget(c.width/2, c.height/2);
  p_bottom_bm.setTarget(c.width/2, c.height);
  p_bottom_br.setTarget(c.width, c.height);

  p_mouse = new Vector(c.width/2, c.height/2);

  // update the gradients
  updateGradients();
  draw();
});


function draw(){
  // update the positions
  p_top_tl.update();
  p_top_bl.update();
  p_top_tm.update();
  p_top_bm.update();
  p_top_tr.update();
  p_top_br.update();
  p_bottom_bl.update();
  p_bottom_tm.update();
  p_bottom_bm.update();
  p_bottom_br.update();

  var time = Date.now() * 0.001;

  var rx = Math.sin( time * 0.4 ) * 0.8;
  // ry = Math.sin( time * 0.3 ) * 0.1,
  // rz = Math.sin( time * 0.1 ) * 1;

  // var offsetRotated = middleOffset.getRotated((Math.PI/2) * rx);

  // set the length in relation to the distance of canvas center
  // offsetRotated.setLength(0.2*mouseDistanceFromCenter);

  // clear canvas
  ctx.clearRect(0, 0, c.width, c.height);

  // draw top left rectangle
  ctx.fillStyle = gradient1;
  ctx.beginPath();
  ctx.moveTo(p_top_tl.x, p_top_tl.y);
  ctx.lineTo(p_top_tm.x+1, p_top_tm.y);
  ctx.lineTo(p_top_bm.x+1, p_top_bm.y);
  ctx.lineTo(p_top_bl.x, p_top_bl.y);
  ctx.closePath();
  ctx.fill();

  // draw top right rect
  ctx.fillStyle = gradient2;
  ctx.beginPath();
  ctx.moveTo(p_top_tm.x, p_top_tm.y);
  ctx.lineTo(p_top_tr.x, p_top_tr.y);
  ctx.lineTo(p_top_br.x, p_top_br.y);
  ctx.lineTo(p_top_bm.x, p_top_bm.y);
  ctx.closePath();
  ctx.fill();

  // draw bottom left rectangle
  ctx.fillStyle = gradient3;
  ctx.beginPath();
  ctx.moveTo(p_top_bl.x, p_top_bl.y);
  ctx.lineTo(p_bottom_tm.x+1, p_bottom_tm.y);
  ctx.lineTo(p_bottom_bm.x+1, p_bottom_bm.y);
  ctx.lineTo(p_bottom_bl.x, p_bottom_bl.y);
  ctx.closePath();
  ctx.fill();

  // draw bottom right rectangle
  ctx.fillStyle = gradient4;
  ctx.beginPath();
  ctx.moveTo(p_bottom_tm.x, p_bottom_tm.y);
  ctx.lineTo(p_top_br.x, p_top_br.y);
  ctx.lineTo(p_bottom_br.x, p_bottom_br.y);
  ctx.lineTo(p_bottom_bm.x, p_bottom_bm.y);
  ctx.closePath();
  ctx.fill();

  updateGradients();
}
