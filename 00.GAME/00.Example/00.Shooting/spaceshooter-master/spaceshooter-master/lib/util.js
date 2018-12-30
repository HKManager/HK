;(function() {
  'use strict';

  if (typeof SpaceShooter === 'undefined'){
    window.SpaceShooter = {}
  }

  var Util = SpaceShooter.Util = {}

  Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () { this.constructor = ChildClass };
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

  Util.normalizeVector = function (vector, offSet) {
    var x = vector[0];
    var y = vector[1];
    var len = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
    offSet = offSet || 0;

    x /= len;
    y /= len;

    return [x + offSet, y + offSet*0.7];
  };

  Util.vectorToPoint = function (origin, point, offSet) {
    var xDiff = origin[0] - point[0];
    var yDiff = origin[1] - point[1];
    offSet = offSet || 0;
    if ((Math.abs(xDiff) < 4) && (Math.abs(yDiff) < 4)){
      return [Math.PI,Math.PI];
    }else {
      return Util.normalizeVector([xDiff, yDiff], offSet);
    }
  };

  Util.bulletVel = function(shipPos, enemyPos, offSet){
    offSet = Math.random()*offSet*2 - offSet;
    offSet = offSet/100;
    return this.vectorToPoint(shipPos, enemyPos, offSet);
  };

  Util.distance = function(pointA, pointB){
    var xDiff = pointA[0] - pointB[0];
    var yDiff = pointA[1] - pointB[1];
    return (Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2)));
  };

  Util.isColliding = function(ship, bullet){
    return (this.distance(ship.pos, bullet.pos) < (ship.radius/2 + bullet.radius));
  };
})();
