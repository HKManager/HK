/*****************************************************

                    GameManager.js

*****************************************************/

GameManager = function() {}

GameManager.prototype = Object.create(Phaser.Sprite.prototype);
GameManager.prototype.constructor = GameManager;

let baskets;

let basketCollisionGroup;
let ballCollisionGroup;

GameManager.prototype.create = function()
{
    levelManager = new LevelManager();
    levelManager.create();
}

GameManager.prototype.render = function()
{
}
