/**
 *  File: game.ts
 *  Author: Haden Hiles
 *  Last Modified By: Haden Hiles
 *  Date Last Modified: November 14th
 *  Description:
 *  This class is responsible for initializing all objects
 *  as well as, creating the game loop, bringing in assets,
 *  optimizing for mobile touch screens and triggering what
 *  state the game is in.
 */
///<reference path="../js/createjs-lib.d.ts"/>
///<reference path="../js/easeljs.d.ts"/>
///<reference path="../js/preloadjs.d.ts"/>
///<reference path="../js/soundjs.d.ts"/>
///<reference path="constants.ts"/>
///<reference path="filters/scale.ts"/>
///<reference path="states/menu.ts"/>
///<reference path="states/play.ts"/>
///<reference path="states/gameover.ts"/>
///<reference path="managers/collision.ts"/>
///<reference path="managers/groupManager.ts"/>
///<reference path="objects/background.ts"/>
///<reference path="objects/rotatingGroup.ts"/>
///<reference path="objects/button.ts"/>
///<reference path="objects/candy.ts"/>
///<reference path="objects/character.ts"/>
///<reference path="objects/image.ts"/>
///<reference path="objects/instructions.ts"/>
///<reference path="objects/label.ts"/>
///<reference path="objects/movingImage.ts"/>
///<reference path="objects/scoreboard.ts"/>
var stage: createjs.Stage;
var game: createjs.Container;

var rotatingGroup: objects.RotatingGroup;
var greenRotatingGroup: objects.RotatingGroup;
var background: objects.Background;
var character: objects.Character;
var candy: objects.Candy;
var veggies = []; // Veggies array;
var candies = []; // Candy array;
var scoreboard: objects.Scoreboard;

var obstacleManager: managers.ObstacleManager;
var candyCollisionManager: managers.Collision;
var veggieCollisionManager: managers.Collision;
var veggieGroupCollisionManager: managers.Collision;
var groupManager: managers.GroupManager;

var tryAgain: objects.Button;
var playButton: objects.Button;

var currentState: number;
var currentStateFunction;

var keys = {};
var muteButton: objects.Button;

//Preload function - Loads Assets and initializes game
function preload(): void {
    managers.Assets.init();
    managers.Assets.loader.addEventListener("complete", init);
}

//init called after Assets have been loaded.
function init(): void {
    stage = new createjs.Stage(document.getElementById("canvas"));
    stage.enableMouseOver(30);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);
    optimizeForMobile();

    currentState = constants.MENU_STATE;
    changeState(currentState);

    //Reference keydown and keyup events
    this.document.onkeydown = keydown;
    this.document.onkeyup = keyup;
}

//Add touch support for mobile devices
function optimizeForMobile() {
    if (createjs.Touch.isSupported()) {
        createjs.Touch.enable(stage);
    }
}

//Initialize keydown and keyup events for volume toggle
function keydown(event) {
    keys[event.keyCode] = true;
}
function keyup(event) {
    delete keys[event.keyCode];
}

//Swap the image for the volume icon
function muteButtonClicked(event){
    if(createjs.Sound.getVolume() == 1){
        createjs.Sound.setVolume(0);
        stage.removeChild(muteButton);
        muteButton = new objects.Button(850, 30, "not-mute");
        stage.addChild(muteButton);
        muteButton.addEventListener("click", muteButtonClicked);
    } else if(createjs.Sound.getVolume() == 0){
        createjs.Sound.setVolume(1);
        stage.removeChild(muteButton);
        muteButton = new objects.Button(850, 30, "mute");
        stage.addChild(muteButton);
        muteButton.addEventListener("click", muteButtonClicked);
    }
}

//This is the main game loop
function gameLoop(event): void {
    currentStateFunction();

    //Toggle the volume depending on what arrow is pressed (down or up)
    if (keys[40]){
        createjs.Sound.setVolume(0);
        stage.removeChild(muteButton);
        muteButton = new objects.Button(850, 30, "not-mute");
        stage.addChild(muteButton);
        muteButton.addEventListener("click", muteButtonClicked);
    }
    if (keys[38]){
        createjs.Sound.setVolume(1);
        stage.removeChild(muteButton);
        muteButton = new objects.Button(850, 30, "mute");
        stage.addChild(muteButton);
        muteButton.addEventListener("click", muteButtonClicked);
    }
    stage.update();
}

//Change the state of the game between menu, plau, and game over
function changeState(state: number): void {
    // Launch Various "screens"
    switch (state) {
        case constants.MENU_STATE:
            // instantiate menu screen
            currentStateFunction = states.menuState;
            states.menu();
            if(createjs.Sound.getVolume() == 1){
                stage.removeChild(muteButton);
                muteButton = new objects.Button(850, 30, "mute");
                stage.addChild(muteButton);
                muteButton.addEventListener("click", muteButtonClicked);
            } else{
                stage.removeChild(muteButton);
                muteButton = new objects.Button(850, 30, "not-mute");
                stage.addChild(muteButton);
                muteButton.addEventListener("click", muteButtonClicked);
            }
            break;

        case constants.PLAY_STATE:
            // instantiate play screen
            currentStateFunction = states.playState;
            states.play();
            if(createjs.Sound.getVolume() == 1){
                stage.removeChild(muteButton);
                muteButton = new objects.Button(850, 30, "mute");
                stage.addChild(muteButton);
                muteButton.addEventListener("click", muteButtonClicked);
            } else{
                stage.removeChild(muteButton);
                muteButton = new objects.Button(850, 30, "not-mute");
                stage.addChild(muteButton);
                muteButton.addEventListener("click", muteButtonClicked);
            }
            break;

        case constants.GAME_OVER_STATE:
            currentStateFunction = states.gameOverState;
            // instantiate game over screen
            states.gameOver();
            if(createjs.Sound.getVolume() == 1){
                stage.removeChild(muteButton);
                muteButton = new objects.Button(850, 30, "mute");
                stage.addChild(muteButton);
                muteButton.addEventListener("click", muteButtonClicked);
            } else{
                stage.removeChild(muteButton);
                muteButton = new objects.Button(850, 30, "not-mute");
                stage.addChild(muteButton);
                muteButton.addEventListener("click", muteButtonClicked);
            }
            break;
    }
}




