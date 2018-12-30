;(function() {
  'use strict';
  if (typeof SpaceShooter === 'undefined') {
    window.SpaceShooter = {};
  }

  var GameView = SpaceShooter.GameView = function(ctx){
    this.ctx = ctx;
    this.game = this.game || new SpaceShooter.Game(this.ctx);
    this.keyControls();
    this.blinkCount = 0;
    this.stars = [];
  };

  GameView.FPS = 32;
  GameView.PLAYER_BULLET_FIRE_RATE = 8;
  GameView.STAR_COUNT = 100;

  var frames=0;
  GameView.prototype.keyControls = function () {
    var ship = this.game.ship();
    var inputKeys = key.getPressedKeyCodes(); // returns an array of key codes currently pressed

    if (typeof ship !== 'undefined'){
      ship.moveByInput(inputKeys);
    };
    if (key.isPressed("space") && frames > GameView.FPS/GameView.PLAYER_BULLET_FIRE_RATE){
      this.game.fireShipBullets.apply(this.game);
      frames = 0;
    }else{
      frames += 1;
    }
  };

  GameView.prototype.startIntro = function () {
    clearInterval(this.gameOverTimerId);
    if (this.stars.length < 1){
      this.initializeStarField(GameView.STAR_COUNT);
    }
    this.introTimerId = setInterval(function(){
        this.drawIntro(this.ctx);
      }.bind(this), 1000 / SpaceShooter.GameView.FPS);
  };

  GameView.prototype.startGameOver = function () {
    clearInterval(this.gameTimerId); //Stops drawing game - Ends game.
    this.gameOverTimerId = setInterval(function() {
        this.drawGameOver(this.ctx); //Draws ending screen.
      }.bind(this), 1000 / SpaceShooter.GameView.FPS);
  };

  GameView.prototype.start = function () {
    clearInterval(this.introTimerId);
    this.game = new SpaceShooter.Game(this.ctx);

    this.gameTimerId = setInterval(function(){
        this.checkGameOver();
        this.game.draw(this.ctx);
        this.game.step();
        this.keyControls();
        this.updateStars();
      }.bind(this), 1000 / SpaceShooter.GameView.FPS);
  };

  GameView.prototype.drawIntro = function(ctx) {
    if(key.isPressed('enter')) {
      this.start();
    }

    ctx.clearRect(0, 0, SpaceShooter.Game.DIM_X, SpaceShooter.Game.DIM_Y);

    // Clear Screen
    ctx.fillStyle = '#000000';
    ctx.fillRect(0,0,SpaceShooter.Game.DIM_X, SpaceShooter.Game.DIM_Y);

    // Heading
    ctx.fillStyle = '#FFF';
    ctx.font = "70px ARCADE";
    ctx.textAlign = 'center';
    ctx.fillText("Space Shooter", SpaceShooter.Game.DIM_X / 2, SpaceShooter.Game.DIM_Y / 2 - 100);
    ctx.fillStyle = '#FF0000';
    ctx.font = "70px ARCADE";
    ctx.fillText("Space Shooter", SpaceShooter.Game.DIM_X / 2 + 2, SpaceShooter.Game.DIM_Y / 2 - 98);
    ctx.fillStyle = '#FFF';

    // Blinking Enter Statement
    ctx.font = "35px ARCADE";

    if (this.blinkCount >= GameView.FPS) {
      this.blinkCount = 0;
    }else if (this.blinkCount > GameView.FPS - (GameView.FPS / 3)){
      this.blinkCount += 1;
    }else {
      ctx.fillText("Hit 'ENTER' to Start", SpaceShooter.Game.DIM_X / 2, SpaceShooter.Game.DIM_Y / 2 );
      this.blinkCount += 1;
    }

    ctx.font = "40px ARCADE";
    ctx.fillText("Controls", SpaceShooter.Game.DIM_X / 2, SpaceShooter.Game.DIM_Y / 2 + 100);

    ctx.font = "25px ARCADE";
    ctx.fillText("Move: Arrow keys or w,a,s,d", SpaceShooter.Game.DIM_X / 2, SpaceShooter.Game.DIM_Y / 2 + 140);
    ctx.fillText("Shoot: Spacebar", SpaceShooter.Game.DIM_X / 2, SpaceShooter.Game.DIM_Y / 2 + 170);

    this.updateStars();
  };

  GameView.prototype.drawGameOver = function(ctx) {
    if(key.isPressed('esc')) {
      this.startIntro();
    }

    ctx.clearRect(0, 0, SpaceShooter.Game.DIM_X, SpaceShooter.Game.DIM_Y);

    // Clear Screen
    ctx.fillStyle = '#000000';
    ctx.fillRect(0,0,SpaceShooter.Game.DIM_X, SpaceShooter.Game.DIM_Y);

    // Heading
    ctx.fillStyle = '#FFF';
    ctx.textAlign = 'center';
    ctx.font = "70px ARCADE";

    // Blinking Game Over
    if (this.blinkCount >= GameView.FPS) {
      this.blinkCount = 0;
    }else if (this.blinkCount > GameView.FPS - (GameView.FPS / 3)){
      this.blinkCount += 1;
    }else {
      ctx.fillText("Game Over", SpaceShooter.Game.DIM_X / 2, SpaceShooter.Game.DIM_Y / 2 - 100);
      ctx.fillStyle = '#FF0000';
      ctx.fillText("Game Over", SpaceShooter.Game.DIM_X / 2+2, SpaceShooter.Game.DIM_Y / 2 - 98);
      ctx.fillStyle = '#FFF';

      this.blinkCount += 1;
    }

    ctx.font = "40px ARCADE";
    ctx.fillText("Hit 'esc' to return", SpaceShooter.Game.DIM_X / 2, SpaceShooter.Game.DIM_Y / 2 );


    ctx.font = "30px ARCADE";
    ctx.fillText("Your Score", SpaceShooter.Game.DIM_X / 2, SpaceShooter.Game.DIM_Y / 2 + 100);

    ctx.font = "25px ARCADE";
    ctx.fillText(this.game.displayScore(), SpaceShooter.Game.DIM_X / 2, SpaceShooter.Game.DIM_Y / 2 + 140);
    this.updateStars();
  };

  GameView.prototype.checkGameOver = function () {
    if (this.game.isGameOver()){
      this.startGameOver();
    }
  };

  GameView.prototype.initializeStarField = function (numStars) {
    for (var i = 0; i < numStars; i++) {
      this.stars.push(this.randomStar());
    }
  };

  GameView.prototype.randomStar = function (yPos) {
    var y = yPos || (Math.random() * SpaceShooter.Game.DIM_Y + 1);
    var randomStar = (new SpaceShooter.Star({ctx: this.ctx,
                                              pos: [(Math.random() * SpaceShooter.Game.DIM_X + 1), y],
                                              vel: [0,-1],
                                              speed: (Math.random() + 0.5),
                                              radius: (Math.random()*3 + 1)
                                              }));
    return randomStar;
  };

  GameView.prototype.updateStars = function () {
    this.stars.forEach(function(star,idx){
      star.move();
      star.draw(this.ctx);
      if (star.pos[1] > SpaceShooter.Game.DIM_Y + 10){
        this.stars.splice(idx,1);
      }
    }.bind(this));

    var numStars = GameView.STAR_COUNT - this.stars.length;
    for (var i = 0; i < numStars; i++) {
      this.stars.push(this.randomStar(-20));
    }
  };
})();
