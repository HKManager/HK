/**
 * shooter.js
 * JavaScript for Space Shooter HTML5 game
 * based on tutorial from http://www.html5rocks.com/en/tutorials/canvas/notearsgame/ 
 */

/** CONSTANTS **/
var CANVAS_WIDTH = 500,
	CANVAS_HEIGHT = 500,
	FPS = 30;

/** COLORS **/
var BLACK = "#000",
	PURPLE = "#A2B",
	BLUE = "#00A";

var $canvas = $("canvas"),	//assume only one canvas element and cache as jQuery obj
	canvas = $canvas.get(0).getContext("2d");

var player, enemies;

$canvas.prop({
	width: CANVAS_WIDTH,
	height: CANVAS_HEIGHT
});

/** SET UP **/
function setUp () {
	player = new Player();
	enemies = [];

	/** GAME LOOP **/
	setInterval(function () {
		update();
		draw();
	}, 1000/FPS);
}

function update() {
	player.update();

	enemies.forEach(function(enemy) {
		enemy.update();
	});

	enemies = enemies.filter(function(enemy) {
		return enemy.active;
	});

	if(Math.random() < 0.1) {
		enemies.push(new Enemy());
	}

	handleCollisions();
}

function draw() {
	canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	player.draw();

	enemies.forEach(function(enemy) {
		enemy.draw();
	});
}

/** PLAYER OBJECT **/
function Player () {
	this.color = BLUE;
	this.x = 220;
	this.y = 270;
	this.width = 32;
	this.height = 32;
	this.playerBullets = [];
	this.lives = 5;
}

Player.prototype = {
	draw: function() {
		canvas.fillStyle = this.color;
		canvas.fillRect(this.x, this.y, this.width, this.height);
		this.playerBullets.forEach(function (bullet) {
			bullet.draw();
		})
	},
	update: function() {
		if (keydown.left) {
			this.x -= 5;
		}

		if (keydown.right) {
			this.x += 5;
 		}

 		if (keydown.up) {
 			this.y -= 5;
 		}

 		if (keydown.down) {
 			this.y += 5;
 		}

 		if (keydown.space) {
 			this.shoot();
 		}

 		player.x = player.x.clamp(0, CANVAS_WIDTH - this.width);
 		player.y = player.y.clamp(0, CANVAS_HEIGHT - this.height);

 		this.playerBullets.forEach(function (bullet) {
 			bullet.update();
 		});

 		this.playerBullets = this.playerBullets.filter(function (bullet) {
 			return bullet.active;
 		});
	},
	shoot: function() {
		var bulletPosition = this.midpoint();
		var speed = 5;
		this.playerBullets.push(new Bullet(bulletPosition.x, bulletPosition.y, speed));
	},
	midpoint: function() {
		return {
			x: this.x + this.width/2,
			y: this.y + this.height/2
		};
	},
	explode: function () {
		if (this.lives > 0) {
			this.lives--;
		} else {
			alert("you lost");
		}
	}
};

/** BULLET OBJECT **/
function Bullet (x, y, speed) {
	this.active = true;

	this.speed = speed;
	this.x = x;
	this.y = y;
	this.xVelocity = 0;
	this.yVelocity = -speed;
	this.width = 3;
	this.height = 3;
	this.color = BLACK;

	return this;
}

Bullet.prototype = {
	inBounds: function () {
		return this.x >= 0 && this.x <= CANVAS_WIDTH &&
			this.y >= 0 && this.y <= CANVAS_HEIGHT;
	},
	draw: function () {
		canvas.fillStyle = this.color;
		canvas.fillRect(this.x, this.y, this.width, this.height);
	},
	update: function () {
		this.x += this.xVelocity;
		this.y += this.yVelocity;

		this.active = this.active && this.inBounds();
	}
}

/** ENEMY OBJECT */
function Enemy() {
	this.active = true;
	this.age = Math.floor(Math.random() * 128);
	
	this.color = PURPLE;

	this.x = CANVAS_WIDTH / 4 + Math.random() * CANVAS_WIDTH / 2;
	this.y = 0;
	this.xVelocity = 0;
	this.yVelocity = 2;

	this.width = 32;
	this.height = 32;
}

Enemy.prototype = {
	inBounds: function () {
		return this.x >= 0 && this.x <= CANVAS_WIDTH &&
			this.y >= 0 && this.y <=CANVAS_HEIGHT;
	},
	draw: function () {
		canvas.fillStyle = this.color;
		canvas.fillRect(this.x, this.y, this.width, this.height);
	},
	update: function () {
		this.x += this.xVelocity;
		this.y += this.yVelocity;

		this.xVelocity = 3 * Math.sin(this.age * Math.PI / 64);

		this.age++;

		this.active = this.active && this.inBounds();
	},
	explode: function () {
		this.active = false;
	}
}

function handleCollisions() {
	handleBulletCollisions();
	handleEnemyCollisions();
}

function handleEnemyCollisions() {
	enemies.forEach(function(enemy) {	
		if (collides(enemy, player)) {
			enemy.explode();
			player.explode();
		}
	});
}

function handleBulletCollisions () {
		player.playerBullets.forEach(function(bullet) {
		enemies.forEach(function(enemy) {
			if (collides(bullet, enemy)) {
				enemy.explode();
				bullet.active = false;
			}
		});
	});
}

//Start this thing
setUp();