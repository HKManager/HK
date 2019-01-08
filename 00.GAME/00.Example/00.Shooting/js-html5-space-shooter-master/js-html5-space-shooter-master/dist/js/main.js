'use strict'

document.onload = init();

function init() {
    const game = new Game(window.innerWidth, window.innerHeight);
    console.log(game);

    document.body.appendChild(game.canvas);
    window.onkeypress = game.controls;
    window.onmousemove = game.controls;
    game.antialiasing(game.ctx);
    game.render();

    function Game(width, height) {
        // --- properties
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');
        this.level = new Level(1);
        this.players = [new Player({
            nickname: 'loydle',
            skin: new Ship(1),
        })];
        this.score = 0;
        this.enemy = [];
        this.explosion = [];
        this.config = {
            game: {
                title: 'SpaceWar',
                version: '0.0.1',
                width: width,
                height: height,
                cheat: {
                    on: false,
                    hitbox: {
                        lineWidth: 4,
                    }
                }
            },
        };

        this.getLevel = () => {
            return this.level;
        }

        this.setLevel = (int) => {
            this.level = new Level(int);
        }

        this.setScore = (scoreToAdd) => {
            this.score += scoreToAdd;
        };

        this.getScore = () => {
            return this.score;
        };

        this.move = (position) => {
            if (typeof position === 'object') {
                this.players[0].skin.position.x = position.x;
            }
        }

        this.antialiasing =
            (ctx) => {
                // turn off image aliasing
                ctx.msImageSmoothingEnabled = false;
                ctx.mozImageSmoothingEnabled = false;
                ctx.webkitImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
            };

        this.render =
            () => {
                var play = requestAnimationFrame(this.render);
                if (this.players[0].life <= 0) {
                    this.isGameOver = true;

                }
                if (this.isGameOver) {
                    this.gameOver(this);


                } else {
                    // cancelAnimationFrame(play);
                }
                this.drawBackgroundImage(
                    this.ctx,
                    this.level,
                );


                this.drawBulletImage(
                    this.ctx,
                    this.players[0],
                );

                this.drawPlayerImage(
                    this.ctx,
                    this.players,
                );


                if (this.getScore() > 0) {
                    this.fillGameInfosText(
                        this.ctx,
                        this.getScore(),
                        50, 130, "bold 30px ING Me", '#00FF00',
                    );
                } else {
                    this.score = 0;
                    this.fillGameInfosText(
                        this.ctx,
                        this.getScore(),
                        50, 130, "bold 30px ING Me", '#FFF');
                }

                this.fillGameInfosText(
                    this.ctx,
                    this.config.game.title + " " + this.config.game.version,
                    50,
                    50,
                    "20px ING Me", '#FFF',
                );


                this.fillGameInfosText(
                    this.ctx,
                    'Level ' + this.getLevel().level,
                    50,
                    80,
                    "20px ING Me", '#FFF',
                );

                this.fillGameInfosSquare(this.ctx, '2', '#ccc', 40, 25, 160, 70);

                // Add Enemy
                if (
                    (this.enemy.length <= 0) ||
                    (this.enemy[this.enemy.length - 1].position.y > 100)
                ) {
                    this.enemy.push(new Enemy(Math.round(Math.random() * 9)));

                }

                this.drawEnemyImage(
                    this.ctx,
                    this.enemy,
                );

                this.drawExplosionImage(
                    this.ctx,
                    this.explosion,
                );
                this.drawPlayerLifeImage(
                    this.ctx,
                    this.players,
                );
            };

        this.fillGameInfosSquare =
            (ctx, lineWidth, color, x, y, width, height) => {
                ctx.beginPath();
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = color;
                ctx.rect(x, y, width, height);
                ctx.stroke();
            }

        this.controls =
            (e) => {
                if (e.type === 'mousemove') {
                    this.move({ x: e.clientX, y: e.clientY });
                }
                switch (e.keyCode || e) {
                    case 32:
                        new Fireball(
                            this.players[0],
                            './img/spritesheets/laser-bolts.png',
                            0, -1000,
                            30,
                            30,
                            10,
                            4,
                        );
                        this.setScore(-10);
                        break;
                    default:
                        break;
                }
            }

        this.drawExplosionImage =
            (ctx, explosion) => {
                if (explosion.length) {
                    explosion.map((ex) => {
                        ex.position.steps[0].x += 16;
                        if (ex.position.steps[0].x >= 200) {
                            explosion.splice(explosion.indexOf(ex), 1);
                        }
                        const img = new Image();
                        img.src = ex.src;
                        img.onload =
                            () => {
                                ctx.drawImage(
                                    img,
                                    ex.position.steps[0].x,
                                    ex.position.steps[0].y,
                                    16,
                                    16,
                                    ex.position.x,
                                    ex.position.y,
                                    80,
                                    80,
                                );
                            }
                    })
                }
            }

        this.fillGameInfosText = (ctx, text, x, y, font, color) => {
            ctx.font = font;
            ctx.fillStyle = color;
            ctx.fillText(text, x, y);
        }

        this.playersHitbox = (ctx, p, config) => {
            if (config.game.cheat.on) {
                ctx.beginPath();
                ctx.lineWidth = config.game.cheat.hitbox.lineWidth;
                ctx.strokeStyle = "#00FF00";
                ctx.rect(
                    p[0].skin.position.x - p[0].skin.position.steps[0].width / 2,
                    p[0].skin.position.y, (p[0].skin.position.steps[0].width * p[0].skin.scale),
                    p[0].skin.position.steps[0].height * p[0].skin.scale
                );
                ctx.stroke();
            }
        }

        this.killEnemy = (ctx, enemyArray, en, fireballArray, f, explosion) => {
            var ex = new Explosion(1);
            ex.position.x = en.position.x;
            ex.position.y = en.position.y;
            explosion.push(ex);
            if (en.life <= 0 || en.position.y > window.innerHeight) {
                enemyArray.splice(enemyArray.indexOf(en), 1);
                this.setScore(150)
            }
            fireballArray.splice(fireballArray.indexOf(f), 1);
        }

        this.enemyHitbox = (ctx, enemy, p, config, enemyArray, explosion) => {
            var playerTouchedEnemy = (
                (p[0].skin.position.y <=
                    enemy.position.y + enemy.position.steps[0].height &&
                    p[0].skin.position.y >=
                    enemy.position.y - enemy.position.steps[0].height) &&
                (p[0].skin.position.x >= enemy.position.x - enemy.position.steps[0].width / 2 &&
                    p[0].skin.position.x <= enemy.position.x + enemy.position.steps[0].width)
            );

            var fireballHasTouch = p[0].fireballs.filter((f) => {
                return (f.y <= enemy.position.y + enemy.position.steps[0].height &&
                        f.y >= enemy.position.y - enemy.position.steps[0].height) &&
                    (f.x >= enemy.position.x - enemy.position.steps[0].width / 2 &&
                        f.x <= enemy.position.x + enemy.position.steps[0].width)
            });

            if (playerTouchedEnemy || fireballHasTouch[0]) {
                if (fireballHasTouch[0]) {
                    enemy.life -= 1;
                    this.setScore(50)
                }

                this.killEnemy(ctx, enemyArray, enemy, p[0].fireballs, fireballHasTouch[0], explosion);

                if (playerTouchedEnemy) {
                    enemy.life = 0;

                    p[0].life -= 1;

                    this.setScore(-500)
                }

                if (config.game.cheat.on) {
                    // hitbox
                    ctx.strokeStyle = "#FF0000";
                }
            } else {
                if (config.game.cheat.on) {
                    // hitbox
                    ctx.strokeStyle = "#00FF00";
                }
            }
            if (config.game.cheat.on) {
                ctx.beginPath();
                ctx.lineWidth = config.game.cheat.hitbox.lineWidth;
                ctx.rect(
                    enemy.position.x,
                    enemy.position.y,
                    enemy.position.steps[0].width,
                    enemy.position.steps[0].height
                );
                ctx.stroke();
            }
        }
        let tickCount = 1;
        let frameIndex = 0;
        this.drawPlayerImage =
            (ctx, playersArray) => {
                const img = new Image();
                img.src = playersArray[0].skin.src;
                this.hitbox = this.playersHitbox(ctx, playersArray, this.config)

                tickCount += 1;
                let numberOfFrames = playersArray[0].skin.position.steps.length;
                if (tickCount >= numberOfFrames) {
                    tickCount = 0;
                }
                img.onload = () => {
                    ctx.drawImage(
                        img,
                        playersArray[0].skin.position.steps[0].x,
                        playersArray[0].skin.position.steps[tickCount].y,
                        playersArray[0].skin.position.steps[0].width,
                        playersArray[0].skin.position.steps[0].height,
                        playersArray[0].skin.position.x - playersArray[0].skin.position.steps[0].width / 2,
                        playersArray[0].skin.position.y,
                        playersArray[0].skin.position.steps[0].width * playersArray[0].skin.scale,
                        playersArray[0].skin.position.steps[0].height * playersArray[0].skin.scale,
                    );

                };
            };

        this.drawPlayerLifeImage =
            (ctx, playersArray) => {
                const img = new Image();
                img.src = './img/spritesheets/custom-sprites.png';
                img.onload = () => {
                    for (let i = 0; i < playersArray[0].life; i++) {
                        var y = (50 * i)
                        y += window.innerWidth - (50 * playersArray[0].life) - 20; // 50 => width
                        ctx.drawImage(
                            img,
                            430,
                            0,
                            30,
                            30,
                            y,
                            10,
                            50,
                            50,
                        );

                    };
                }
            };

        this.drawEnemyImage =
            (ctx, enemy) => {
                enemy.map((en) => {
                    // Hitbox rectangle
                    this.hitbox = this.enemyHitbox(
                        ctx,
                        en,
                        this.players,
                        this.config,
                        this.enemy,
                        this.explosion
                    );


                    if (en.position.y > window.innerHeight) {
                        // remove enemy if oob
                        enemy.splice(
                            enemy.indexOf(en), 1
                        );

                    } else {
                        const img = new Image();
                        img.src = en.src;
                        img.onload = () => {
                            // move sprite
                            en.position.y += en.speed;
                            ctx.drawImage(
                                img,
                                en.position.x,
                                en.position.y,
                                en.position.steps[0].width, en.position.steps[0].height
                            );
                        };
                    }
                });
            };


        this.drawBulletImage =
            (ctx, player) => {
                if (player.fireballs.length) {
                    player.fireballs.map(function(f) {
                        // console.log(f.id)
                        if (f.y < -f.height) {
                            // remove fireball
                            player.fireballs.splice(player.fireballs.indexOf(f), 1);


                        } else {
                            f.y -= f.speed;
                            const img = new Image();
                            img.src = f.src;
                            img.onload = () => {
                                ctx.drawImage(
                                    img,
                                    4,
                                    15,
                                    f.width,
                                    f.height,
                                    f.x - player.skin.position.steps[0].width / 2,
                                    f.y,
                                    f.width * f.scale,
                                    f.height * f.scale
                                );
                            }
                        }
                    })
                }
            }

        this.drawBackgroundImage =
            (ctx, level) => {
                level.background.position.y[0] += level.background.speed;
                // loop
                if (level.background.position.y[0] > 0) {
                    setDefaultBackgroundPosition();
                };
                const img = new Image();
                img.src = level.background.src;
                img.onload = function drawImage() {
                    ctx.drawImage(
                        img,
                        level.background.position.x[0],
                        level.background.position.y[0],
                        level.background.width[0] * level.background.scale,
                        level.background.height[0] * level.background.scale
                    );
                };

                function setDefaultBackgroundPosition() {
                    level.background.position.y[0] = level.background.position.default.y[0];
                };
            };

        this.gameOver = (game) => {
            this.fillGameInfosText(
                this.ctx,
                'GAME OVER',
                window.innerWidth / 2 - 210,
                window.innerHeight / 2,
                "80px ING Me", '#FFF',
            );
            this.fillGameInfosText(
                this.ctx,
                '[Press ENTER]',
                window.innerWidth / 2 - 250,
                window.innerHeight / 2 + 300,
                "80px ING Me", '#FFF',
            );

            // var img = new Image();
            // img.src = './img/spritesheets/game-over.png';
            // game.ctx.drawImage(
            //     img,
            //     0,
            //     0,
            //     87,
            //     63,
            //     window.innerWidth - 870,
            //     (window.innerHeight - 630) / 2,
            //   window.innerWidth/2,
            //     630,
            // );
            window.addEventListener('keydown', (e) => {
                if (e.keyCode === 13) {
                    game.isGameOver = false;
                    game.players[0].life = 4;
                }
            })
        }

        console.log(this.players);
    };

    function Player(object) {
        this.nickname = object.nickname;
        this.skin = object.skin;
        this.life = 4;
        this.fireballs = [];
        this.highScore = this.highScore || 0;
        return this;
    }

    function Fireball(player, src, x, y, width, height, speed, scale) {
        var obj = {
            src: src,
            x: player.skin.position.x - 8,
            y: player.skin.position.y,
            width: 30,
            height: 30,
            speed: 10,
            scale: scale,
            id: getGUID(),
        }
        player.fireballs.push(obj);
        // console.log(player)
    }

    function Ship(int) {
        var ship = {};
        switch (int) {
            case 1:
                ship = new ShipConfig('./img/spritesheets/ship.png',
                    window.innerWidth / 2 - 23, window.innerHeight - 200, [{
                        x: 90,
                        y: 0,
                        width: 46,
                        height: 67,
                    }, {
                        x: 90,
                        y: 67,
                        width: 46,
                        height: 67,
                    }], 1.7)
                break;
            case 2:
                ship = new ShipConfig('./img/spritesheets/player-1.png',
                    window.innerWidth / 2 - 23, window.innerHeight - 200, [{
                        x: 0,
                        y: 0,
                        width: 46,
                        height: 61,
                    }], 4)
                break;
            default:
        }

        function ShipConfig(src, startX, startY, steps, scale) {
            return {
                src: src,
                scale: scale,
                position: {
                    x: startX,
                    y: startY,
                    steps: steps,
                }
            }
        }
        return ship;
    }

    function Level(int) {
        switch (int) {
            case 1:
                return new levelConfig(int, './img/backgrounds/desert-backgorund-looped.png', 256, 608, 6, 2, './img/title-screen-level-1.png');
                break;

            default:
        }
    }

    function levelConfig(level, background, width, height, scale, speed, titleScreen) {
        return {
            level: level,
            background: {
                src: background,
                position: {
                    x: [0, ],
                    y: [0],
                    default: {
                        x: [0, ],
                        y: [-(height) * scale / 2],
                    },
                },
                speed: speed,
                width: [width],
                height: [height],
                scale: scale,
            },
            titleScreen: {
                src: titleScreen
            }
        }
    }

    function Enemy(int) {
        var enemy = {};
        switch (int) {
            case 1:
                enemy = new enemyConfig('./img/spritesheets/enemy-1.png',
                    Number((Math.random() * 1000).toFixed(0)), -100, [{
                        x: 0,
                        y: 0,
                        width: 120,
                        height: 140,
                    }], Number(((Math.random() + 1) * 2.2).toFixed(0)), 2, 1);
                break;
            case 2:
                enemy = new enemyConfig('./img/spritesheets/enemy-2.png',
                    Number((Math.random() * 1000).toFixed(0)), -100, [{
                        x: 0,
                        y: 0,
                        width: 130,
                        height: 140,
                    }], Number(((Math.random() + 1) * 2.2).toFixed(0)), 2, 1);
                break;
            case 3:
                enemy = new enemyConfig('./img/spritesheets/enemy-3.png',
                    Number((Math.random() * 1000).toFixed(0)), -100, [{
                        x: 0,
                        y: 0,
                        width: 120,
                        height: 140,
                    }], Number(((Math.random() + 1) * 2.2).toFixed(0)), 2, 1);
                break;
            case 4:
                enemy = new enemyConfig('./img/spritesheets/enemy-4.png',
                    Number((Math.random() * 1000).toFixed(0)), -100, [{
                        x: 0,
                        y: 0,
                        width: 80,
                        height: 100,
                    }], Number(((Math.random() + 1) * 2.2).toFixed(0)), 2, 1);
                break;
            case 5:
                enemy = new enemyConfig('./img/spritesheets/enemy-5.png',
                    Number((Math.random() * 1000).toFixed(0)), -100, [{
                        x: 0,
                        y: 0,
                        width: 80,
                        height: 100,
                    }], Number(((Math.random() + 1) * 2.2).toFixed(0)), 2, 1);
                break;
            case 6:
                enemy = new enemyConfig('./img/spritesheets/enemy-6.png',
                    Number((Math.random() * 1000).toFixed(0)), -100, [{
                        x: 0,
                        y: 0,
                        width: 80,
                        height: 100,
                    }], Number(((Math.random() + 1) * 2.2).toFixed(0)), 2, 1);
                break;
            case 7:
                enemy = new enemyConfig('./img/spritesheets/enemy-7.png',
                    Number((Math.random() * 1000).toFixed(0)), -100, [{
                        x: 0,
                        y: 0,
                        width: 80,
                        height: 100,
                    }], Number(((Math.random() + 1) * 2.2).toFixed(0)), 2, 1);
                break;
            case 8:
                enemy = new enemyConfig('./img/spritesheets/enemy-8.png',
                    Number((Math.random() * 1000).toFixed(0)), -100, [{
                        x: 0,
                        y: 0,
                        width: 80,
                        height: 100,
                    }], Number(((Math.random() + 1) * 2.2).toFixed(0)), 2, 1);
                break;
            case 9:
                enemy = new enemyConfig('./img/spritesheets/enemy-9.png',
                    Number((Math.random() * 1000).toFixed(0)), -100, [{
                        x: 0,
                        y: 0,
                        width: 120,
                        height: 140,
                    }], Number(((Math.random() + 1) * 2.2).toFixed(0)), 2, 1);
                break;
            case 10:
                enemy = new enemyConfig('./img/spritesheets/enemy-10.png',
                    Number((Math.random() * 1000).toFixed(0)), -100, [{
                        x: 0,
                        y: 0,
                        width: 350,
                        height: 340,
                    }], 1, 2, 100);
                break;
            default:
                enemy = new enemyConfig('./img/spritesheets/enemy-4.png',
                    Number((Math.random() * 1000).toFixed(0)), -100, [{
                        x: 0,
                        y: 0,
                        width: 100,
                        height: 100,
                    }], Number(((Math.random() + 1) * 2.2).toFixed(0)), 2, 1);
        }

        function enemyConfig(src, startX, startY, steps, speed, scale, life) {
            return {
                src: src,
                scale: scale,
                speed: speed,
                life: life,
                position: {
                    x: startX,
                    y: startY,
                    steps: steps
                }
            }
        }
        return enemy;
    }

    function Explosion(int) {
        var explosion = {};
        switch (int) {
            case 1:
                explosion = new explosionConfig('./img/spritesheets/explosion.png', 2);
                break;
            default:

        }

        function explosionConfig(src, scale) {
            return {
                src: src,
                scale: scale,
                position: {
                    x: 0,
                    y: 0,
                    steps: [{
                        x: 0,
                        y: 0,
                        width: 80,
                        height: 16,
                    }]
                }
            }
        }
        return explosion;
    }
};

function getGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}