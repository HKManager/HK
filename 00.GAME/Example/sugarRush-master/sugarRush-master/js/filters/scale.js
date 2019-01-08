/**
 * Created with IntelliJ IDEA.
 * User: HandsHiles
 * Date: 14-12-04
 * Time: 6:56 PM
 * To change this template use File | Settings | File Templates.
 */
var filters;
(function (filters) {
    var Scale = (function () {
        function Scale() {
            var _this = this;
            this._original = null;
            this._scaleX = 1;
            this._scaleY = 1;
            this._scaleWidth = .95;
            this._scaleHeight = .9;
            Object.defineProperty(this, "original", {
                set: function (original) {
                    _this._original = original;
                },
                get: function () {
                    return _this._original;
                }
            });
            Object.defineProperty(this, "x", {
                get: function () {
                    return _this._original.x * _this._scaleX;
                }
            });
            Object.defineProperty(this, "y", {
                get: function () {
                    return _this._original.y * _this._scaleY;
                }
            });
            Object.defineProperty(this, "height", {
                get: function () {
                    return _this._original.height + _this._scaleHeight;
                }
            });
            Object.defineProperty(this, "width", {
                get: function () {
                    return _this._original.width + _this._scaleWidth;
                }
            });
        }
        Scale.prototype.localToGlobal = function (x, y) {
            return this._original.localToGlobal(x, y);
        };
        return Scale;
    })();
    filters.Scale = Scale;
})(filters || (filters = {}));
//# sourceMappingURL=scale.js.map