function StateManager() {

    var state = {},
        next = null,
        active = null,
        anim = 0,
        right = false;

    this.active_name = null;
    this.pre_name = null;

    this.add = function () {
        for (var i = arguments.length; i--;) {
            var arg = arguments[i];
            state[arg.name] = arg;
        }
    };

    this.set = function (name) {
        active = state[name];
        this.active_name = name;
    };

    this.get = function (name) {
        return state[name];
    };

    this.change = function (name, _right) {
        this.pre_name = this.active_name;
        anim = 0;
        right = _right || false;
        next = name;
        this.active_name = name;
    };

    this.tick = function (ctx) {
        if (next) {
            if (anim <= 1) {
                anim += 0.02;

                active.update();
                state[next].update();

                var c1 = active.render(),
                    c2 = state[next].render(),

                    c1w = c1.width,
                    c1h = c1.height,
                    c2w = c2.width,
                    c2h = c2.height,

                    res = 2,

                    p,
                    t = anim;
                p = t < 0.5 ? 2 * t * t : -2 * (t * (t - 2)) - 1;

                if (right) {
                    p = 1 - p;
                    var t = c2;
                    c2 = c1;
                    c1 = t;
                }

                for (var i = 0; i < c1w; i += res) {
                    ctx.drawImage(c1, i, 0, res, c1h,
                        i - p * i,
                        (c1w - i) * p * 0.2,
                        res,
                        c1h - (c1w - i) * p * 0.4
                    );
                }
                p = 1 - p;
                for (var i = 0; i < c2w; i += res) {
                    ctx.drawImage(c2, i, 0, res, c2h,
                        i - (i - c2w) * p,
                        i * p * 0.2,
                        res,
                        c1h - i * p * 0.4
                    );
                }

            } else {
                active = state[next];
                next = false;
                active.update();
                active.render(ctx);
            }
        } else {
            active.update();
            active.render(ctx);
        }
    };
}

// tile object
function Tile(x, y) {

    var x = x, y = y;

    var tile = Tile.BLANK;
    var anim = 0;

    if (tile == null) {
        (function () {
            var _c = document.createElement("canvas");
            _c.width = _c.height = 100;
            var _ctx = _c.getContext("2d");

            _ctx.fillStyle = "sandybrown";
            _ctx.lineWidth = 4;
            _ctx.strokeStyle = "white";
            _ctx.lineCap = "round";

            // Blank
            _ctx.fillRect(0, 0, 100, 100);
            Tile.BLANK = new Image();
            Tile.BLANK.src = _c.toDataURL();

            // Nought
            _ctx.fillRect(0, 0, 100, 100);

            _ctx.beginPath();
            _ctx.arc(50, 50, 30, 0, 2 * Math.PI);
            _ctx.stroke();

            Tile.NOUGHT = new Image();
            Tile.NOUGHT.src = _c.toDataURL();

            // Cross
            _ctx.fillRect(0, 0, 100, 100);

            _ctx.beginPath();
            _ctx.moveTo(20, 20);
            _ctx.lineTo(80, 80);
            _ctx.moveTo(80, 20);
            _ctx.lineTo(20, 80);
            _ctx.stroke();

            Tile.CROSS = new Image();
            Tile.CROSS.src = _c.toDataURL();
        })();
        tile = Tile.BLANK;
    }

    this.active = function () {
        return anim > 0;
    };

    this.equals = function (_tile) {
        return tile === _tile;
    };

    this.hasData = function () {
        return tile !== Tile.BLANK;
    };

    this.set = function (next) {
        tile = next;
    };

    this.flip = function (next) {
        tile = next;
        anim = 1;
    };

    this.update = function () {
        if (anim > 0) {
            anim -= 0.02;
        }
    };

    this.draw = function (ctx) {
        if (anim <= 0) {
            ctx.drawImage(tile, x, y);
            return;
        }

        var res = 2;
        var t = anim > 0.5 ? Tile.BLANK : tile;
        var p = -Math.abs(2 * anim - 1) + 1;

        p *= p;

        for (var i = 0; i < 100; i += res) {

            var j = 50 - (anim > 0.5 ? 100 - i : i);

            ctx.drawImage(t, i, 0, res, 100,
                x + i - p * i + 50 * p,
                y - j * p * 0.2,
                res,
                100 + j * p * 0.4
            );
        }
    }

}

// menu object
function MenuButton(text, x, y, cb, _name) {
    var text = text, x = x, y = y, callback = cb;
    var hover, normal, rect = {};

    canvas.addEventListener("mousedown", function () {
        if (state.active_name !== _name) return;
        if (_name === "level" && state.pre_name === "menu") return;

        if (rect.hasPoint(mouse.x, mouse.y)) {
            if (callback) {
                callback();
            }
        }
    }, false);

    (function () {
        var _c = document.createElement("canvas"),
            _w = _c.width = 340,
            _h = _c.height = 50,
            _lw = 2,
            s = 10;

        rect.x = x;
        rect.y = y;
        rect.width = _c.width;
        rect.height = _c.height;

        _w -= _lw;
        _h -= _lw;

        var _ctx = _c.getContext("2d");

        _ctx.fillStyle = "white";
        _ctx.strokeStyle = "sandybrown";
        _ctx.lineWidth = _lw;
        _ctx.font = "20px Helvetica";

        _ctx.translate(_lw / 2, _lw / 2);
        _ctx.beginPath();
        _ctx.arc(s, s, s, Math.PI, 1.5 * Math.PI);
        _ctx.arc(_w - s, s, s, 1.5 * Math.PI, 0);
        _ctx.arc(_w - s, _h - s, s, 0, 0.5 * Math.PI);
        _ctx.arc(s, _h - s, s, 0.5 * Math.PI, Math.PI);
        _ctx.closePath();
        _ctx.fill();
        _ctx.stroke();

        _ctx.fillStyle = _ctx.strokeStyle;
        var _txt = text;
        _ctx.fillText(_txt, (_w - _ctx.measureText(_txt).width) / 2, 30);

        normal = new Image();
        normal.src = _c.toDataURL();

        _ctx.fill();
        _ctx.stroke();

        _ctx.fillStyle = "white";
        _ctx.fillText(_txt, (_w - _ctx.measureText(_txt).width) / 2, 30);

        hover = new Image();
        hover.src = _c.toDataURL();
    })();

    rect.hasPoint = function (x, y) {
        var xl = this.x < x && x < this.x + this.width,
            yl = this.y < y && y < this.y + this.height;

        return xl && yl;
    };

    this.draw = function (ctx) {
        var tile = rect.hasPoint(mouse.x, mouse.y) && state.active_name === _name ? hover : normal;
        ctx.drawImage(tile, x, y);
    };

}

function Scene(width, height) {

    var width = width, height = height;

    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");

    this.getContext = function () {
        return ctx;
    };

    this.getCanvas = function () {
        return canvas;
    };

    this.draw = function (_ctx) {
        _ctx.drawImage(canvas, 0, 0);
    };
}