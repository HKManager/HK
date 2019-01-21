/**
 * Created with IntelliJ IDEA.
 * User: HandsHiles
 * Date: 14-12-12
 * Time: 8:30 PM
 * To change this template use File | Settings | File Templates.
 */
///<reference path="../../js/createjs-lib.d.ts"/>
///<reference path="../../js/easeljs.d.ts"/>
///<reference path="../../js/preloadjs.d.ts"/>
///<reference path="../../js/soundjs.d.ts"/>
///<reference path="../objects/rotatingGroup.ts"/>
module managers {
    export class GroupManager {
        stage: createjs.Stage;
        game: createjs.Container;
        groups: objects.RotatingGroup[];
        dx: number;
        dy: number;
        constructor(stage: createjs.Stage, game: createjs.Container, groups: objects.RotatingGroup[]) {
            this.stage = stage;
            this.game = game;
            this.groups = groups;
            this.dx = 3;
            this.dy = 0;
            for(var count = 0; count < this.groups.length; count++) {
                this.groups[count].x = 1200;
                game.addChild(this.groups[count]);
            }
        }

        update(){
            var randomGroup = this.groups[0];
            randomGroup.y += this.dy;
            randomGroup.x -= this.dx;
            if (randomGroup.x <= -200) {
                //When group reaches the end reset it to the beginning
                randomGroup.reset();
            }
        }

        generateRandomGroup(): createjs.Container {
            var randomNum = Math.floor(Math.random() * (this.groups.length + 1));
            return this.groups[randomNum];
        }
    }
}
