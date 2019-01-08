/**
 *  File: constants.ts
 *  Author: Haden Hiles
 *  Last Modified By: Haden Hiles
 *  Date Last Modified: November 14th
 *  Description:
 *  This class is simply used to establish global variables that
 *  need to be used consistently throughout the project
 */
module constants {
    //State Machine Constants
    export var MENU_STATE: number = 0;
    export var PLAY_STATE: number = 1;
    export var GAME_OVER_STATE: number = 2;

    //Game Constants
    export var CLOUD_NUM: number = 1;
    export var LABEL_FONT = "40px Arial";
    export var INSTRUCTIONS_FONT = "20px Arial";
    export var LABEL_COLOUR = "#97bf0f";
    export var LIVES = 10;
}