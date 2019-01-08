var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created with IntelliJ IDEA.
 * User: HandsHiles
 * Date: 14-12-13
 * Time: 6:06 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 *  File: character.ts
 *  Author: Haden Hiles
 *  Last Modified By: Haden Hiles
 *  Date Last Modified: November 14th
 *  Description:
 *  A collidableSprite can be collission enabled, providing for alternate collision management.
 */
///<reference path="../../js/createjs-lib.d.ts"/>
///<reference path="../../js/easeljs.d.ts"/>
///<reference path="../../js/preloadjs.d.ts"/>
///<reference path="../../js/soundjs.d.ts"/>
///<reference path="../managers/asset.ts"/>
var objects;
(function (objects) {
    var CollidableSprite = (function (_super) {
        __extends(CollidableSprite, _super);
        function CollidableSprite(spriteSheet, frameOrAnimation) {
            var _this = this;
            _super.call(this, spriteSheet, frameOrAnimation);
            this._collissionEnabled = true;
            Object.defineProperty(this, "collissionEnabled", {
                set: function (value) {
                    _this._collissionEnabled = value;
                },
                get: function () {
                    return _this._collissionEnabled;
                }
            });
        }
        CollidableSprite.prototype.disableCollissionForDuration = function (milliseconds) {
            if (milliseconds === void 0) { milliseconds = 1000; }
            this._collissionEnabled = false;
            this.alpha = .5;
            var __this = this;
            setTimeout(function () {
                __this._collissionEnabled = true;
                __this.alpha = 1;
            }, milliseconds);
        };
        return CollidableSprite;
    })(createjs.Sprite);
    objects.CollidableSprite = CollidableSprite;
})(objects || (objects = {}));
//# sourceMappingURL=collidableSprite.js.map