/**
 *  File: ObstacleManager.ts
 *  Author: Haden Hiles
 *  Last Modified By: Haden Hiles
 *  Date Last Modified: November 14th
 *  Description:
 *  This class is responsible for controlling, when and
 *  how many obstacles to place on the screen at any given time
 */
///<reference path="../objects/movingImage.ts"/>
///<reference path="../../js/createjs-lib.d.ts"/>
///<reference path="../../js/easeljs.d.ts"/>
///<reference path="../../js/preloadjs.d.ts"/>
///<reference path="../../js/soundjs.d.ts"/>
///<reference path="../objects/collidableSprite.ts"/>
var managers;
(function (managers) {
    // Collision Manager Class
    var ObstacleManager = (function () {
        function ObstacleManager(stage, game, spriteSheet, newDisplayObjectCallback) {
            var _this = this;
            this.displayObjectsCreated = 0;
            this.tickCount = 0;
            Object.defineProperty(this, "spriteSheet", {
                set: function (sheet) {
                    _this._spriteSheet = sheet;
                    _this._animationNames = sheet.getAnimations();
                },
                get: function () {
                    return _this._spriteSheet;
                }
            });
            this.stage = stage;
            this.game = game;
            this._spriteSheet = spriteSheet;
            this._animationNames = spriteSheet.getAnimations();
            this.newDisplayObjectCallback = newDisplayObjectCallback;
            this.addDisplayObjectProxy = function (tickEvent) {
                _this.addDisplayObject.apply(_this, tickEvent);
            };
            createjs.Ticker.addEventListener("tick", this.addDisplayObjectProxy);
        }
        //Control the number of display objects that are added to the screen
        ObstacleManager.prototype.addDisplayObject = function (tickEvent) {
            //Gather random sprites from the veggies spritesheet
            if (this.tickCount++ > 0 && this.tickCount % 60 == 0) {
                var randomAnimationIdx = Math.floor(Math.random() * (this._animationNames.length + 1));
                var image = new objects.CollidableSprite(this._spriteSheet, this._animationNames[randomAnimationIdx]);
                var o = new objects.MovingImage(this.stage, this.game, image);
                this.displayObjectsCreated++;
                this.newDisplayObjectCallback(o);
                this.tickCount = 0;
            }
            //Only allow a max of 20 display objects to be on the stage at any given time
            if (this.displayObjectsCreated >= 5) {
                createjs.Ticker.removeEventListener("tick", this.addDisplayObjectProxy);
            }
        };
        //Stop adding obstacles to the game
        ObstacleManager.prototype.destroy = function () {
            createjs.Ticker.removeEventListener("tick", this.addDisplayObjectProxy);
        };
        return ObstacleManager;
    })();
    managers.ObstacleManager = ObstacleManager;
})(managers || (managers = {}));
//# sourceMappingURL=ObstacleManager.js.map