"use strict";
define(['lib/draw', 'lib/util'],

function(draw, util) {

  var TerrainBuilder = function(options, world, bufferWorldCanvas, Tile) {
    this.options = options;
    this.world = world;
    this.Tile = Tile;

    this.bufferWorld = Object.create(world);
    this.bufferWorld.context = bufferWorldCanvas.getContext('2d');
    this.bufferWorld.tiles = [];
    this.bufferWorld.width = this.options.width;
    this.bufferWorld.height = this.options.height;

    this.options.xOffset = 0;
    this.options.yOffset = 0;
    this.options.columns = this.options.width / this.options.tileWidth;
    this.options.rows = this.options.height / this.options.tileHeight;
  };

  TerrainBuilder.prototype.createTerrain = function() {
    var imageData = createImageData(this.bufferWorld, this.Tile, this.options, draw);
    pushImageDataToWorld(imageData, this.world, this.Tile, 0, -(this.bufferWorld.height - this.world.height), this.bufferWorld.width, this.bufferWorld.height);
  };

  var generateRow = function(terrainBuilder, rowNumber, draw) {
    var options = {
      rows: 1,
      columns: terrainBuilder.options.columns,
      tileWidth: terrainBuilder.options.tileWidth,
      tileHeight: terrainBuilder.options.tileHeight,
      xOffset: 0,
      yOffset: rowNumber * terrainBuilder.options.tileHeight
    };
    createImageData(terrainBuilder.bufferWorld, terrainBuilder.Tile, options, draw);
  };

  var pushImageDataToWorld = function(imageData, world, Tile, x, y, width, height) {
    var tile = new Tile(world, {
      imageData: imageData,
      x: x,
      y: y,
      width: width,
      height: height,
      speed: world.terrainSpeed
    });
    world.tiles.push(tile);
  };

  var createImageData = function(world, Tile, options, draw) {
    var tiles = generateTerrain(world, Tile, options.xOffset, options.yOffset, options.rows, options.columns, options.tileWidth, options.tileHeight);
    tiles.forEach(function(tile) {
      world.tiles.push(tile);
    });

    draw(world);

    var width = util.clamp(options.columns * options.tileWidth, 0, world.width);
    var height = util.clamp(options.rows * options.tileHeight, 0, world.height);
    return world.context.getImageData(0, 0, width, height);
  };

  var generateTerrain = function(world, Tile, xOffset, yOffset, rows, columns, width, height) {
    var tiles = [];
    var sprite = 'mars2';
    for (var i=0; i < rows; i++) {
      for (var j=0; j < columns; j++) {
        if (sprite == 'mars1') {
          sprite = 'mars2';
        } else {
          sprite = 'mars1';
        }
        tiles.push(new Tile(world, {
          sprite: 'terrain_' + sprite,
          x: xOffset + (j * width),
          y: yOffset + (i * height),
          width: width,
          height: height,
          speed: 0
        }));
      }
    }
    return tiles;
  };


  return TerrainBuilder;

});
