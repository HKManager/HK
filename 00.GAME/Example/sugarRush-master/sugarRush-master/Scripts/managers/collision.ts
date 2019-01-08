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
module managers {
    // Collision Manager Class
    export class Collision  {
        // class variables
        private displayObjectSet1 = [];
        private displayObjectSet2 = [];
        private _enabled: Boolean = true;
        public collisionHandlerCallback: (displayObject1: any, dispalyObject2: any) => void;
        constructor(displayObjectSet1, displayObjectSet2, collisionHandler: (displayObject1: any, displayObject2: any)=>void) {
            Object.defineProperty(this, "enabled", {
                set: (enabledValue) => {
                    this._enabled = enabledValue;
                },
                get: () => {
                    return this._enabled;
                }
            });
            this.displayObjectSet1 = displayObjectSet1;
            this.displayObjectSet2 = displayObjectSet2;
            this.collisionHandlerCallback = collisionHandler;
        }

        //Get the min and max values of 2 objects and pass them through the rangeIntersect method to determine if there is overlap
        public rectIntersect(rectangleA: createjs.Rectangle, rectangleB: createjs.Rectangle): boolean {
//            console.log("Object A: " + rectangleA + ", Object B: " + rectangleB);
            return  this.rangeIntersect(rectangleA.x,rectangleA.x + rectangleA.width, rectangleB.x, rectangleB.x + rectangleB.width) &&
                    this.rangeIntersect(rectangleA.y, rectangleA.y + rectangleA.height, rectangleB.y, rectangleB.y + rectangleB.height);
        }

        //Determine whethere there is an overlap with the two display objects or not
        public rangeIntersect(rangeAMin: number, rangeAMax: number, rangeBMin: number, rangeBMax: number): boolean{
            return  Math.max(rangeAMin, rangeAMax) >= Math.min(rangeBMin, rangeBMax) &&
                    Math.min(rangeAMin, rangeAMax) <= Math.max(rangeBMin, rangeBMax);
        }

        public pauseForDuration(milliseconds:number=1000) {
            this._enabled = false;
            var __this = this;
            setTimeout(function(){
                __this._enabled = true;
            }, milliseconds);
        }

        //loop through both object collections and check for a collision with each item in a collection (ex. veggies)
        update() {
            if (this._enabled) {
                // We need to fake the object dimensions to improve perceived collisions.
                var scaledObjectA:filters.Scale = new filters.Scale();
                var scaledObjectB:filters.Scale = new filters.Scale();
                for(var idx1 = 0; idx1 < this.displayObjectSet1.length; idx1++) {
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
        }
        
        private getTransformedRectangle(displayObject:any): createjs.Rectangle {
            var bounds = displayObject.getTransformedBounds();
            var globalOrigin = displayObject.parent.localToGlobal(bounds.x, bounds.y);
            bounds.x = globalOrigin.x;
            bounds.y = globalOrigin.y;
            return bounds;
        }
    }
} 