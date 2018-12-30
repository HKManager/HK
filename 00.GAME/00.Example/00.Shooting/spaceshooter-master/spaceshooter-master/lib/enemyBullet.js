;(function() {
  'use strict';
  if (typeof SpaceShooter === 'undefined'){
    window.SpaceShooter = {};
  }

  var EnemyBullet = SpaceShooter.EnemyBullet = function(specs){
    this.radius = EnemyBullet.RADIUS;
    this.vel = specs.vel;
    this.angle = specs.angle;
    this.speed = EnemyBullet.SPEED;

    SpaceShooter.MovingObject.call(this, specs);
    // this.xComponent = parseInt(Math.sin(this.angle) * this.speed);
    // this.yComponent = parseInt(Math.cos(this.angle) * this.speed);
    this.xComponent = this.vel[0] * this.speed;
    this.yComponent = this.vel[1] * this.speed;
  };

  SpaceShooter.Util.inherits(EnemyBullet, SpaceShooter.MovingObject);

  EnemyBullet.SKIN = new Image();
  EnemyBullet.SKIN.src = './assets/bullet2.png';
  EnemyBullet.RADIUS = 8;
  EnemyBullet.VEL = [0, 0];
  EnemyBullet.SPEED = 8;
  EnemyBullet.ANGLE = 0;

  EnemyBullet.prototype.draw = function (ctx) {
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius/2, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.globalAlpha = 1;
  };

  EnemyBullet.prototype.move = function () {
    this.pos[0] += this.xComponent;
    this.pos[1] += this.yComponent;
    this.angle = Math.atan2(this.yComponent, this.xComponent);
  };
})();
