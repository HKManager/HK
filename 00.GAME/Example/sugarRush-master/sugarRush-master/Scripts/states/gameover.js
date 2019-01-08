/**
 *  File: gameover.ts
 *  Author: Haden Hiles
 *  Last Modified By: Haden Hiles
 *  Date Last Modified: November 14th
 *  Description:
 *  This class is responsible for displaying the game over screen text
 *  along with their score when the user loses the game.
 */
///<reference path="../../js/createjs-lib.d.ts"/>
///<reference path="../../js/easeljs.d.ts"/>
///<reference path="../../js/preloadjs.d.ts"/>
///<reference path="../../js/soundjs.d.ts"/>
///<reference path="../objects/background.ts"/>
///<reference path="../game.ts"/>
var states;
(function (states) {
    function gameOverState() {
        //        background.update();
    }
    states.gameOverState = gameOverState;
    // Restart Game when Try Again Button is clicked
    function tryAgainClicked(event) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = constants.PLAY_STATE;
        changeState(currentState);
    }
    states.tryAgainClicked = tryAgainClicked;
    // Game Over Scene
    function gameOver() {
        //Local Variables
        var gameOverLabel;
        var finalScoreLabel;
        var finalScore;
        // Declare new Game Container
        game = new createjs.Container();
        // Instantiate Game Objects
        background = new objects.Background(stage, game);
        // Show Cursor
        stage.cursor = "default";
        // Display Game Over
        gameOverLabel = new objects.Label(stage.canvas.width / 2, 40, "NICE RUSH!");
        game.addChild(gameOverLabel);
        // Display Final Score Label
        finalScoreLabel = new objects.Label(stage.canvas.width / 2, 120, "YOUR SCORE:");
        game.addChild(finalScoreLabel);
        // Display Final Score
        finalScore = new objects.Label(stage.canvas.width / 2, 160, scoreboard.score.toString());
        game.addChild(finalScore);
        // Display Try Again Button
        tryAgain = new objects.Button(stage.canvas.width / 2, 240, "tryAgainButton");
        game.addChild(tryAgain);
        tryAgain.addEventListener("click", tryAgainClicked);
        stage.addChild(game);
    }
    states.gameOver = gameOver;
})(states || (states = {}));
//# sourceMappingURL=gameover.js.map