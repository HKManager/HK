/**
 *  File: scoreboard.ts
 *  Author: Haden Hiles
 *  Last Modified By: Haden Hiles
 *  Date Last Modified: November 14th
 *  Description:
 *  This class is responsible for displaying the scoreboard
 *  at the top of the screen while the game is being played
 */
///<reference path="../../js/createjs-lib.d.ts"/>
///<reference path="../../js/easeljs.d.ts"/>
///<reference path="../../js/preloadjs.d.ts"/>
///<reference path="../../js/soundjs.d.ts"/>
///<reference path="../constants.ts"/>
///<reference path="../game.ts"/>
var objects;
(function (objects) {
    //Scoreboard Class
    var Scoreboard = (function () {
        function Scoreboard(stage, game) {
            this.labelText = "";
            this.sugarMeterText = "";
            this.stage = stage;
            this.game = game;
            this.lives = constants.LIVES;
            this.score = 0;
            this.sugarMeterWidth = 100;
            this.sugarMeterColor = "#B1C243";
            this.label = new createjs.Text(this.labelText, constants.LABEL_FONT, constants.LABEL_COLOUR);
            this.label.x = 455;
            this.sugarMeterLabel = new createjs.Text(this.sugarMeterText, constants.LABEL_FONT, constants.LABEL_COLOUR);
            this.update();
            this.width = this.label.getBounds().width + this.sugarMeterLabel.getBounds().width;
            this.height = this.label.getBounds().height + this.sugarMeterLabel.getBounds().height;
            game.addChild(this.label);
            game.addChild(this.sugarMeterLabel);
            //Sugar Meter outline box
            this.sugarLevelBoxOutline = new createjs.Graphics();
            this.sugarLevelBoxOutline.setStrokeStyle(1);
            this.sugarLevelBoxOutline.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
            this.sugarLevelBoxOutline.drawRect(0, 0, 200, 35);
            this.sugarMeterOutline = new createjs.Shape(this.sugarLevelBoxOutline);
            this.sugarMeterOutline.x = 245;
            this.sugarMeterOutline.y = 5;
            this.game.addChild(this.sugarMeterOutline);
        }
        //Update the scoreboard content
        Scoreboard.prototype.update = function () {
            this.sugarMeterText = "Sugar Meter: ";
            this.sugarMeterLabel.text = this.sugarMeterText;
            this.labelText = "Score: " + this.score.toString();
            this.label.text = this.labelText;
            //Sugar Meter box
            this.game.removeChild(this.sugarMeter);
            this.sugarLevelBox = new createjs.Graphics();
            this.sugarLevelBox.beginFill(this.sugarMeterColor);
            this.sugarLevelBox.drawRect(0, 0, this.sugarMeterWidth, 35);
            this.sugarMeter = new createjs.Shape(this.sugarLevelBox);
            this.sugarMeter.x = 245;
            this.sugarMeter.y = 5;
            game.addChild(this.sugarMeter);
        };
        //Remove the scoreboard from the game
        Scoreboard.prototype.destroy = function () {
            game.removeChild(this.label);
            game.removeChild(this.sugarMeterLabel);
            game.removeChild(this.sugarMeter);
        };
        return Scoreboard;
    })();
    objects.Scoreboard = Scoreboard;
})(objects || (objects = {}));
//# sourceMappingURL=scoreboard.js.map