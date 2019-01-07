Basket = function() {}

Basket.prototype = Object.create(Phaser.Sprite.prototype);
Basket.prototype.constructor = Basket;

Basket.prototype.create = function(x, y)
{
    this.basket = baskets.create(x, y, 'basket');
    this.basket.anchor.setTo(0, 0);
    this.initWidth = this.basket.width;
    this.basket.width = game.world.width / 5;
    this.basket.height = (this.basket.height * this.basket.width) / this.initWidth;

    this.basket.body.setCollisionGroup(basketCollisionGroup);
    this.basket.body.collides(ballCollisionGroup);
    this.basket.body.dynamic = false;
}

Basket.prototype.render = function()
{
}
