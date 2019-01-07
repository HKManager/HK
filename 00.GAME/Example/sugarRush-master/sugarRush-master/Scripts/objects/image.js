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
///<reference path="../managers/asset.ts"/>
///<reference path="collidableSprite.ts"/>
var objects;
(function (objects) {
    // Character Class
    var Image = (function () {
        function Image(stage, game, image) {
            var _this = this;
            Object.defineProperty(this, "image", {
                set: function (image) {
                    stage.removeChild(_this._image);
                    _this._image = image;
                    stage.addChild(_this._image);
                },
                get: function () {
                    return _this._image;
                }
            });
            Object.defineProperty(this, "parent", {
                get: function () {
                    return _this._image.parent;
                }
            });
            //Define the x coordinate
            Object.defineProperty(this, "x", {
                set: function (xValue) {
                    _this._image.x = xValue;
                },
                get: function () {
                    return _this.image.x;
                }
            });
            //Define the y coordinate
            Object.defineProperty(this, "y", {
                set: function (yValue) {
                    _this._image.y = yValue;
                },
                get: function () {
                    return _this.image.y;
                }
            });
            //Define the width of the image
            Object.defineProperty(this, "height", {
                get: function () {
                    return _this.image.getTransformedBounds().height;
                }
            });
            //Define the height of the image
            Object.defineProperty(this, "width", {
                get: function () {
                    return _this.image.getTransformedBounds().width;
                }
            });
            Object.defineProperty(this, "scaleX", {
                set: function (scaleXValue) {
                    _this.image.scaleX = scaleXValue;
                },
                get: function () {
                    return _this.image.scaleX;
                }
            });
            Object.defineProperty(this, "scaleY", {
                set: function (scaleYValue) {
                    _this.image.scaleY = scaleYValue;
                },
                get: function () {
                    return _this.image.scaleY;
                }
            });
            Object.defineProperty(this, "regX", {
                set: function (regXValue) {
                    _this.image.regX = regXValue;
                },
                get: function () {
                    return _this.image.regX;
                }
            });
            Object.defineProperty(this, "regY", {
                set: function (regYValue) {
                    _this.image.regY = regYValue;
                },
                get: function () {
                    return _this._image.regY;
                }
            });
            Object.defineProperty(this, "rotation", {
                set: function (rotationValue) {
                    _this._image.rotation = rotationValue;
                },
                get: function () {
                    return _this._image.rotation;
                }
            });
            Object.defineProperty(this, "collissionEnabled", {
                set: function (value) {
                    if (_this._image instanceof objects.CollidableSprite) {
                        _this._image.collissionEnabled = value;
                    }
                },
                get: function () {
                    if (_this._image instanceof objects.CollidableSprite) {
                        return _this._image.collissionEnabled;
                    }
                }
            });
            this.stage = stage;
            this.game = game;
            this._image = image;
            if (!image) {
                this._image = new objects.CollidableSprite(managers.Assets.candy, managers.Assets.candy[0]);
            }
            game.addChild(this._image);
        }
        //Update the position of the character according to the mouse position
        Image.prototype.update = function () {
            this.moveImage();
        };
        Image.prototype.moveImage = function () {
        };
        Image.prototype.localToGlobal = function (x, y) {
            return this.image.localToGlobal(x, y);
        };
        Image.prototype.getTransformedBounds = function () {
            return this.image.getTransformedBounds();
        };
        Image.prototype.getBounds = function () {
            return this.image.getBounds();
        };
        //remove the character
        Image.prototype.destroy = function () {
            this.game.removeChild(this._image);
        };
        Image.prototype.disableCollissionForDuration = function (milliseconds) {
            if (milliseconds === void 0) { milliseconds = 1000; }
            this._image.disabledCollissionForDuration(milliseconds);
        };
        return Image;
    })();
    objects.Image = Image;
})(objects || (objects = {}));
//# sourceMappingURL=image.js.map