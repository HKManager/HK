/**
 *  File: ObstacleManager.ts
 *  Author: Haden Hiles
 *  Last Modified By: Haden Hiles
 *  Date Last Modified: November 14th
 *  Description:
 *  This class is responsible for controlling, when and
 *  how many obstacles to place on the screen at any given time
 */
///<reference path="../objects/movingImage.ts"/>
///<reference path="../../js/createjs-lib.d.ts"/>
///<reference path="../../js/easeljs.d.ts"/>
///<reference path="../../js/preloadjs.d.ts"/>
///<reference path="../../js/soundjs.d.ts"/>
///<reference path="../objects/collidableSprite.ts"/>
module managers {
    // Collision Manager Class
    export class ObstacleManager {
        //Class variables
        private stage: createjs.Stage;
        private game: createjs.Container;
        private _spriteSheet: createjs.SpriteSheet;
        private _animationNames:string[];
        private newDisplayObjectCallback: (object) => void;
        private displayObjectsCreated: number = 0;
        private tickCount: number = 0;
        addDisplayObjectProxy: (tickEvent) => void;

        constructor(stage, game, spriteSheet : createjs.SpriteSheet, newDisplayObjectCallback: (object) => void) {
            Object.defineProperty(this, "spriteSheet", {
                set: (sheet:createjs.SpriteSheet) => {
                    this._spriteSheet = sheet;
                    this._animationNames = sheet.getAnimations();
                },
                get: () => {
                    return this._spriteSheet;
                }
            });
            this.stage = stage;
            this.game = game;
            this._spriteSheet = spriteSheet;
            this._animationNames = spriteSheet.getAnimations();
            this.newDisplayObjectCallback = newDisplayObjectCallback;
            this.addDisplayObjectProxy = (tickEvent) => {
                this.addDisplayObject.apply(this, tickEvent);
            }
            createjs.Ticker.addEventListener("tick", this.addDisplayObjectProxy);
        }

        //Control the number of display objects that are added to the screen
        private addDisplayObject(tickEvent) {
            //Gather random sprites from the veggies spritesheet
            if (this.tickCount++ > 0 && this.tickCount % 60 == 0){
                var randomAnimationIdx:number = Math.floor(Math.random() * (this._animationNames.length + 1));
                var image:objects.CollidableSprite = new objects.CollidableSprite(this._spriteSheet, this._animationNames[randomAnimationIdx]);
                var o:objects.MovingImage = new objects.MovingImage(this.stage, this.game, image);
                this.displayObjectsCreated++;
                this.newDisplayObjectCallback(o);
                this.tickCount = 0;
            }
            //Only allow a max of 20 display objects to be on the stage at any given time
            if (this.displayObjectsCreated >= 5) {
                createjs.Ticker.removeEventListener("tick", this.addDisplayObjectProxy);
            }
        }

        //Stop adding obstacles to the game
        destroy() {
            createjs.Ticker.removeEventListener("tick", this.addDisplayObjectProxy);
        }
    }
}