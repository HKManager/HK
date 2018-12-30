function BulletPool(maxSize) {

	// Max bullets allowed in the pool
	var size = maxSize;
	// The alive elements are always in the first position of the array
	var pool = [];
	
	// returns only the alive objects
	this.getPool = function() {
		var obj = [];
		for (var i = 0; i < size; i++) {
			if (pool[i].alive) {
				obj.push(pool[i]);
			}
		}
		return obj;
	};
	
	// populate the pool with the selected type of bullet
	this.init = function(object) {

		if (object!=="bullet" && object!== "enemyBullet") {
			return;
		}

		var bullet, i;

		if (object === "bullet") {
			for (i = 0; i < size; i++) {
				// Initalize the object
				bullet = new Bullet("bullet");
				bullet.init(0, 0, imgRepo.mainBullet.width, imgRepo.mainBullet.height);
				// bullet.collidableWith = "enemy";
				// bullet.type = "bullet";
				pool[i] = bullet;
			}
		} else if (object === "enemyBullet") {
			for (i = 0; i < size; i++) {
				bullet = new Bullet("enemyBullet");
				bullet.init(0,0, imgRepo.enemyBullet.width, imgRepo.enemyBullet.height);
				// bullet.collidableWith = "ship";
				// bullet.type = "enemyBullet";
				pool[i] = bullet;
			}
		}
	};
	
	// makes an unused element alive,
	// and moves it in the beginning of the array
	this.shoot = function(x, y, speed) {
		if(!pool[size - 1].alive) {
			pool[size - 1].spawn(x, y, speed);
			pool.unshift(pool.pop());
		}
	};

	
	// draw alive bullets, and clean them if they go off screen
	this.animate = function() {
		for (var i = 0; i < size; i++) {
			// stop drawing at the first non-alive bullet
			if (pool[i].alive) {
				if (pool[i].draw()) {
					pool[i].clear();
					pool.push((pool.splice(i,1))[0]);
				}
			
			} else {
				break;
			}
		}
	};
}