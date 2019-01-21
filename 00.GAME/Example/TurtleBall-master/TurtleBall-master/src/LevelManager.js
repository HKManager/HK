LevelManager = function() {}

LevelManager.prototype = Object.create(Phaser.Sprite.prototype);
LevelManager.prototype.constructor = LevelManager;

LevelManager.prototype.create = function()
{
	game.stage.backgroundColor = '#22A7F0';

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.gravity.y = 2000;
    game.physics.p2.restitution = 1;

	baskets = game.add.group();
    baskets.enableBody = true;
    baskets.physicsBodyType = Phaser.Physics.P2JS;

    basketCollisionGroup = game.physics.p2.createCollisionGroup();
    ballCollisionGroup = game.physics.p2.createCollisionGroup();

    let ball = new Ball();
    ball.create();

    game.physics.p2.updateBoundsCollisionGroup();

	this.buildLevel();
}

LevelManager.prototype.buildLevel = function()
{
    for (var y = 0; y < 9; y++) {

    	for (var x = 0; x < 7; x++) {
    		// Création de la tile
    		switch(levelData['level_1']['data'][y][x]) {
                case 'U':
    				let basket = new Basket();
                    basket.create(x * (game.world.width / 5), y * (game.world.height / 9));
                break;
    		}
    	}
    }
}

LevelManager.prototype.update = function()
{
}
