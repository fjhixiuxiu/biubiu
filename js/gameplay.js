/**
 * Game play file.
 */

//Gameboard initialize
var gameboard = document.getElementById("board");
var context = gameboard.getContext("2d");

//array that contains all sprites
var spriteArray = new Array();

//ship initialize
var ship = new Ship(250, 450);

//ship lives initialize
var shiplife = new Array();
//push three lives into the array
shiplife.push(new Ship(5, 480));
shiplife.push(new Ship(35, 480));
shiplife.push(new Ship(65, 480));

//Control setting
var control = new Keycontrol();
document.onkeydown = function(e) {
  control.keydown(e);
}
document.onkeyup = function(e) {
  control.keyup(e);
}

//blink function when ship is hit
function blinks(i){
  setTimeout(function(){
    ship.visible = false;
    setTimeout(function(){
      ship.visible = true;
    }, 100*i);
  }, 100*i);
}

//draw the lives of ship on the left-down corner
function drawLife() {
  for (i in shiplife) {
    shiplife[i].draw();
  }
}

//function when ship lose 1 life
function loseLife(){
  lives -= 1;
  //pop one life from life array
  shiplife.pop();
  //game over when life is 0
  if(lives == 0){
    gameover = true;
    return;
  }
  //safe for a while after hit
  ship.safe = true;
  for(var i = 0;i < 30; i++) {
    blinks(i);
  }
  setTimeout(function(){
    ship.safe = false;
  }, 3200);
}


//Collision setting
var collision = new Collision();

//function when collision detected
function detectcollision() {
  //collisions between ship bullet and sprite bullet
  if (shipBulletAlive && collision.encounter(shipBullet, monsterBullet)) {
    shipBulletAlive = false;
    monsterBulletAlive = false;
    return;
  }

  //collisions between ship and sprite bullet
  if (!ship.safe && monsterBulletAlive && collision.encounter(ship, monsterBullet)) {
    monsterBulletAlive = false;
    loseLife();
  }

  //collisions between ship bullet and sprite
  for (i in spriteArray) {
    if (shipBulletAlive && collision.encounter(shipBullet, spriteArray[i])) {
      shipBulletAlive = false;
      spriteArray.splice(i,1);
      score += 1;
      break;
    }
  }
}

//Update position of monsters
function refreshSprites() {
  for (var i = 0; i < spriteArray.length; i++) {
    spriteArray[i].dance();
    spriteArray[i].draw();
  }
}

//update position of ship
function refreshShip(){
  ship.move();
}

// Draw game window
function drawWindow() {
  //Game info
  context.font = "15pt Calibri";
  context.fillStyle = "#7FFF00";
  context.clearRect(0, 0, gameboard.width, 20);
  context.beginPath();
  context.rect(0, 0, gameboard.width, 20);
  context.closePath();
  context.fillText("Score: " + score, 40, 20);
  context.fillText("Level: " + level, gameboard.width-40, 20);

  //Game board
  context.fillStyle = "black";
  context.clearRect(0, 20, gameboard.width, gameboard.height - 20);
  context.beginPath();
  context.rect(0, 20, gameboard.width, gameboard.height - 20);
  context.closePath();
  context.fill();

}

// To create the sprites for first time when level begins
function createSprites(rows, cols){
  var initx = 50;
  var inity = 50;
  for (var y = 1; y <= rows; y++) {
    for (var x = 1; x <= cols; x++) {
      var posx = initx + (x * 40);
      var posy = inity + (y * 40);
      spriteArray.push(new Sprite(posx, posy));
    }
  }
}

//draw sprites
function drawSprites(){
  createSprites(level*2, 6);
  for( var i=0; i < spriteArray.length; i++){
    spriteArray[i].draw();
  }
}

var shipBullet;

//ship bullet actions
function refreshShipBullet(){
  if(shipFire && !shipBulletAlive){
    shipBullet = new Bullet(ship.x + 13, ship.y, -7, 60, gameboard.height, 'white');
    shipBullet.create();
    shipBulletAlive = true;
  }
  else if(shipBulletAlive){
    shipBullet.update();
  }
  else if (!shipBulletAlive){
    shipBullet = "";
  }
}

var monsterBullet;

//sprite bullet actions
function refreshMonsterBullet(){
  if(!monsterBulletAlive){
    var randomInt;
    randomInt = Math.floor(Math.random() * spriteArray.length);
    if (spriteArray.length != 0) {
      var monster = spriteArray[randomInt];
      monsterBullet = new Bullet(monster.x, monster.y, 4, 60, gameboard.height,'red');
      monsterBulletAlive = true;
    }
  }
  else {
    monsterBullet.update();
  }
}

var timer;
//refresh funtion
function refreshGame() {
  drawWindow();
  refreshShip();
  refreshShipBullet();
  refreshMonsterBullet();
  refreshSprites();
  detectcollision();
  ship.draw();
  drawLife();

  //sprites moving down
  if (movedown) {
    for(var i = 0; i< spriteArray.length; i++){
      spriteArray[i].movedown(10);
      movedown = false;
    }
    //game over when sprites reach the bottom of gameboard
    if(spriteArray[spriteArray.length-1].y > gameboard.height - 20){
      gameover = true;
    }
  }

  //game over screen
  if(gameover){
    context.fillStyle = "black";
    context.clearRect(0, 0, gameboard.width, gameboard.height);
    context.beginPath();
    context.rect(0, 0, gameboard.width, gameboard.height);
    context.closePath();
    context.fill();

    context.font = "40pt Calibri";
    context.textAlign = "center";
    context.fillStyle = "white";
    context.fillText("GAME OVER!", gameboard.width/2, gameboard.height/2);

    context.font = "30pt Calibri";
    context.textAlign = "center";
    context.fillStyle = "white";
    context.fillText("Score: " + score, gameboard.width/2, gameboard.height/2 + 40);

    clearInterval(timer);
  }   

  if(spriteArray.length == 0){
    //win screen
    if(level == 3){
      context.fillStyle = "black";
      context.clearRect(0, 0, gameboard.width, gameboard.height);
      context.beginPath();
      context.rect(0, 0, gameboard.width, gameboard.height);
      context.closePath();
      context.fill();

      context.font = "40pt Calibri";
      context.textAlign = "center";
      context.fillStyle = "yellow";
      context.fillText("YOU WON!", gameboard.width/2, gameboard.height/2);

      context.font = "30pt Calibri";
      context.textAlign = "center";
      context.fillStyle = "yellow";
      context.fillText("Score: " + score, gameboard.width/2, gameboard.height/2 + 40);
    }
    else {
      //level up
      level++;
      drawSprites();
    }
  } 
}

//welcome screen
function welcome() {
  context.fillStyle = "black";
  context.clearRect(0, 0, gameboard.width, gameboard.height);
  context.beginPath();
  context.rect(0, 0, gameboard.width, gameboard.height);
  context.closePath();
  context.fill();

  context.font = "50pt Calibri";
  context.textAlign = "center";
  context.fillStyle = "#FFFF00";
  context.fillText("Space Invaders", gameboard.width/2, gameboard.height/2);

  context.font = "20pt Calibri";
  context.textAlign = "center";
  context.fillStyle = "white";
  context.fillText("Press Enter to start game!", gameboard.width/2, gameboard.height/2 + 50);

  context.font = "15pt Calibri";
  context.textAlign = "center";
  context.fillStyle = "white";
  context.fillText("Control: LEFT/RIGHT", gameboard.width/2, 400);
  context.fillText("Fire: SPACE", gameboard.width/2, 440);

}

//startgame function
function startGame(){
  drawSprites();
  score = 0;
  timer = setInterval(refreshGame, 20);
}

//main entry
welcome();
document.onkeypress = function(e) {
  if (control.enter(e)) {
    startGame();
  }
}
