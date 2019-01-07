/**
 *  File: candy.ts
 *  Author: Haden Hiles
 *  Last Modified By: Haden Hiles
 *  Date Last Modified: November 14th
 *  Description:
 *  This class is responsible for randomly continuing to add candies from
 *  the candy spritesheet to the screen
 */
///<reference path="../../js/createjs-lib.d.ts"/>
///<reference path="../../js/easeljs.d.ts"/>
///<reference path="../../js/preloadjs.d.ts"/>
///<reference path="../../js/soundjs.d.ts"/>
///<reference path="image.ts"/>
///<reference path="../managers/asset.ts"/>
///<reference path="collidableSprite.ts"/>
module objects {
    // Candy Class
    export class Candy extends objects.Image {
        dx: number;
        randomAnimationIdx: number = 0;
        public _spriteSheet: createjs.SpriteSheet = managers.Assets.candy;
        public _animationNames:string[] = managers.Assets.candy.getAnimations();
        constructor(stage: createjs.Stage, game: createjs.Container) {
            super(stage, game, new objects.CollidableSprite(managers.Assets.candy, managers.Assets.candy[0]));
            this.regX = this.width / 2;
            this.regY = this.height / 2;
            this.dx = 4;
        }

        //Move the candy on the x axis and reset when it goes off screen
        moveImage() {
            if(this) {
                this.x -= this.dx;
                if (this.x <= 0) {
                    this.reset();
                }
            }
        }

        //Set the candy back to the right of the canvas
        reset() {
            this._animationNames = managers.Assets.candy.getAnimations();
            this.randomAnimationIdx = Math.floor(Math.random() * (this._animationNames.length + 1));

            this.image = new objects.CollidableSprite(managers.Assets.candy, this._animationNames[this.randomAnimationIdx]);
            this.adjustImage(this.image);
        }

        adjustImage(image: createjs.Sprite){
            image.scaleX = .7;
            image.scaleY = .7;
            image.regX = this.width / 2;
            image.regY = this.height / 2;
            image.y = Math.floor(Math.random() * this.stage.canvas.height);
            image.x = this.stage.canvas.width;
        }
   }
}