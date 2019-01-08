/*-----------------------------------------------------
	Images Library

	The game can start only when all the images
	are loaded
-----------------------------------------------------*/
function ImgRepo() {

	var numLoaded = 0;
	var numImages = 0;

	function createImage () {
		numImages++;
		return new Image();
	}

	function onImageLoad () {

		numLoaded++;
		// initialize the environment only when all the images are loaded
		if (numLoaded === numImages){
			console.log("all images loaded");
			window.init();
		}
	}

	this.mainBullet = createImage();
	this.enemyBullet = createImage();
	this.main = createImage();
	this.enemy_1 = createImage();
	this.enemy_2 = createImage();
	this.obstacle_1 = createImage();
	this.obstacle_2 = createImage();

	this.mainBullet.onload = function() { onImageLoad(); };
	this.enemyBullet.onload = function() { onImageLoad(); };
	this.main.onload = function() { onImageLoad(); };
	this.enemy_1.onload = function() { onImageLoad(); };
	this.enemy_2.onload = function() { onImageLoad(); };
	this.obstacle_1.onload = function() { onImageLoad(); };
	this.obstacle_2.onload = function() { onImageLoad(); };

	this.mainBullet.src = "./img/bullet_main.png";
	this.enemyBullet.src = "./img/bullet_enemy.png";
	this.main.src = "./img/main.png";
	this.enemy_1.src = "./img/enemy_1.png";
	this.enemy_2.src = "./img/enemy_2.png";
	this.obstacle_1.src = "./img/obstacle_1.png";
	this.obstacle_2.src = "./img/obstacle_2.png";

}