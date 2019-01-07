/**
 *  File: collision.ts
 *  Author: Haden Hiles
 *  Last Modified By: Haden Hiles
 *  Date Last Modified: November 14th
 *  Description:
 *  This class is used to detect collisions between two display objects.
 *  It detects collisions between two rectangular display objects and applies
 *  a "filter" to make the game more playable (makes collision objects smaller than actual objects)
 */
///<reference path="../../js/createjs-lib.d.ts"/>
///<reference path="../../js/easeljs.d.ts"/>
///<reference path="../../js/preloadjs.d.ts"/>
///<reference path="../../js/soundjs.d.ts"/>
///<reference path="../filters/scale.ts"/>
///<reference path="../objects/collidableSprite.ts"/>
var managers;
(function (managers) {
    // Collision Manager Class
    var Collision = (function () {
        function Collision(displayObjectSet1, displayObjectSet2, collisionHandler) {
            var _this = this;
            // class variables
            this.displayObjectSet1 = [];
            this.displayObjectSet2 = [];
            this._enabled = true;
            Object.defineProperty(this, "enabled", {
                set: function (enabledValue) {
                    _this._enabled = enabledValue;
                },
                get: function () {
                    return _this._enabled;
                }
            });
            this.displayObjectSet1 = displayObjectSet1;
            this.displayObjectSet2 = displayObjectSet2;
            this.collisionHandlerCallback = collisionHandler;
        }
        //Get the min and max values of 2 objects and pass them through the rangeIntersect method to determine if there is overlap
        Collision.prototype.rectIntersect = function (rectangleA, rectangleB) {
            //            console.log("Object A: " + rectangleA + ", Object B: " + rectangleB);
            return this.rangeIntersect(rectangleA.x, rectangleA.x + rectangleA.width, rectangleB.x, rectangleB.x + rectangleB.width) && this.rangeIntersect(rectangleA.y, rectangleA.y + rectangleA.height, rectangleB.y, rectangleB.y + rectangleB.height);
        };
        //Determine whethere there is an overlap with the two display objects or not
        Collision.prototype.rangeIntersect = function (rangeAMin, rangeAMax, rangeBMin, rangeBMax) {
            return Math.max(rangeAMin, rangeAMax) >= Math.min(rangeBMin, rangeBMax) && Math.min(rangeAMin, rangeAMax) <= Math.max(rangeBMin, rangeBMax);
        };
        Collision.prototype.pauseForDuration = function (milliseconds) {
            if (milliseconds === void 0) { milliseconds = 1000; }
            this._enabled = false;
            var __this = this;
            setTimeout(function () {
                __this._enabled = true;
            }, milliseconds);
        };
        //loop through both object collections and check for a collision with each item in a collection (ex. veggies)
        Collision.prototype.update = function () {
            if (this._enabled) {
                // We need to fake the object dimensions to improve perceived collisions.
                var scaledObjectA = new filters.Scale();
                var scaledObjectB = new filters.Scale();
                for (var idx1 = 0; idx1 < this.displayObjectSet1.length; idx1++) {
                    for (var idx2 = 0; idx2 < this.displayObjectSet2.length; idx2++) {
                        scaledObjectA.original = this.displayObjectSet1[idx1];
                        scaledObjectB.original = this.displayObjectSet2[idx2];
                        if (scaledObjectA.original.collissionEnabled && scaledObjectB.original.collissionEnabled) {
                            if (this.rectIntersect(this.getTransformedRectangle(scaledObjectA), this.getTransformedRectangle(scaledObjectB))) {
                                this.collisionHandlerCallback(scaledObjectA.original, scaledObjectB.original);
                            }
                        }
                    }
                }
            }
        };
        Collision.prototype.getTransformedRectangle = function (displayObject) {
            var bounds = displayObject.getTransformedBounds();
            var globalOrigin = displayObject.parent.localToGlobal(bounds.x, bounds.y);
            bounds.x = globalOrigin.x;
            bounds.y = globalOrigin.y;
            return bounds;
        };
        return Collision;
    })();
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map