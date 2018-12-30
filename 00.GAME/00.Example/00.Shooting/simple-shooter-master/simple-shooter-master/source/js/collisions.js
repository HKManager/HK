function collisionDetection() {

	var i,j;
	var playerCanGoDown = 0;

	// check the obstacles:
	for (i=0; i<game.obstacles.length; i++) {

		// if player touches obstacles
		if (intersection(game.player, game.obstacles[i])) {

			//game.player.context.clearRect(
			//	game.player.x,
			//	game.player.y,
			//	game.player.width,
			//	game.player.height
			//);
			touchingObstacle(game.player, game.obstacles[i]);

		} else {

			if (game.player.x > game.obstacles[i].x + game.obstacles[i].width ||
				game.player.x + game.player.width < game.obstacles[i].x) {
				
				playerCanGoDown++;
			}
		}

		// if player's bullet touches obstacles
		for (j=0; j<game.player.bulletPool.getPool().length; j++) {
			if (intersection(game.obstacles[i], game.player.bulletPool.getPool()[j])) {
				game.player.bulletPool.getPool()[j].isColliding = true;
			}
		}

		// if enemy's bullet touches obstacles
		for (j=0; j<game.enemyBulletPool.getPool().length; j++) {
			if (intersection(game.obstacles[i], game.enemyBulletPool.getPool()[j])) {
				game.enemyBulletPool.getPool()[j].isColliding = true;
			}
		}
	}

	for (i=0; i<game.enemies.length; i++) {
		if (game.enemies[i].alive) {

			if (intersection(game.player, game.enemies[i])) {
				game.player.alive = false;
			}

			for (j=0; j<game.player.bulletPool.getPool().length; j++) {
				if (intersection(game.enemies[i], game.player.bulletPool.getPool()[j])) {
					game.enemies[i].alive = false;
					game.player.bulletPool.getPool()[j].isColliding = true;
				}
			}
		}
	}

	// if the enemy's bullet touches the player

	for (i=0; i<game.enemyBulletPool.getPool().length; i++) {
		if ( intersection(game.player, game.enemyBulletPool.getPool()[i]) ) {
			game.enemyBulletPool.getPool()[i].isColliding = true;
			game.player.alive = false;
		}
	}


	// the player changes is no more touching the top of an obstacle,

	if (playerCanGoDown === game.obstacles.length) {

		if (game.player.floorHeight !== game.player.canvasHeight) {

			game.player.isTouchingTheFloor = false;
			game.player.floorHeight = game.player.canvasHeight;
			game.player.speed.y = 5;
		}
	}


}

function intersection(rectA, rectB) {
	return !(
		rectA.x + rectA.width < rectB.x		||
		rectB.x + rectB.width < rectA.x		||
		rectA.y + rectA.height < rectB.y	||
		rectB.y + rectB.height < rectA.y
	);
}

// what happend when something touched an obstacle
function touchingObstacle(entity, obstacle) {

	// if a player or an enemy, it can't go farther
	if (entity.type === DRAWABLE_TYPES.player ||
		entity.type === DRAWABLE_TYPES.enemy) {

		
		if (entity.previousPosition.y + entity.height < obstacle.y) {

			//entity above the obstacle

			if (entity.type === DRAWABLE_TYPES.player) {
				entity.floorHeight = obstacle.y-1;
				entity.speed.y = 0;
				entity.isTouchingTheFloor = true;
			}

		} else if (entity.previousPosition.y + entity.height >= obstacle.y) {
	
			//entity on one side (left/right) of the obstacle

			if (entity.x + entity.width + entity.speed.x >= obstacle.x &&
				entity.x + entity.width + entity.speed.x < obstacle.x + obstacle.width) {

				// entity to the left of the obstacle
				entity.x = obstacle.x - entity.width - entity.speed.x;

			} else if (entity.x < obstacle.x + obstacle.width + entity.speed.x) {

				// entity to the right of the obstacle
				entity.x = obstacle.x + obstacle.width + entity.speed.x;
			}
		
		}
	}
}