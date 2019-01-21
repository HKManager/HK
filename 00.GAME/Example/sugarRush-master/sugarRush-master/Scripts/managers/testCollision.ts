/**
 *  File: testCollision
 *  Author: Haden Hiles
 *  Last Modified By: Haden Hiles
 *  Date Last Modified: November 14th
 *  Description:
 *  This is a test file to ensure that the collision class works correctly
 */
///<reference path="../../js/createjs-lib.d.ts"/>
///<reference path="../../js/easeljs.d.ts"/>
///<reference path="../../js/preloadjs.d.ts"/>
///<reference path="../../js/soundjs.d.ts"/>
var collision = new managers.Collision(null, null, null);
console.log(collision.rangeIntersect(501, 600, 201, 502));
console.log("x and y intersect and therefore should be true, is " + collision.rectIntersect({x:1,y:2,width:20,height:20}, {x:21,y:2,width:20,height:20}))
console.log("x doesn't intersect and therefore should be false, is " + collision.rectIntersect({x:1,y:2,width:20,height:20}, {x:50,y:2,width:20,height:20}))
console.log("x doesn't intersect and y does, therefore should be false, is " + collision.rectIntersect({x:1,y:2,width:20,height:20}, {x:22,y:2,width:20,height:20}))
console.log("x doesn't intersect and y doesn't, therefore should be false, is " + collision.rectIntersect({x:1,y:2,width:20,height:20}, {x:23,y:23,width:20,height:20}))
console.log("x does intersect and y doesn't, therefore should be false, is " + collision.rectIntersect({x:1,y:2,width:20,height:20}, {x:1,y:23,width:20,height:20}))
