Ball = function() {}

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.create = function()
{
    this.startPos = {x: game.world.centerX, y: game.world.centerY * 1.4};
    this.throwSpeed = 8;

    Phaser.Sprite.call(this, game, this.startPos.x, this.startPos.y, 'ball');
    game.physics.p2.enable(this, false);
    this.body.setCollisionGroup(ballCollisionGroup);
    this.body.collides(basketCollisionGroup);

    this.anchor.setTo(0.5, 0.5);
    this.initWidth = this.width;
    this.width = game.world.width / 7;
    this.height = (this.height * this.width) / this.initWidth;

    this.body.dynamic = false;
    this.body.collideWorldBounds = true;
    this.body.mass = 100;
    this.body.bounce = 100;

    this.inputEnabled = true;
    this.input.enableDrag();

    game.add.existing(this);

    this.events.onDragUpdate.add(this.dragUpdate.bind(this));
    this.events.onDragStop.add(this.dragStop.bind(this));
}

Ball.prototype.render = function()
{
    game.physics.arcade.collide(this, baskets);
}

Ball.prototype.dragUpdate = function(sprite, pointer)
{
    this.body.x = pointer.x;
    this.body.y = pointer.y;

    let x = this.startPos.x - this.body.x;
    let y = this.startPos.y - this.body.y;
    let dist = Math.sqrt(x * x + y * y);

    if (dist > 10)
    {
        let angle = Math.atan2(this.startPos.y - this.y, this.startPos.x - this.x) / (Math.PI / 180);
        this.body.angle = angle + 90;
    }
}

Ball.prototype.dragStop = function()
{
    this.body.dynamic = true;
    this.input.enabled = false;

    let x = (this.startPos.x - this.body.x) * this.throwSpeed;
    let y = (this.startPos.y - this.body.y) * this.throwSpeed;

    this.body.velocity.x = x;
    this.body.velocity.y = y;
}
