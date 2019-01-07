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
var managers;
(function (managers) {
    var GroupManager = (function () {
        function GroupManager(stage, game, groups) {
            this.stage = stage;
            this.game = game;
            this.groups = groups;
            this.dx = 3;
            this.dy = 0;
            for (var count = 0; count < this.groups.length; count++) {
                this.groups[count].x = 1200;
                game.addChild(this.groups[count]);
            }
        }
        GroupManager.prototype.update = function () {
            var randomGroup = this.groups[0];
            randomGroup.y += this.dy;
            randomGroup.x -= this.dx;
            if (randomGroup.x <= -200) {
                //When group reaches the end reset it to the beginning
                randomGroup.reset();
            }
        };
        GroupManager.prototype.generateRandomGroup = function () {
            var randomNum = Math.floor(Math.random() * (this.groups.length + 1));
            return this.groups[randomNum];
        };
        return GroupManager;
    })();
    managers.GroupManager = GroupManager;
})(managers || (managers = {}));
//# sourceMappingURL=groupManager.js.map