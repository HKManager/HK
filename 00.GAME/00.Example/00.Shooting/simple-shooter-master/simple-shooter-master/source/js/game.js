/*-----------------------------------------------------
	STARTING THE GAME.

	create the image repository: when all the images
	are loaded, the init() function will be called
	and if the browser supports the canvas, game.init()
	will return true and the game (with the animations)
	will start.
-----------------------------------------------------*/

var game = new Game();
var imgRepo = new ImgRepo();
 
function init() {
	if (game.init()) {
		game.start();
	}
}

/*-----------------------------------------------------
	Game class

	Starts the game, initialises all the objects
-----------------------------------------------------*/
function Game() {

	this.init = function() {
		// Get the canvas elements
		this.bgCanvas = document.getElementById('bg');
		this.enemiesCanvas = document.getElementById('enemies');
		this.mainCanvas = document.getElementById('main');
		this.obstaclesCanvas = document.getElementById('obstacles');

		// run game only if canvas is supported
		if (this.bgCanvas.getContext) {

			this.bgContext = this.bgCanvas.getContext("2d");
			this.enemiesContext = this.enemiesCanvas.getContext("2d");
			this.mainContext = this.mainCanvas.getContext("2d");
			this.obstaclesContext = this.obstaclesCanvas.getContext("2d");

			Player.prototype.context = this.mainContext;
			Player.prototype.canvasWidth = this.mainCanvas.width;
			Player.prototype.canvasHeight = this.mainCanvas.height;

			Enemy_A.prototype.context = this.enemiesContext;
			Enemy_A.prototype.canvasWidth = this.enemiesCanvas.width;
			Enemy_A.prototype.canvasHeight = this.enemiesCanvas.height;

			Enemy_B.prototype.context = this.enemiesContext;
			Enemy_B.prototype.canvasWidth = this.enemiesCanvas.width;
			Enemy_B.prototype.canvasHeight = this.enemiesCanvas.height;

			Bullet.prototype.context = this.enemiesContext;
			Bullet.prototype.canvasWidth = this.enemiesCanvas.width;
			Bullet.prototype.canvasHeight = this.enemiesCanvas.height;

			Obstacle_A.prototype.context = this.obstaclesContext;
			Obstacle_A.prototype.canvasWidth = this.obstaclesCanvas.width;
			Obstacle_A.prototype.canvasHeight = this.obstaclesCanvas.height;

			Obstacle_B.prototype.context = this.obstaclesContext;
			Obstacle_B.prototype.canvasWidth = this.obstaclesCanvas.width;
			Obstacle_B.prototype.canvasHeight = this.obstaclesCanvas.height;

			// create player
			this.player = new Player();
			this.player.init(
				10,
				20,
				imgRepo.main.width,
				imgRepo.main.height
			);

			// create enemy_1
			this.enemies = [];

			this.enemies[0] = new Enemy_A();
			this.enemies[0].init(
				150,
				this.enemiesCanvas.height-imgRepo.enemy_1.height,
				imgRepo.enemy_1.width,
				imgRepo.enemy_1.height
			);
			this.enemies[1] = new Enemy_A();
			this.enemies[1].init(
				this.enemiesCanvas.width-100,
				this.enemiesCanvas.height-imgRepo.enemy_1.height,
				imgRepo.enemy_1.width,
				imgRepo.enemy_1.height
			);
			this.enemies[2] = new Enemy_B();
			this.enemies[2].init(
				330,
				this.enemiesCanvas.height-10,
				imgRepo.enemy_2.width,
				imgRepo.enemy_2.height
			);

			// create pool of bullets for the enemies
			// (the bullets remain on screen even if
			// enemies get killed)
			this.enemyBulletPool = new BulletPool(40);
			this.enemyBulletPool.init(DRAWABLE_TYPES.enemyBullet);

			// create obstacles
			this.obstacles = [];

			this.obstacles[0] = new Obstacle_A();
			this.obstacles[0].init(
				80,
				this.obstaclesCanvas.height - imgRepo.obstacle_1.height,
				imgRepo.obstacle_1.width,
				imgRepo.obstacle_1.height
			);

			this.obstacles[1] = new Obstacle_A();
			this.obstacles[1].init(
				470,
				this.obstaclesCanvas.height - imgRepo.obstacle_1.height,
				imgRepo.obstacle_1.width,
				imgRepo.obstacle_1.height
			);

			this.obstacles[2] = new Obstacle_B();
			this.obstacles[2].init(
				280,
				this.obstaclesCanvas.height - imgRepo.obstacle_2.height,
				imgRepo.obstacle_2.width,
				imgRepo.obstacle_2.height
			);

			return true;

		} else {
			return false;
		}

	};

	this.start = function() {
		console.log("START");
		this.player.draw();
		for (var i=0; i<game.obstacles.length; i++) {
			game.obstacles[i].draw();
		}
		//start animation loop
		animate();
	};

	this.gameOver = function() {
		document.getElementById("gameOver").style.display = "block";
	};

	this.win = function() {
		document.getElementById("gameWin").style.display = "block";
	};

	this.restart = function() {
		document.getElementById("gameOver").style.display = "none";
		document.getElementById("gameWin").style.display = "none";

		this.bgContext.clearRect(0,0,this.bgCanvas.width, this.bgCanvas.height);
		this.enemiesContext.clearRect(0,0,this.enemiesCanvas.width, this.enemiesCanvas.height);
		this.mainContext.clearRect(0,0,this.mainCanvas.width, this.mainCanvas.height);
		this.obstaclesContext.clearRect(0,0,this.obstaclesCanvas.width, this.obstaclesCanvas.height);

		this.player.init(
			10,
			this.mainCanvas.height-imgRepo.main.height-200,
			imgRepo.main.width,
			imgRepo.main.height
		);

		this.enemies[0].init(
			150,
			this.enemiesCanvas.height-imgRepo.enemy_1.height,
			imgRepo.enemy_1.width,
			imgRepo.enemy_1.height
		);
		this.enemies[1].init(
			this.enemiesCanvas.width-100,
			this.enemiesCanvas.height-imgRepo.enemy_1.height,
			imgRepo.enemy_1.width,
			imgRepo.enemy_1.height
		);
		this.enemies[2].init(
			330,
			this.enemiesCanvas.height-10,
			imgRepo.enemy_2.width,
			imgRepo.enemy_2.height
		);

		this.enemyBulletPool.init(DRAWABLE_TYPES.enemyBullet);

		this.obstacles[0].init(
			80,
			this.obstaclesCanvas.height - imgRepo.obstacle_1.height,
			imgRepo.obstacle_1.width,
			imgRepo.obstacle_1.height
		);

		this.obstacles[1].init(
			470,
			this.obstaclesCanvas.height - imgRepo.obstacle_1.height,
			imgRepo.obstacle_1.width,
			imgRepo.obstacle_1.height
		);

		this.obstacles[2].init(
			280,
			this.obstaclesCanvas.height - imgRepo.obstacle_2.height,
			imgRepo.obstacle_2.width,
			imgRepo.obstacle_2.height
		);

		this.start();

	};
}

/*-----------------------------------------------------
	Animation Loop
-----------------------------------------------------*/

function animate () {
	// recursively call this method for
	// the next available frame

	var i;
	
	if (game.player.alive) {

		var deadEnemies = 0;
		for (i=0; i<game.enemies.length; i++) {
			if (!game.enemies[i].alive) {
				deadEnemies++;
			}
		}
		if (deadEnemies === game.enemies.length) {
			game.win();

		} else {
			requestAnimFrame( animate );

			// react to keys pressed and draw the main character
			game.player.move();
			// eventually draw the bullets fired by the main char.
			game.player.bulletPool.animate();

			// move enemies
			for (i=0; i<game.enemies.length; i++) {
				game.enemies[i].draw();
			}

			// eventually draw the bullets fired by the enemies
			game.enemyBulletPool.animate();

			collisionDetection();
		}

	} else {
		game.gameOver();
	}
}

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
})();