/**
 * Created with IntelliJ IDEA.
 * User: HandsHiles
 * Date: 14-12-13
 * Time: 6:06 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 *  File: character.ts
 *  Author: Haden Hiles
 *  Last Modified By: Haden Hiles
 *  Date Last Modified: November 14th
 *  Description:
 *  A collidableSprite can be collission enabled, providing for alternate collision management.
 */
///<reference path="../../js/createjs-lib.d.ts"/>
///<reference path="../../js/easeljs.d.ts"/>
///<reference path="../../js/preloadjs.d.ts"/>
///<reference path="../../js/soundjs.d.ts"/>
///<reference path="../managers/asset.ts"/>
module objects {
    export class CollidableSprite extends createjs.Sprite {
        private _collissionEnabled : Boolean = true;
        constructor(spriteSheet: createjs.SpriteSheet, frameOrAnimation?: any){
            super(spriteSheet, frameOrAnimation);
            Object.defineProperty(this, "collissionEnabled", {
                set: (value:Boolean) => {
                    this._collissionEnabled = value;
                },
                get: () => {
                    return this._collissionEnabled;
                }
            });
        }
        public disableCollissionForDuration(milliseconds:number=1000) {
            this._collissionEnabled = false;
            this.alpha = .5;
            var __this = this;
            setTimeout(function(){
                __this._collissionEnabled = true;
                __this.alpha = 1;
            }, milliseconds);
        }

    }

}