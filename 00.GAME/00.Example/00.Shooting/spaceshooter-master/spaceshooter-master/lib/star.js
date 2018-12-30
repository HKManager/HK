;(function() {
  'use strict';

  if (typeof SpaceShooter === 'undefined'){
    window.SpaceShooter = {};
  }

  var Star = SpaceShooter.Star = function(specs){
    this.ctx = specs.ctx;
    this.pos = specs.pos;
    this.vel = specs.vel;
    this.speed = specs.speed;
    this.radius = specs.radius;
  }

  SpaceShooter.Util.inherits(Star, SpaceShooter.MovingObject);

  Star.prototype.draw = function(ctx){
    // ctx.save();
    // ctx.restore();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius/4, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.globalAlpha = 1;
    // ctx.save();
    // ctx.restore();
  }

  Star.prototype.randomize = function(){
    this.speed = (Math.random() * 10 + 1);
    this.vel = [0,1];
    this.radius = (Math.random() * 5 + 1);
  }

  Star.prototype.move = function () {
    this.pos[1] += this.speed;
  }
})();
