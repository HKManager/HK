// ------------------------------------------------------------------------------------------------
//
//                                             Turtle Ball!
//
//                                     Developed by Baptiste Ménard
//
// ------------------------------------------------------------------------------------------------

let game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'world', {preload: preload, create: create, render: render});
let gameManager;

function preload()
{
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    game.load.image('ball', '../bin/assets/ball.png');
    game.load.image('basket', '../bin/assets/basket.png');
}

function create()
{
    gameManager = new GameManager();
    gameManager.create();
}

function render()
{
    if (gameManager != null) {
        gameManager.render();
    }
}
