;(function() {
  'use strict';
  if (typeof SpaceShooter === 'undefined') {
    window.SpaceShooter = {};
  }

  var EnemyShip = SpaceShooter.EnemyShip = function(specs){
    this.radius = specs.radius || EnemyShip.RADIUS;
    this.vel = EnemyShip.VEL;
    this.angle = EnemyShip.ANGLE;
    this.speed = specs.speed || EnemyShip.SPEED;
    this.isWeaponized = false || specs.isWeaponized;
    this.targetPos = specs.targetPos.slice(0);
    this.health = specs.health || 3;
    this.id = specs.id;
    SpaceShooter.MovingObject.call(this, specs);
    this.SKIN = new Image();
    this.SKIN.src = specs.src;
    this.roatationAngle = specs.roatationAngle || 0.5*Math.PI;
    this.roatationAngleIncrement = specs.roatationAngleIncrement || 0;
  };

  EnemyShip.RADIUS = 50;
  EnemyShip.POS = [250, 400];
  EnemyShip.VEL = [0, 0];
  EnemyShip.SPEED = 3;
  EnemyShip.ANGLE = 0;
  EnemyShip.BULLET_GAP = 10;

  SpaceShooter.Util.inherits(EnemyShip, SpaceShooter.MovingObject);

  EnemyShip.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.roatationAngle);
    ctx.drawImage(this.SKIN, -this.radius/2, -this.radius/2, this.radius, this.radius);
    ctx.restore();
  };

  EnemyShip.MOVE_STEP = 8;

  EnemyShip.prototype.move = function () {
    this.xComponent = this.vel[0] * this.speed;
    this.yComponent = this.vel[1] * this.speed;
    this.pos[0] += this.xComponent;
    this.pos[1] += this.yComponent;
    this.roatationAngle += this.roatationAngleIncrement;
  };

  EnemyShip.prototype.fireBullet = function (playerShip, offSet) {
    var bulletVel = SpaceShooter.Util.bulletVel(playerShip.pos.slice(0), this.pos.slice(0), offSet);
    var enemyBullet = new SpaceShooter.EnemyBullet({pos: this.pos.slice(0), vel: bulletVel});
    return enemyBullet;
  };

  EnemyShip.prototype.fireTriple = function (playerShip) {
    var bullets = [];
    for (var i = playerShip.pos.slice(0)[0]-50 ; i <= playerShip.pos.slice(0)[0]+50 ; i += 50) {
      var bulletVel = SpaceShooter.Util.bulletVel([i,SpaceShooter.Game.DIM_Y], this.pos.slice(0));
      var bullet = new SpaceShooter.EnemyBullet({pos: this.pos.slice(0), vel: bulletVel});
      bullets.push(bullet);
    };
    return bullets;
  };

  EnemyShip.prototype.fireSeven = function (playerShip) {
    var bullets = [];
    for (var i = playerShip.pos.slice(0)[0]-450 ; i <= playerShip.pos.slice(0)[0]+450 ; i += 150) {
      var bulletVel = SpaceShooter.Util.bulletVel([i,SpaceShooter.Game.DIM_Y], this.pos.slice(0));
      var bullet = new SpaceShooter.EnemyBullet({pos: this.pos.slice(0), vel: bulletVel});
      bullets.push(bullet);
    };
    return bullets;
  };
})();
