/// <reference path="Interfaces.ts"/>
/// <reference path="Enemy.ts"/>
/// <reference path="Collision.ts"/>
/// <reference path="Player.ts"/>
/// <reference path="EnemyFactory.ts"/>
var GlobalData = (function () {
    function GlobalData() {
    }
    return GlobalData;
})();
var Game = (function () {
    function Game() {
        this.mothershipHealth = 100;
        this.posX = 0;
        this.posY = 0;
        this.min = 20;
        this.max = 20;
        this.enemyLimit = 2; //number of enemies allowed
        this.enemyDelay = 0; //iterations between generating new enemy
        this.canvasWidth = 900;
        this.canvasHeight = 500;
        this.globalData = new GlobalData();
        this.globalData.enemies = [];
        this.globalData.rockets = [];
        this.globalData.expiring = [];
        this.collision = new CollisionDetection();
        // Set player's starting position
        this.playerShip = new PlayerShip((this.canvasWidth / 2), this.canvasHeight - 100);
    }
    Game.prototype.step = function () {
        var enemyFactory = new EnemyFactory();
        this.enemyDelay++;
        if (this.globalData.enemies.length <= this.enemyLimit) {
            if (this.enemyDelay >= 40) {
                this.globalData.enemies.push(enemyFactory.createRandomEnemy());
                this.enemyDelay = 0;
            }
        }
    };
    Game.prototype.update = function () {
        document.getElementById("mothershipHealth").innerText = this.mothershipHealth.toString();
        document.getElementById("playerHealth").innerText = this.playerShip.getHealth().toString();
    };
    Game.prototype.shoot = function () {
        if (this.playerShip.isDead())
            return;
        var rocket = new PlayerRocket(this.playerShip.getPosX() + 10, this.playerShip.getPosY());
        this.globalData.rockets.push(rocket);
    };
    Game.prototype.draw = function () {
        var appCanvas = document.getElementById('game_canvas');
        this.context = appCanvas.getContext("2d");
        this.context.globalCompositeOperation = 'destination-over';
        this.context.clearRect(0, 0, 900, 500); // clear canvas
        this.context.fillStyle = 'rgba(0,0,0,0.4)';
        this.context.strokeStyle = 'rgba(0,153,255,0.4)';
        this.context.save();
        if (this.playerShip.movingLeft)
            this.playerShip.moveLeft();
        if (this.playerShip.movingRight)
            this.playerShip.moveRight();
        if (this.playerShip.movingUp)
            this.playerShip.moveUp();
        if (this.playerShip.movingDown)
            this.playerShip.moveDown();
        this.playerShip.draw(this.context);
        this.collision.detectCollisions(this.globalData.rockets, this.globalData.enemies);
        if (!this.playerShip.isDead()) {
            this.collision.detectCollisionOnPoint(this.playerShip, this.globalData.enemies);
        }
        var i;
        // Check expired enemies
        for (i = this.globalData.enemies.length - 1; i >= 0; i--) {
            var enemy = this.globalData.enemies[i];
            if (enemy.getPosY() >= 500) {
                this.mothershipHealth -= this.globalData.enemies[i].getDamageDelivered();
                this.globalData.enemies.splice(i, 1);
            }
        }
        // Remove expired rockets
        for (i = this.globalData.rockets.length - 1; i >= 0; i--) {
            if (this.globalData.rockets[i].getPosY() < -20) {
                this.globalData.rockets.splice(i, 1);
            }
        }
        // Remove dead entities
        for (i = this.globalData.enemies.length - 1; i >= 0; i--) {
            if (this.globalData.enemies[i].isDead()) {
                // Add exploding enemies to new array
                this.globalData.expiring.push(this.globalData.enemies[i]);
                this.globalData.enemies.splice(i, 1);
            }
        }
        for (i = this.globalData.rockets.length - 1; i >= 0; i--) {
            if (this.globalData.rockets[i].isDead()) {
                this.globalData.rockets.splice(i, 1);
            }
        }
        // Draw enemies
        var drawable;
        for (i = 0; i < this.globalData.enemies.length; i++) {
            drawable = this.globalData.enemies[i];
            drawable.draw(this.context);
        }
        // Draw rockets
        for (i = 0; i < this.globalData.rockets.length; i++) {
            drawable = this.globalData.rockets[i];
            if (!drawable.isDead()) {
                drawable.draw(this.context);
            }
        }
        // Draw expiring (aka exploding enemies)
        for (i = 0; i < this.globalData.expiring.length; i++) {
            drawable = this.globalData.expiring[i];
            drawable.draw(this.context);
        }
    };
    return Game;
})();
var PlayerRocket = (function () {
    function PlayerRocket(posX, posY) {
        this.rocketHeight = 20;
        this.rocketWidth = 20;
        this.rocketSpeed = 8;
        this.rocketPosX = posX;
        this.rocketPosY = posY;
        this.rocketHealth = 100;
    }
    PlayerRocket.prototype.draw = function (context) {
        var image = new Image();
        this.rocketPosY = (this.rocketPosY--) - this.rocketSpeed;
        image.src = './sprites/rocket.png';
        context.drawImage(image, this.rocketPosX, this.rocketPosY, this.rocketWidth, this.rocketHeight);
    };
    PlayerRocket.prototype.isDead = function () {
        return this.rocketIsDead;
    };
    PlayerRocket.prototype.getPosX = function () {
        return this.rocketPosX;
    };
    PlayerRocket.prototype.getPosY = function () {
        return this.rocketPosY;
    };
    PlayerRocket.prototype.getWidth = function () {
        return this.rocketWidth;
    };
    PlayerRocket.prototype.getHeight = function () {
        return this.rocketHeight;
    };
    PlayerRocket.prototype.takeDamage = function () {
        this.rocketIsDead = true;
    };
    return PlayerRocket;
})();
window.onload = function () {
    var game = new Game();
    document.onkeydown = keyDownCheck;
    document.onkeyup = keyUpCheck;
    function keyDownCheck(e) {
        e = e || window.event;
        if (e.keyCode == 37 && !game.playerShip.isDead())
            game.playerShip.setMoveLeft(true);
        if (e.keyCode == 38 && !game.playerShip.isDead())
            game.playerShip.setMoveUp(true);
        if (e.keyCode == 39 && !game.playerShip.isDead())
            game.playerShip.setMoveRight(true);
        if (e.keyCode == 40 && !game.playerShip.isDead())
            game.playerShip.setMoveDown(true);
    }
    function keyUpCheck(e) {
        e = e || window.event;
        if (e.keyCode == 37 && !game.playerShip.isDead())
            game.playerShip.setMoveLeft(false);
        if (e.keyCode == 38 && !game.playerShip.isDead())
            game.playerShip.setMoveUp(false);
        if (e.keyCode == 39 && !game.playerShip.isDead())
            game.playerShip.setMoveRight(false);
        if (e.keyCode == 40 && !game.playerShip.isDead())
            game.playerShip.setMoveDown(false);
        if (e.keyCode == 32)
            game.shoot();
    }
    (function gameloop() {
        // stats.update();
        game.step();
        game.update();
        game.draw();
        window.requestAnimationFrame(gameloop);
    })();
};
//# sourceMappingURL=app.js.map