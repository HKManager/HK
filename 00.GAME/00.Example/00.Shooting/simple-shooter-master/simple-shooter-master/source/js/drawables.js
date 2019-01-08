var DRAWABLE_TYPES = {
	drawable:"drawable",
	obstacle:"obstacle",
	player: "player",
	enemy: "enemy",
	bullet: "bullet",
	enemyBullet: "enemyBullet"
};


/*-----------------------------------------------------
	Base Drawable class

	All elements drawn on canvas inherit from it
-----------------------------------------------------*/

function Drawable() {
	this.init = function(x, y, width, height) {
		// Defualt variables
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.previousPosition = {x: this.x, y:this.y};
	};
	
	this.type = DRAWABLE_TYPES.drawable;
	this.speed = 0; //speed and direction of the movement
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	
	// Define abstract function to be implemented in child objects
	this.draw = function() { };
	this.move = function() { };
}

/*-----------------------------------------------------
	Player element (the user)

	Can move, jump and shoot
-----------------------------------------------------*/
function Player() {

	this.type = DRAWABLE_TYPES.player;
	
	this.bulletPool = new BulletPool(30);
	var fireRate = 15; //fire at least every 15 frames
	var fireCounter = 0;

	var jumpFrames = 15; // up for 10 frames, down for 10 frames
	var jumpCounter = 0;

	this.init = function(x,y,w,h) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.alive = true;
		this.bulletPool.init(DRAWABLE_TYPES.bullet);
		this.facingLeft = false; // shoot direction
		this.speed = {x: 3, y: 5};
		this.isTouchingTheFloor = false;
		this.floorHeight = null;
		this.isJumping = false;
		jumpCounter = 0;
	};

	this.draw = function() {
		this.context.drawImage(imgRepo.main, this.x, this.y);
	};

	this.move = function() {
		fireCounter++;
		this.previousPosition = {x: this.x, y:this.y};

		// clear the rect around the player
		var clearPadding = 50;
		this.context.clearRect(this.x-clearPadding, this.y-clearPadding, this.width+(2*clearPadding), this.height+(2*clearPadding));

		// check 
		if (!this.floorHeight) {
			this.floorHeight = this.canvasHeight;
		}
		if (this.y + this.height > this.floorHeight) {
			this.y = this.floorHeight - this.height;
			this.isTouchingTheFloor = true;
			this.speed.y = 0;
		}

		if (this.y <= 0) {
			this.speed.y = 5;
			this.y = 0;
		}

		this.y += this.speed.y;

		// determine the action to perform based on the key pressed:
		// moving or jumping
		if (KEY_STATUS.left || KEY_STATUS.right || KEY_STATUS.up || this.isJumping) {

			// it moved -> clear the rectangle

			if (KEY_STATUS.left) {
				this.facingLeft = true;
				this.x -= this.speed.x;
				if (this.x <= 0) { // Kep player within the screen
					this.x = 0;
				}
			} else if (KEY_STATUS.right) {
				this.facingLeft = false;
				this.x += this.speed.x;
				if (this.x >= this.canvasWidth - this.width) {
					this.x = this.canvasWidth - this.width;
				}
			}


			if (KEY_STATUS.up && this.isTouchingTheFloor) {

				this.speed.y = -5;
				this.y += this.speed.y;
				this.isJumping = true;
				this.isTouchingTheFloor = false;
			}
		}

		if (this.isJumping) {
			this.jump();
		}

		// the position may have changed, time to redraw
		this.draw();

		if (KEY_STATUS.space && fireCounter >= fireRate) {
			this.fire();
			fireCounter = 0;
		}
	};

	this.fire = function() {
		var bulletSpeed = this.facingLeft ? -5 : 5;
		var bulletStartingX = this.facingLeft ? this.x-imgRepo.mainBullet.width : this.x+this.width;
		this.bulletPool.shoot(bulletStartingX, this.y+10, bulletSpeed);

	};

	// jump up for jumpFrames frames and then fall fown until
	// it reaches a limit (the ground)
	this.jump = function() {

		jumpCounter = (jumpCounter+1) % (jumpFrames+1);

		if (jumpCounter >= jumpFrames) {
			this.speed.y = -this.speed.y;
			this.isJumping = false;
			jumpCounter = 0;
		}
	};
}
Player.prototype = new Drawable();


/*-----------------------------------------------------
	Enemy (abstract class)

	The behaviour (movement patter, ability to fire)
	is defined in the subclasses
-----------------------------------------------------*/
function Enemy() {

	this.type = DRAWABLE_TYPES.enemy;

	// initialize enemy
	this.init = function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.alive = true;

		this.facingLeft = false; // shoot direction

	};

	// draw enemy on screen
	this.draw = function() {

		// clear the previous frame pixels
		this.context.clearRect(this.x-1, this.y, this.width+1, this.height);
		
		if (this.alive) {
			this.x += this.speed.x;
			this.y += this.speed.y;

			//MOVEMENT LOGIC
			this.calculateBehaviour();

			this.context.drawImage(
				this.image(),
				this.x,
				this.y
			);
		
			return false;
		}
	};

	// the bullet is normally fired at the top px of the enemy
	this.bulletHeight = function() {
		return this.y;
	};

	// shoots a bullet
	this.fire = function() {
		var bulletSpeed = this.facingLeft ? -4 : 4;
		var bulletStartingX = this.facingLeft ? this.x-imgRepo.enemyBullet.width : this.x+this.width;
		game.enemyBulletPool.shoot(bulletStartingX, this.bulletHeight(), bulletSpeed);
	};

	// to be overridden
	this.calculateBehaviour = function() { };
	this.image = function() { };
}
Enemy.prototype = new Drawable();

/*-----------------------------------------------------
	Enemy, first type

	Moves left/right
-----------------------------------------------------*/
function Enemy_A() {

	this.limit = null;
	this.speed = {x:1, y:0};

	// this enemy fires the bulet at a different height
	this.bulletHeight = function() {
		return this.y+this.height/2;
	};
	
	this.image = function() {
		return imgRepo.enemy_1;
	};

	this.calculateBehaviour = function () {

		// initialize the limit the first time
		// befor it is impossible (x and y are not initialized)
		if (!this.limit) {
			this.limit = {
				left: this.x - 35,
				right: this.x + 35,
			};
		}

		// change direction when it reaches its left/right limit
		if (this.x <= this.limit.left) {
			this.fire();
			this.facingLeft = false;
			this.speed.x = -this.speed.x;
		}
		else if (this.x >= this.limit.right + this.width) {
			this.fire();
			this.facingLeft = true;
			this.speed.x = -this.speed.x;
		}
	};
}
Enemy_A.prototype = new Enemy();

/*-----------------------------------------------------
	Enemy, second type

	Moves up/down
-----------------------------------------------------*/
function Enemy_B() {
	this.speed = {x:0, y:1};
	this.limit = null;

	this.image = function() {
		return imgRepo.enemy_2;
	};

	this.calculateBehaviour = function () {

		// initialize the limit the first time
		// befor it is impossible (x and y are not initialized)
		if (!this.limit) {
			this.limit = {
				up: this.y - this.height,
				down: this.y + this.height
			};
		}
		// change direction when it reaches its up/down limit
		if (this.y <= this.limit.up) {
			//when it touches the upper limit, switch left/right and fire
			this.facingLeft = !this.facingLeft;
			this.speed.y = -this.speed.y;
			this.fire();
		}
		else if (this.y >= this.limit.down) {
			this.speed.y = -this.speed.y;
		}
	};
}
Enemy_B.prototype = new Enemy();


/*-----------------------------------------------------
	Bullet element

	Can be shot both from the main characters and
	from the enemies (depending on the object)
-----------------------------------------------------*/
function Bullet(object) {
	
	// Is true if the bullet is currently in use
	this.alive = false;
	
	// can be "bullet" or "enemyBullet"
	// (see Pool class)
	this.type = object;

	// re-initialize a bullet and make it alive
	this.spawn = function(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.alive = true;
		this.isColliding = false;
	};

	// clear the rectangle around the bullet in the previous frame
	// draws the bullet in its new position
	// if the bullet goes off screen, return true --> the bullet
	// won't be drawn
	this.draw = function() {

		this.context.clearRect(this.x-1, this.y-1, this.width+2, this.height+2);
		this.x += this.speed;
		
		if (this.isColliding) {
			return true;

		} else if (this.x < 0 || this.x > this.canvasWidth-this.width) {
			return true;
		
		} else {
			if (this.type === DRAWABLE_TYPES.bullet) {
				this.context.drawImage(imgRepo.mainBullet, this.x, this.y);
			}
			else if (this.type === DRAWABLE_TYPES.enemyBullet) {
				this.context.drawImage(imgRepo.enemyBullet, this.x, this.y);
			}
			
			return false;
		}
	};
	
	// resets all the values and make the bullet not alive
	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.alive = false;
		this.isColliding = false;
	};
}
Bullet.prototype = new Drawable();

/*-----------------------------------------------------
	Obstacle element (abstract)
-----------------------------------------------------*/
function Obstacle(object) {

	this.type = DRAWABLE_TYPES.obstacle;
	
	// drawn only once, at creation time
	this.draw = function() {
		this.context.drawImage(this.image(), this.x, this.y);
	};

	//to be overridden
	this.image = function() { };
}
Obstacle.prototype = new Drawable();

/*-----------------------------------------------------
	Obstacle type A
-----------------------------------------------------*/
function Obstacle_A(object) {
	this.image = function() {
		return imgRepo.obstacle_1;
	};
}
Obstacle_A.prototype = new Obstacle();

/*-----------------------------------------------------
	Obstacle type B
-----------------------------------------------------*/
function Obstacle_B(object) {
	this.image = function() {
		return imgRepo.obstacle_2;
	};
}
Obstacle_B.prototype = new Obstacle();