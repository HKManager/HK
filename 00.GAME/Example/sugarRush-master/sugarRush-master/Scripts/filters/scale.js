/**
 * Created with IntelliJ IDEA.
 * User: HandsHiles
 * Date: 14-12-04
 * Time: 6:56 PM
 * To change this template use File | Settings | File Templates.
 */
///<reference path="../../js/createjs-lib.d.ts"/>
///<reference path="../../js/easeljs.d.ts"/>
///<reference path="../../js/preloadjs.d.ts"/>
///<reference path="../../js/soundjs.d.ts"/>
var filters;
(function (filters) {
    var Scale = (function () {
        function Scale() {
            var _this = this;
            this._scaleX = 1;
            this._scaleY = 1;
            this._scaleWidth = .85;
            this._scaleHeight = .85;
            Object.defineProperty(this, "original", {
                set: function (value) {
                    _this._original = value;
                },
                get: function () {
                    return _this._original;
                }
            });
            Object.defineProperty(this, "parent", {
                get: function () {
                    return _this._original.parent;
                }
            });
            Object.defineProperty(this, "scaleWidth", {
                set: function (value) {
                    _this._scaleWidth = value;
                },
                get: function () {
                    return _this._scaleWidth;
                }
            });
            Object.defineProperty(this, "scaleHeight", {
                set: function (value) {
                    _this._scaleHeight = value;
                },
                get: function () {
                    return _this._scaleHeight;
                }
            });
        }
        Scale.prototype.getTransformedBounds = function () {
            var bounds = this._original.getTransformedBounds();
            var newRectangle = new createjs.Rectangle(bounds.x * this._scaleX, bounds.y * this._scaleY, bounds.width * this._scaleWidth, bounds.height * this._scaleHeight);
            return newRectangle;
        };
        Scale.prototype.localToGlobal = function (x, y) {
            return this._original.parent.localToGlobal(x, y);
        };
        return Scale;
    })();
    filters.Scale = Scale;
})(filters || (filters = {}));
//# sourceMappingURL=scale.js.map