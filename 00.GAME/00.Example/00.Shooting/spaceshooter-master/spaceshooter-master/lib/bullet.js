;(function() {
  'use strict';
  if (typeof SpaceShooter === 'undefined'){
    window.SpaceShooter = {};
  }

  var Bullet = SpaceShooter.Bullet = function(specs){
    this.radius = Bullet.RADIUS;
    this.vel = Bullet.VEL;
    this.angle = Bullet.ANGLE;
    this.speed = Bullet.SPEED;

    SpaceShooter.MovingObject.call(this, specs);
  };

  SpaceShooter.Util.inherits(Bullet, SpaceShooter.MovingObject);

  Bullet.SKIN = new Image();
  Bullet.SKIN.src = './assets/bullet1.gif';
  Bullet.RADIUS = 12;
  Bullet.VEL = [0, 0];
  Bullet.SPEED = 12;
  Bullet.ANGLE = 0;

  Bullet.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.drawImage(Bullet.SKIN, -Bullet.RADIUS/2, -Bullet.RADIUS/2, Bullet.RADIUS, Bullet.RADIUS);
    ctx.restore();
  };

  Bullet.prototype.move = function () {
    this.pos[1] -= Bullet.SPEED;
  };
})();
