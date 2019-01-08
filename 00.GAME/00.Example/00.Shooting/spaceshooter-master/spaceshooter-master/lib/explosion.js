(function() {
  'use strict';
  if (typeof SpaceShooter === 'undefined') {
    window.SpaceShooter = {};
  }

  var Explosion = SpaceShooter.Explosion = function(specs){
    this.width = specs.width;
    this.height = specs.height;
    this.frames = specs.frames;
    this.frameIndex = 0;
    this.tick = 1;
    this.pos = specs.pos;
    this.radius = specs.radius;
    this.ticksPerFrame = specs.ticksPerFrame;
    this.image = new Image();
    this.image.src = specs.src;
    this.isDonePlaying = false;
  }

  Explosion.prototype.draw = function (ctx) {
    if((this.tick % this.ticksPerFrame) === 0){
      this.frameIndex += 1;
      this.tick += 1;
    } else if (this.frameIndex > this.frames) {
      this.isDonePlaying = true;
    } else {
      this.tick += 1;
    }

    ctx.save();
    ctx.drawImage(
      this.image,
      this.frameIndex * this.width, //image x
      this.height*0, // image y
      this.width, // image width
      this.height, //image height,

      this.pos[0]-this.radius/2, //destination x
      this.pos[1]-this.radius/2, //destination y
      this.radius, //destination width
      this.radius //destination height
    );
    ctx.restore();
  };

  Explosion.prototype.move = function () {

  };
})();
