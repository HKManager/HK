/**
 * Created with IntelliJ IDEA.
 * User: HandsHiles
 * Date: 14-11-30
 * Time: 12:09 PM
 * To change this template use File | Settings | File Templates.
 */
///<reference path="../../js/createjs-lib.d.ts"/>
///<reference path="../../js/easeljs.d.ts"/>
///<reference path="../../js/preloadjs.d.ts"/>
///<reference path="../../js/soundjs.d.ts"/>
///<reference path="image.ts"/>
///<reference path="../filters/scale.ts"/>
///<reference path="collidableSprite.ts"/>

module objects {
    export class RotatingGroup extends createjs.Container {
        images:any[] = [];
        dx: number;
        scale: filters.Scale;
        constructor(images: objects.CollidableSprite[]) {
            super();
            this.x = 400;
            this.y = 200;
            this.regX = 100;
            this.regY = 100;

            this.images = images;
            if(this.images.length == 3) {
                this.images[1].x = 250;
                this.images[2].x = 100;
                this.images[2].y = 250;
            } else if(this.images.length == 4) {
                this.images[1].x = 250;
                this.images[2].y = 250;
                this.images[3].x = 250;
                this.images[3].y = 250;
            }
            var bounds;
            for (var i=0; i<this.images.length; i++) {
                this.images[i].scaleX = .3;
                this.images[i].scaleY = .3;
                bounds = this.images[i].getTransformedBounds();
                this.images[i].regX = bounds.width / 2;
                this.images[i].regY = bounds.height / 2;
                this.addChild(this.images[i]);
            }
        }

        //Rotate the group
        rotate() {
            for(var idx = 0; idx < this.images.length; idx++) {
                this.images[idx].rotation += 1;
//                console.log(this.images[idx].getBounds() + "\n");
            }
            this.rotation -= 1;
        }

        reset(){
            this.x = 1200;
            this.y = 200;
        }

        //Remove the images
        destroy() {
            this.removeAllChildren();
        }
    }
}
