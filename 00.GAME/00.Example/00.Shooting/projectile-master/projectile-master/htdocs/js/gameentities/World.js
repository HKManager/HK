"use strict";
define([],

function() {

    var World = function(options, context, sprites) {
      this.width = options.width;
      this.height = options.height;
      this.terrainSpeed = options.terrainSpeed;
      this.context = context;
      this.sprites = sprites;

      this.players = [];
      this.enemies = [];
      this.bullets = [];
      this.explosions = [];
      this.tiles = [];
    };

    World.prototype.addPlayer = function(player) {
      this.players.push(player);
    };

    World.prototype.drawImageData = function(imageData, x, y) {
      this.context.putImageData(imageData, x, y);
    };

    World.prototype.drawSprite = function(spriteName, x, y, width, height) {
      if (this.sprites[spriteName]) {
        if (!width) {
          width = this.sprites[spriteName].width;
        }
        if (!height) {
          height = this.sprites[spriteName].height;
        }
        this.context.drawImage(this.sprites[spriteName], x, y, width, height);
      }
    };

    World.prototype.drawImage = function(image, x, y, width, height) {
      this.context.drawImage(image, x, y, width, height);
    };

    World.prototype.drawRectangle = function(color, x, y, width, height) {
      this.context.fillStyle = color;
      this.context.fillRect(x, y, width, height);
    };

    return World;

});
