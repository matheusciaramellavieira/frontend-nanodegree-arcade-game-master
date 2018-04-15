//function to set speed
let setSpeed = function (){
  return Math.floor((Math.random() * 280) + 80);
}
//evil bug class
let Enemy = function(y) {
  this.sprite = 'images/enemy-bug.png';
  //basic position start for every bug
  this.x = -80;
  //new bugs new Y position
  this.y = y;
  //when instantiate, create a  initial speed for those little demons
  this.speed = setSpeed();
  //width of the bug png with a margin of discount (see crop in images)
  this.width = 82;
  //height of the bug png with a margin of discount (see crop in images)
  this.height = 56;

};

//update our bloody insects
Enemy.prototype.update = function(dt) {
  //verify if our horn girl still alive
  if (player.x >= (this.x - (this.width/2)) && player.x <= (this.x + (this.width/2))
  &&  player.y >= ( this.y - (this.height)) && player.y <= (this.y + (this.height/2))) {
    player.newGame();
  //keep moving the bugs
  }else if(this.x <= 500){
    this.x += this.speed * dt;
  /*if the evil bug crossed the screen, reset his speed to a new random one,
  and set it to initial bugspot*/
  }else{
    this.speed = setSpeed();
    this.x = -80;
  }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//our player function
let Player = function() {
  // horn girl
  this.sprite = 'images/char-horn-girl.png';
  //initial position
  this.x = 203;
  this.y = 380;
};

//player render
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//everything about moves when it comes to our girl
Player.prototype.update = function() {
  //switch for verify the keyboard key
  switch (this.ctlKey) {
    case 'up':
      this.y -=50;
      break;
    case 'down':
      if(this.y < 380)
        this.y +=50;
      break;
    case 'right':
      if(this.x < 400)
        this.x +=50;
      break;
    case 'left':
      if(this.x > 25)
        this.x -=50;
      break;
    default:
      this.ctlKey = 'still';
  }
  //avoid to let our girl running forever
  this.ctlKey = 'still';
  //verify if our girl... eerr... is wet already .-.
  if(this.y < 20){
    this.newGame();
  }
};

//handle method
Player.prototype.handleInput = function(e) {
  this.ctlKey = e;
};

//move our girl to her initial place
Player.prototype.newGame = function() {
  player.x = 203;
  player.y = 380;
};

//create the hord of bugs
let allEnemies = [new Enemy(40), new Enemy(90), new Enemy(130), new Enemy(180), new Enemy(230)];
//our girl
let player = new Player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
