;(function() {
  'use strict';
  if (typeof SpaceShooter === 'undefined'){
    window.SpaceShooter = {};
  }

  var Wave = SpaceShooter.Wave = function(game){
    this.waveCount = 0;
    this.fireFreq = 0.5;
    this.health = 5;
    this.currentFormation = 0;
    this.game = game;
    this.basicEnemy();
    this.waveType = 'basic';
  };

  Wave.BASIC_FORMATIONS = [
                            [[100, 100], [400,100], [200, 120], [300, 120]]
                          ];
  Wave.MEDIUM_FORMATIONS = [
                              [[150, 100], [400,100], [350, 200], [100, 200]],
                              [[400, 100], [400,200], [100, 200], [150, 100]],
                              [[350, 200], [100,200], [150, 100], [400, 100]],
                              [[100, 200], [100,100], [400, 100], [350, 200]],
                              [[150, 100], [400,100], [350, 200], [100, 200]]
                            ];
  Wave.HARD_FORMATIONS = [
                              [[100, 250], [400,250], [200, 250], [300, 250]],
                              [[75, 150], [400,150], [150, 150], [325, 150]],
                              [[150, 75], [400,150], [150, 150], [400, 75]],
                              [[225, 150], [400,150], [150, 150], [475, 150]],
                              [[150, 225], [400,150], [150, 150], [400, 225]],
                              [[75, 150], [400,150], [150, 150], [325, 150]],
                              [[100, 300], [400,300], [200, 300], [300, 300]]
                          ];
  Wave.BOSS_FORMATIONS = [
                          [[100, 200]],
                          [[150, 100]],
                          [[200, 200]],
                          [[250, 100]],
                          [[300, 200]],
                          [[350, 100]],
                          [[400, 200]],
                          [[350, 100]],
                          [[300, 200]],
                          [[250, 100]],
                          [[200, 200]],
                          [[150, 100]],
                          [[100, 200]],

                          ];

  Wave.prototype.updateEnemies = function () {
    var that = this;
    var isEnemyAligned = this.alignEnemies(this.game.enemyShips);
    if (!isEnemyAligned) {
      isEnemyAligned = this.alignEnemies(this.game.enemyShips);
    }else{
      this.game.enemyShips.forEach(function(ship){
        ship.pos = ship.targetPos.slice(0);
      });
      return true; //Returns true once enemy positions are aligned.
    }
  };

  Wave.prototype.alignEnemies = function (enemyShips) {
    var flagCount = 0;
    enemyShips.forEach(function(ship, idx){
      if ((ship.pos[0] !== ship.targetPos[0]) || (ship.pos[1] !== ship.targetPos[1])){
          ship.vel = SpaceShooter.Util.vectorToPoint(ship.targetPos, ship.pos);
          if (ship.vel[0] === Math.PI && ship.vel[1] === Math.PI){
            flagCount += 1;
            ship.vel = [0,0];
          }
      } else {
          flagCount += 1;
      }
    }.bind(this));

    if (flagCount >= enemyShips.length){
      return true;
    }else{
      return false;
    }
  };

  Wave.prototype.basicEnemy = function () {
    for (var i = 0; i < 4; i++) {
      this.game.addObject(new SpaceShooter.EnemyShip({
                                                        id: i,
                                                        pos: [250,-100],
                                                        vel: [0, 0],
                                                        speed: 3,
                                                        radius: 50,
                                                        health: this.health,
                                                        targetPos: Wave.BASIC_FORMATIONS[0][i].slice(0),
                                                        roatationAngleIncrement: 0.01*Math.PI,
                                                        src: "./assets/enemyShip3.png"
                                                      })
                                                    );
    }
  };

  Wave.prototype.mediumEnemy = function () {
    var xPos;
    var yPos;
    for (var i = 0; i < 4; i++) {
      if (i === 0 || i === 3){
        xPos = -100;
        yPos = 150;
      }else{
        xPos = 600;
        yPos = 150;
      }
      this.game.addObject(new SpaceShooter.EnemyShip({
                                                        id: i,
                                                        pos: [xPos,yPos],
                                                        vel: [0, 0],
                                                        speed: 2,
                                                        radius: 50,
                                                        health: this.health,
                                                        targetPos: Wave.MEDIUM_FORMATIONS[0][i].slice(0),
                                                        roatationAngleIncrement: 0.01*Math.PI,
                                                        src: "./assets/enemyShip1.png"
                                                      })
                                                    );
    }
  };

  Wave.prototype.hardEnemy = function () {
    for (var i = 0; i < 4; i++) {
      this.game.addObject(new SpaceShooter.EnemyShip({
                                                        id: i,
                                                        pos: [250,-100],
                                                        vel: [0, 0],
                                                        speed: 2,
                                                        radius: 50,
                                                        health: this.health,
                                                        targetPos: Wave.HARD_FORMATIONS[0][i].slice(0),
                                                        roatationAngleIncrement: 0.01*Math.PI,
                                                        src: "./assets/enemyShip5.png"
                                                      })
                                                    );
    }
  };

  Wave.prototype.bossEnemy = function (first_argument) {
    this.game.addObject(new SpaceShooter.EnemyShip({
                                                      id: 0,
                                                      pos: [250,-100],
                                                      vel: [0, 0],
                                                      speed: 4,
                                                      radius: 90,
                                                      health: this.health*4,
                                                      targetPos: Wave.BOSS_FORMATIONS[0][0].slice(0),
                                                      roatationAngleIncrement: 0.02*Math.PI,
                                                      src: "./assets/enemyShip4.png"
                                                    })
                                                  );
  };

  Wave.prototype.nextFormation = function () {
    var formation;
    switch (this.waveType) {
      case 'basic':
        formation = Wave.BASIC_FORMATIONS;
        this.currentFormation = 0;
        break;
      case 'medium':
        formation = Wave.MEDIUM_FORMATIONS.slice(0);
        this.currentFormation += 1;
        if (this.currentFormation >= Wave.MEDIUM_FORMATIONS.slice(0).length){
            this.currentFormation = 0;
          }
        break;
      case 'hard':
        formation = Wave.HARD_FORMATIONS;
        this.currentFormation += 1;
        if (this.currentFormation >= Wave.HARD_FORMATIONS.length){
            this.currentFormation = 0;
        }
        break;
      case 'boss':
        formation = Wave.BOSS_FORMATIONS;
        this.currentFormation += 1;
        if (this.currentFormation >= Wave.BOSS_FORMATIONS.length){
            this.currentFormation = 0;
        }
        break;
    }
    this.game.enemyShips.forEach(function(ship, idx){
      ship.targetPos = formation[this.currentFormation][ship.id].slice(0);
    }.bind(this));
  };

  Wave.prototype.nextWave = function () { //Update wave if enemies die out.
    this.waveCount += 1;
    switch (this.waveType) {
      case 'boss':
        this.basicEnemy();
        this.waveType = 'basic';
        break;
      case 'basic':
        this.mediumEnemy();
        this.waveType = 'medium';
        break;
      case 'medium':
        this.hardEnemy();
        this.waveType = 'hard';
        break;
      case 'hard':
        if (this.fireFreq < 1.2){
          this.fireFreq *= 1.2;
        }
        if (this.health < 25){
          this.health += 5;
        }
        this.bossEnemy();
        this.waveType = 'boss';
        break;
    }
  };
})();
