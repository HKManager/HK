;(function() {
  'use strict';
  if (typeof SpaceShooter === 'undefined') {
    window.SpaceShooter = {}
  }

  var MovingObject = SpaceShooter.MovingObject = function(specs){
    this.angle = this.angle || specs.angle;
    this.speed = this.speed || specs.speed;
    this.radius = this.radius || specs.radius;
    this.pos = this.pos || specs.pos;
    this.vel = this.vel || specs.vel;
    this.color = this.color || specs.color;
    this.game = this.game || specs.game;
  };

  MovingObject.prototype.moveByStep = function (step) {
    this.pos = [this.pos[0] + step[0], this.pos[1] + step[1]];
  };
})();
