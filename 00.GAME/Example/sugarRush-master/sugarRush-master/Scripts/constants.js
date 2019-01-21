/**
 *  File: constants.ts
 *  Author: Haden Hiles
 *  Last Modified By: Haden Hiles
 *  Date Last Modified: November 14th
 *  Description:
 *  This class is simply used to establish global variables that
 *  need to be used consistently throughout the project
 */
var constants;
(function (constants) {
    //State Machine Constants
    constants.MENU_STATE = 0;
    constants.PLAY_STATE = 1;
    constants.GAME_OVER_STATE = 2;
    //Game Constants
    constants.CLOUD_NUM = 1;
    constants.LABEL_FONT = "40px Arial";
    constants.INSTRUCTIONS_FONT = "20px Arial";
    constants.LABEL_COLOUR = "#97bf0f";
    constants.LIVES = 10;
})(constants || (constants = {}));
//# sourceMappingURL=constants.js.map