/**
 * Game settings
 */

//Gameboard initialize
var gameboard = document.getElementById("board");
var context = gameboard.getContext("2d");

//Multiple variables
var monsterAction = "left";
var shipLeft = false;
var shipRight = false;
var shipFire = false;
var shipBulletAlive = false;
var monsterBulletAlive = false;
var level = 1;
var lives = 3;
var score = 0;
var gameover = false;
var movedown = false;

//Ship object
function Ship(startx, starty) {
  
  this.image = new Image();
  //image source
  this.image.src = "images/ship.png";
  //ship width
  this.width = 26;
  //ship height
  this.height = 16;
  //ship visibility
  this.visible= true;
  //ship safety
  this.safe = false;
  //ship moving action
  this.action = "";
  
  //start coordinate
  this.x = startx;
  this.y = starty;
  
  //move to coordinate
  this.moveto = function(posx, posy) {
    if ((posx > 0) && (posx < gameboard.width - this.width)) {
      this.x = posx;
      this.y = posy;
    }
  }

  //draw the ship
  this.draw = function() {
    if(this.visible){
      context.drawImage(this.image, this.x, this.y);
    }
  }

  //move by key control
  this.move = function() {
    if(shipLeft && ship.visible){
      this.moveleft(5);
      this.draw();
    }
    else if(shipRight && ship.visible){
      this.moveright(5);
      this.draw();
    }
    else {
      if(ship.visible){
        this.draw();
      }
    }
  }

  //move left
  this.moveleft = function(num) {
    this.moveto(this.x - num, this.y);
  }

  //move right
  this.moveright = function(num) {
    this.moveto(this.x + num, this.y);
  }

  //x-coordinate
  this.posx = function() {
    return this.x;
  }

  //y-coordinate
  this.posy = function() {
    return this.y;
  }
}

//Bullet object
function Bullet(startx, starty, speedY, minY, maxY, color) {
  this.width = 2;
  this.height = 8;
  this.speedY = speedY;
  this.minY = minY;
  this.maxY = maxY;
  this.visible = true;

  this.x = startx;
  this.y = starty;

  //bullet initialize
  this.create = function(){
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = color;
    context.fill();
  }

  //update the movement of bullet
  this.update = function(){
    if(this.y >= this.minY && this.y <= this.maxY){
      this.y = this.y + this.speedY;
      context.beginPath();
      context.rect(this.x, this.y, this.width, this.height);
      context.fillStyle = color;
      context.fill();
    }
    else if (this.y > this.maxY) {
      monsterBulletAlive = false;
    }
    else if (this.y < this.minY) {
      shipBulletAlive = false;
    }
  }

  this.posx = function() {
    return this.x;
  }

  this.posy = function() {
    return this.y;
  }
}

function Sprite(startx, starty) {

  this.image = new Image();
  this.image.src = "images/sprite.png";
  this.width = 22;
  this.height = 16;
  this.visible = true;
  this.maxY = gameboard.width
  
  this.x = startx;
  this.y = starty;
  
  this.moveto = function(posx, posy) {
    if ((posx > 0) && (posx < gameboard.width)) {
      this.x = posx;
      this.y = posy;
    }
  }

  this.draw = function() {
    context.drawImage(this.image, this.x, this.y);
  }

  this.moveleft = function(num) {
    this.moveto(this.x - num, this.y);
  }

  this.moveright = function(num) {
    this.moveto(this.x + num, this.y);
  }

  //Sprites move down function
  this.movedown = function(num) {
    this.moveto(this.x, this.y + num);
  }

  //Sprites animation
  this.dance = function() {
    if (monsterAction == "left" && this.x <= 10) {
      monsterAction = "right";
      movedown = true;
    } 
    else if (monsterAction == "right" && this.x >= gameboard.width - 26) {
      monsterAction = "left";
      this.moveright(1);
      movedown = true;
      return monsterAction;
    }
    if (monsterAction == "left"){
      this.moveleft(1);
    }
    else if (monsterAction == "right") {
      this.moveright(1);
    }
    return monsterAction;
  }

  this.posx = function() {
    return this.x;
  }

  this.posy = function() {
    return this.y;
  }
}
