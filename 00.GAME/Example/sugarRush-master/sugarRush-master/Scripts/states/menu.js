/**
 *  File: menu.ts
 *  Author: Haden Hiles
 *  Last Modified By: Haden Hiles
 *  Date Last Modified: November 14th
 *  Description:
 *  This class is responsible for displaying the game title,
 *  instructions for the game, and a play button that starts the game
 */
var states;
(function (states) {
    function playButtonClicked(event) {
        stage.removeChild(game);
        character.destroy();
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = constants.PLAY_STATE;
        changeState(currentState);
    }
    states.playButtonClicked = playButtonClicked;
    function menuState() {
        //        character.update();
    }
    states.menuState = menuState;
    function menu() {
        var gameNameLabel;
        var gameInstructions;
        //Declare new Game Container
        game = new createjs.Container();
        //Instantiate Game Objects
        background = new objects.Background(stage, game);
        character = new objects.Character(stage, game);
        //Show Cursor
        stage.cursor = "default";
        // Display Game Title
        gameNameLabel = new objects.Label(stage.canvas.width / 2, 120, "Sugar Rush");
        game.addChild(gameNameLabel);
        // Display Play Button
        playButton = new objects.Button(stage.canvas.width / 2, 320, "playButton");
        game.addChild(playButton);
        playButton.addEventListener("click", playButtonClicked);
        // Display Instructions
        gameInstructions = new objects.Instructions(stage.canvas.width / 2, stage.canvas.height / 2, "1. Last as long as you can before you run out of sugar!\n" + "2. Your sugar meter decreases over time.\n" + "3. Eating Veggies reduces your sugar meter.\n" + "4. Eating Candy boosts your sugar meter.");
        game.addChild(gameInstructions);
        stage.addChild(game);
    }
    states.menu = menu;
})(states || (states = {}));
//# sourceMappingURL=menu.js.map