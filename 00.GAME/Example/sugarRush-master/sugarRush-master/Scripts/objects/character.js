/**
 *  File: character.ts
 *  Author: Haden Hiles
 *  Last Modified By: Haden Hiles
 *  Date Last Modified: November 14th
 *  Description:
 *  This class is where the main character is created and moved
 *  around the screen according to the user's mouse position
 *  on the canvas
 */
///<reference path="../../js/createjs-lib.d.ts"/>
///<reference path="../../js/easeljs.d.ts"/>
///<reference path="../../js/preloadjs.d.ts"/>
///<reference path="../../js/soundjs.d.ts"/>
///<reference path="image.ts"/>
///<reference path="../managers/asset.ts"/>
///<reference path="collidableSprite.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // Character Class
    var Character = (function (_super) {
        __extends(Character, _super);
        function Character(stage, game) {
            _super.call(this, stage, game, new objects.CollidableSprite(managers.Assets.atlas, "candy-craver"));
            this.line = new createjs.Shape();
            //            this.lineColor = createjs.Graphics.getRGB(0xFFFFFF * Math.random(), 1);
            this.lineColor = createjs.Graphics.getRGB(166, 214, 231);
            this.line.graphics.setStrokeStyle(8, "round", "round");
            game.addChild(this.line);
            this.x = 100;
            this.y = 220;
            this.scaleX = .5;
            this.scaleY = .5;
            this.regX = this.width / 2 - 10;
            this.regY = this.height / 2 + 20;
            this.soundTrack = createjs.Sound.play('candypump', createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
        }
        //Update the position of the character according to the mouse position
        Character.prototype.update = function () {
            this.linePosX = this.x;
            this.linePosY = this.y;
            this.line.graphics.beginStroke(this.lineColor);
            this.line.graphics.moveTo(this.linePosX - 15, this.linePosY);
            this.line.graphics.lineTo(this.x - 15, this.y);
            this.line.graphics.endStroke();
            _super.prototype.update.call(this);
        };
        Character.prototype.moveImage = function () {
            var speed = 7;
            if (this.x < this.stage.mouseX + speed) {
                this.x += speed;
            }
            if (this.x > this.stage.mouseX - speed) {
                this.x -= speed;
            }
            if (this.y < this.stage.mouseY + speed) {
                this.y += speed;
            }
            if (this.y > this.stage.mouseY - speed) {
                this.y -= speed;
            }
        };
        //remove the character
        Character.prototype.destroy = function () {
            this.soundTrack.stop();
            this.game.removeChild(this.line);
            //            super.destroy();
        };
        return Character;
    })(objects.Image);
    objects.Character = Character;
})(objects || (objects = {}));
//# sourceMappingURL=character.js.map