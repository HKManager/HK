/**
*  File: play.ts
*  Author: Haden Hiles
*  Last Modified By: Haden Hiles
*  Date Last Modified: November 14th
*  Description:
*  This class is where the actual game itself is played.
*  Score/Sugar Meter updates are triggered here, as well as
*  collision detection and obstacle management
*/
///<reference path="../../js/createjs-lib.d.ts"/>
///<reference path="../../js/easeljs.d.ts"/>
///<reference path="../../js/preloadjs.d.ts"/>
///<reference path="../../js/soundjs.d.ts"/>
///<reference path="../game.ts"/>
///<reference path="../objects/background.ts"/>
///<reference path="../objects/character.ts"/>
///<reference path="../objects/candy.ts"/>
///<reference path="../objects/movingImage.ts"/>
///<reference path="../objects/image.ts"/>
///<reference path="../objects/rotatingGroup.ts"/>
///<reference path="../objects/scoreboard.ts"/>
///<reference path="../objects/collidableSprite.ts"/>
///<reference path="../managers/collision.ts"/>
///<reference path="../managers/ObstacleManager.ts"/>
///<reference path="../managers/groupManager.ts"/>
///<reference path="../filters/scale.ts"/>
var states;
(function (states) {
    function playState() {
        background.update();
        candy.update();
        character.update();
        for (var count = 0; count < veggies.length; count++) {
            veggies[count].update();
        }
        candyCollisionManager.update();
        veggieCollisionManager.update();
        veggieGroupCollisionManager.update();
        scoreboard.update();
        //Determine when the game is over
        if (scoreboard.lives <= 0) {
            stage.removeChild(game);
            character.destroy();
            obstacleManager.destroy();
            game.removeAllChildren();
            game.removeAllEventListeners();
            currentState = constants.GAME_OVER_STATE;
            changeState(currentState);
        }
        //Add the score according to the frames per second
        scoreboard.score += 1;
        //Subtract lives/reduce sugar meter over time
        if (scoreboard.score % 400 == 0) {
            if (scoreboard.sugarMeterWidth <= 80) {
                scoreboard.sugarMeterColor = "#FE0000";
            }
            else {
                scoreboard.sugarMeterColor = "#B1C243";
            }
            scoreboard.lives -= 0.5;
            if (scoreboard.sugarMeterWidth >= 5) {
                scoreboard.sugarMeterWidth -= 5;
            }
            else if (scoreboard.sugarMeterWidth > 0) {
                scoreboard.sugarMeterWidth = 0;
            }
        }
        rotatingGroup.rotate();
        groupManager.update();
    }
    states.playState = playState;
    //Main loop of the play class
    function play() {
        // Declare new Game Container
        game = new createjs.Container();
        // Instantiate Game Objects
        background = new objects.Background(stage, game);
        character = new objects.Character(stage, game);
        candy = new objects.Candy(stage, game);
        // Red pepper Rotating Group objects
        var redPepperSprite1 = new objects.CollidableSprite(managers.Assets.veggies, "red-pepper");
        var redPepperSprite2 = new objects.CollidableSprite(managers.Assets.veggies, "red-pepper");
        var redPepperSprite3 = new objects.CollidableSprite(managers.Assets.veggies, "red-pepper");
        var redPepperSprite4 = new objects.CollidableSprite(managers.Assets.veggies, "red-pepper");
        var redPeppers = [redPepperSprite1, redPepperSprite2, redPepperSprite3, redPepperSprite4];
        rotatingGroup = new objects.RotatingGroup(redPeppers);
        groupManager = new managers.GroupManager(stage, game, [rotatingGroup]);
        //Instantiate Collision Manager for character and images withing rotating group
        veggieGroupCollisionManager = new managers.Collision([character], rotatingGroup.images, function (object1, object2) {
            //Update the lives and Sugar Meter accordingly
            if (scoreboard.lives >= 0) {
                if (scoreboard.sugarMeterWidth <= 80) {
                    scoreboard.sugarMeterColor = "#FE0000";
                }
                else {
                    scoreboard.sugarMeterColor = "#B1C243";
                }
                scoreboard.lives -= 1;
            }
            if (scoreboard.sugarMeterWidth >= 10) {
                scoreboard.sugarMeterWidth -= 10;
            }
            else if (scoreboard.sugarMeterWidth > 0) {
                scoreboard.sugarMeterWidth = 0;
            }
            createjs.Sound.play("ew");
            // Prevent duplicate collisions by disabling collision detection for a second
            object2.disableCollissionForDuration(750);
        });
        // Hide Cursor
        stage.cursor = "default";
        //Pass through each veggie from the veggie collection of sprites
        veggies = [];
        obstacleManager = new managers.ObstacleManager(stage, game, managers.Assets.veggies, function (displayObject) {
            var idx = veggies.length;
            veggies[idx] = displayObject;
        });
        //Instantiate Collision Manager for character and candy
        candyCollisionManager = new managers.Collision([character], [candy], function (object1, object2) {
            //Update the lives and Sugar Meter accordingly
            if (scoreboard.lives < 20) {
                if (scoreboard.sugarMeterWidth <= 80) {
                    scoreboard.sugarMeterColor = "#FE0000";
                }
                else {
                    scoreboard.sugarMeterColor = "#B1C243";
                }
                scoreboard.lives += 1;
            }
            if (scoreboard.sugarMeterWidth <= 190) {
                scoreboard.sugarMeterWidth += 10;
            }
            else if (scoreboard.sugarMeterWidth < 200) {
                scoreboard.sugarMeterWidth = scoreboard.sugarMeterWidth + (200 - scoreboard.sugarMeterWidth);
            }
            object2.reset();
            createjs.Sound.play("slurp");
        });
        //Instantiate Collision Manager for character and veggies
        veggieCollisionManager = new managers.Collision([character], veggies, function (object1, object2) {
            //Update the lives and Sugar Meter accordingly
            if (scoreboard.lives >= 0) {
                if (scoreboard.sugarMeterWidth <= 80) {
                    scoreboard.sugarMeterColor = "#FE0000";
                }
                else {
                    scoreboard.sugarMeterColor = "#B1C243";
                }
                scoreboard.lives -= 1;
            }
            if (scoreboard.sugarMeterWidth >= 10) {
                scoreboard.sugarMeterWidth -= 10;
            }
            else if (scoreboard.sugarMeterWidth > 0) {
                scoreboard.sugarMeterWidth = 0;
            }
            object2.reset();
            createjs.Sound.play("ew");
        });
        //Display the Scoreboard
        scoreboard = new objects.Scoreboard(stage, game);
        stage.addChild(game);
    }
    states.play = play;
})(states || (states = {}));
//# sourceMappingURL=play.js.map