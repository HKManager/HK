;(function() {
  'use strict';
  if (typeof SpaceShooter === 'undefined') {
    window.SpaceShooter = {};
  };

  var Game = SpaceShooter.Game = function(ctx){
    this.ctx = ctx;
    this.playerShip = [];
    this.playerBullets = [];
    this.enemyBullets = [];
    this.enemyShips = [];
    this.explosions = [];

    this.lives = 5;
    this.wave = new SpaceShooter.Wave(this);

    this.addPlayer();
    this.isLivesOver = false;
    this.score = 0;
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 600;
  Game.RESPAWN_TIME = 2000; //Time that the ship will not die after respawn

  Game.prototype.ship = function () {
    return this.playerShip[0];
  };

  // Game.prototype.start = function(){
  // };

  Game.prototype.addPlayer = function(){
    var ship = new SpaceShooter.Ship({color: '#505050', game: this});
    ship.isVulnerable = false;
    this.addObject(ship);
    this.makeVulnerable(this.ship());
  };

  Game.prototype.makeVulnerable = function (ship) {
    setInterval(function(){ship.isVulnerable = true;},SpaceShooter.Game.RESPAWN_TIME);
  };

  Game.prototype.addObject = function (object) {
    if (object instanceof SpaceShooter.Ship) {
      this.playerShip.push(object);
    }else if (object instanceof SpaceShooter.Bullet) {
      this.playerBullets.push(object);
    }else if (object instanceof SpaceShooter.EnemyBullet) {
      this.enemyBullets.push(object);
    }else if (object instanceof SpaceShooter.EnemyShip) {
      this.enemyShips.push(object);
    }else if (object instanceof SpaceShooter.Explosion){
      this.explosions.push(object);
    }
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.explosions, this.playerShip, this.playerBullets, this.enemyShips, this.enemyBullets);
  };

  Game.prototype.draw = function () {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillRect(0,0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = '#000000';
    ctx.globalAlpha = 1;

    this.allObjects().forEach(function(object){
      object.draw(ctx);
    });

    this.drawHeader();
  };

  Game.prototype.step = function () {
    if (this.isGameOver()){
      return;
    }
    this.detectPlayerHit();
    this.allObjects().forEach(function(object){
      object.move();
    });
    this.fireEnemyBullets();
    this.removeOutOfBoundObjects();
    this.updateEnemies();
    this.detectEnemyHits();
    this.enemyKilled();
    this.nextWave();
    this.removePlayedExplosions();
  };

  Game.prototype.fireShipBullets = function () {
    var shipPos = this.ship().pos.slice(0);
    var lBullet = new SpaceShooter.Bullet({pos: [shipPos[0] - SpaceShooter.Ship.BULLET_GAP, shipPos[1]]});
    var rBullet = new SpaceShooter.Bullet({pos: [shipPos[0] + SpaceShooter.Ship.BULLET_GAP, shipPos[1]]});
    this.addObject(lBullet);
    this.addObject(rBullet);
  };

  Game.prototype.removeOutOfBoundObjects = function () {
    this.playerBullets.forEach(function(bullet, idx){
        if(bullet.pos[0] < 0
          || bullet.pos[0] > Game.DIM_X
          || bullet.pos[1] < 0
          || bullet.pos[1] > Game.DIM_Y){
            this.playerBullets.splice(idx, 1);
          }
    }.bind(this));

    this.enemyBullets.forEach(function(bullet, idx){
        if(bullet.pos[0] < 0
          || bullet.pos[0] > Game.DIM_X
          || bullet.pos[1] < 0
          || bullet.pos[1] > Game.DIM_Y){
            this.enemyBullets.splice(idx, 1);
          }
    }.bind(this));
  };

  Game.prototype.detectEnemyHits = function () {
    this.enemyShips.forEach(function(ship){
      this.playerBullets.forEach(function(bullet, bulletIdx){
        if (SpaceShooter.Util.isColliding(ship, bullet)) {
          ship.health -= this.ship().firePower;
          // Have to draw a minor hit here.
          this.drawSmallExplosion(bullet.pos);
          this.score += 0.1;
          this.playerBullets.splice(bulletIdx,1);
          // break;
        }
      }.bind(this));
    }.bind(this));
  };

  Game.prototype.detectPlayerHit = function () {
    if (this.ship().isVulnerable){
      this.enemyBullets.forEach(function(bullet, idx){
        if (SpaceShooter.Util.isColliding(this.ship(),bullet)) {
          this.enemyBullets.splice(idx,1);
          this.drawLargeExplosion(this.ship().pos, this.ship().radius);
          this.lives -= 1;
          this.playerShip = [];
          this.respawn();
        }
      }.bind(this));
    }
  };

  Game.prototype.enemyKilled = function () {
    this.enemyShips.forEach(function(ship, idx){
      if (ship.health <= 0) {
        this.drawLargeExplosion(ship.pos, ship.radius);
        this.enemyShips.splice(idx,1);
        this.score += this.wave.waveCount * 2;
      }
    }.bind(this));
  };

  Game.prototype.updateEnemies = function () {
    var isEnemyPositioned = this.wave.updateEnemies();
    if (isEnemyPositioned) {
      this.wave.nextFormation.call(this.wave);
      isEnemyPositioned = false;
    }
  };

  Game.prototype.respawn = function () {
    if (this.lives > 0) {
      this.addPlayer();
    } else {
      this.isLivesOver = true;
    }
  };

  var currentFrame=0;
  Game.prototype.fireEnemyBullets = function () {
    if (this.wave.waveType === 'boss'){
      this. fireBossBullets();
      return;
    }

    if (currentFrame > SpaceShooter.GameView.FPS/this.wave.fireFreq){
      this.enemyShips.forEach(function(ship, idx){
        this.addObject(ship.fireBullet.call(ship, this.ship(), 13));
      }.bind(this));
      currentFrame = 0;
    }else{
      currentFrame += 1;
    }
  };

  Game.prototype.fireBossBullets = function () {
    var boss = this.enemyShips.slice(0)[0];
    if (boss.health <= this.wave.health){//If enemies health is less than 4, fire seven shots
      if (currentFrame > (SpaceShooter.GameView.FPS/this.wave.fireFreq)/1.5){
        this.enemyShips.forEach(function(ship, idx){
            var bullets = ship.fireSeven.call(ship, this.ship());
            // var bullets = ship.burstFire.call(ship, this.ship());
            for (var i = 0; i < bullets.length; i++) {
              this.addObject(bullets[i]);
            }
        }.bind(this));
        currentFrame = 0;
      }else{
        currentFrame += 1;
      }
    }else{
      var burstPeriod = SpaceShooter.GameView.FPS/this.wave.fireFreq;
      var firePeriod = burstPeriod+(SpaceShooter.GameView.FPS/this.wave.fireFreq*3);
      var pausePeriod = SpaceShooter.GameView.FPS/this.wave.fireFreq*3;
      var totalPeriod = firePeriod + pausePeriod;

      var burstFreq = parseInt(burstPeriod/5);
      var fireFreq = parseInt((SpaceShooter.GameView.FPS/this.wave.fireFreq)/1.5);
      var burstBullets = boss.fireSeven.call(boss, this.ship());

      if (currentFrame <= burstPeriod){
        if (parseInt(currentFrame % burstFreq) === 0){
          //Fire burst rounds.
          // this.addObject(boss.fireBullet.call(boss, this.ship()));
          this.addObject(burstBullets[parseInt(currentFrame/burstFreq)]);
          currentFrame += 1;
        }else{
          currentFrame += 1;
        }
      }else if(currentFrame <= firePeriod){
        if (parseInt(currentFrame % fireFreq) === 0){
          //Fire Triple
           var bullets = boss.fireTriple.call(boss, this.ship());
           for (var i = 0; i < bullets.length; i++) {
             this.addObject(bullets[i]);
           }
          currentFrame += 1;
        }else{
          currentFrame += 1;
        }
      }else if(currentFrame > totalPeriod){
        currentFrame = 0;
      }else{
        currentFrame += 1;
      }
    }
  };

  Game.prototype.nextWave = function () {
    if (this.enemyShips.length === 0) {
      this.wave.currentFormation = 0;
      this.wave.nextWave();
      this.score += this.wave.waveCount * 10;
    }
  };

  Game.prototype.isGameOver = function () {
    return this.isLivesOver;
  };

  Game.prototype.displayScore = function () {
    return parseInt(this.score);
  };

  Game.prototype.drawHeader = function () {
    var ctx = this.ctx;
    ctx.fillStyle = '#FFF';
    ctx.font = "25px ARCADE";
    ctx.textAlign = 'left';
    ctx.fillText("Score: ", SpaceShooter.Game.DIM_X - 150, 25);
    ctx.fillText(this.displayScore(), SpaceShooter.Game.DIM_X - 150 + 70, 25);
    ctx.fillText("Lives: ", 50, 25);
    ctx.fillText(this.lives, 50 + 65, 25);

    ctx.fillStyle = '#000000';
  };

  Game.prototype.drawSmallExplosion = function (pos) {
    this.addObject(new SpaceShooter.Explosion({pos: pos, width: 12, height: 12, frames: 7, radius: 10, ticksPerFrame: 2, src: './assets/smallExplosion.png'}));
  };

  Game.prototype.drawLargeExplosion = function (pos, rad) {
    this.addObject(new SpaceShooter.Explosion({pos: pos, width: 66, height: 66, frames: 10, radius: rad, ticksPerFrame: 2, src: './assets/largeExplosion.png'}));
  };
  Game.prototype.removePlayedExplosions = function () {
    this.explosions.forEach(function(explosion, idx){
      if (explosion.isDonePlaying){
        this.explosions.splice(idx,1);
      }
    }.bind(this));
  };
})();
