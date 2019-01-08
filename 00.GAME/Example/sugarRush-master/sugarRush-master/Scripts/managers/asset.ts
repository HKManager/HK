/**
 *  File: asset.ts
 *  Author: Haden Hiles
 *  Last Modified By: Haden Hiles
 *  Date Last Modified: November 14th
 *  Description:
 *  This file is used to load and index all of the game assets including sounds, images, and spritesheets
 */
///<reference path="../../js/createjs-lib.d.ts"/>
///<reference path="../../js/easeljs.d.ts"/>
///<reference path="../../js/preloadjs.d.ts"/>
///<reference path="../../js/soundjs.d.ts"/>
module managers {
    // Image and Sound Manifest;
    var assetManifest = [
        { id: "loading", src: "assets/images/loading.jpg" },
        { id: "background", src: "assets/images/bg.png" },
        { id: "white", src: "images/white.jpg" },
        { id: "candypump", src: "assets/sounds/candy-pump.mp3" },
        { id: "ew", src: "assets/sounds/Ew.mp3" },
        { id: "slurp", src: "assets/sounds/Slurp.mp3" }
    ];

    // SpriteSheet Data Object
    var spriteSheetData = {
        "images": ["assets/images/atlas.png"],
        "frames": [

            [2, 2, 96, 106],
            [236, 65, 40, 40],
            [278, 65, 40, 40],
            [100, 2, 134, 66],
            [236, 2, 124, 61]
        ],
        "animations": {

            "candy-craver":[0],
            "mute":[1],
            "not-mute":[2],
            "playButton":[3],
            "tryAgainButton":[4]
        }
    }

    //Veggies Spritesheet
    var veggiesSpritesheet = {
        "images": ["assets/images/veggies.png"],
        "frames": [

            [282, 632, 119, 502],
            [283, 2, 145, 628],
            [2, 1409, 244, 309],
            [255, 1136, 226, 399],
            [2, 2, 279, 427],
            [248, 1537, 243, 463],
            [2, 1720, 218, 314],
            [2, 758, 257, 314],
            [2, 1074, 251, 333],
            [2, 431, 278, 325]
        ],
        "animations": {

            "carrot":[0],
            "cellery":[1],
            "green-pepper":[2],
            "hot-pepper":[3],
            "jalapeno":[4],
            "lettuce":[5],
            "onion":[6],
            "orange-pepper":[7],
            "red-pepper":[8],
            "yellow-pepper":[9]
        }
    }

    //Candy Spritesheet
    var candySpritesheet = {
        "images": ["assets/images/candy.png"],
        "frames": [

            [136, 2, 65, 65],
            [203, 2, 65, 65],
            [270, 2, 65, 65],
            [337, 2, 65, 64],
            [2, 2, 65, 70],
            [69, 2, 65, 69]
        ],
        "animations": {

            "candy":[0],
            "candy1":[1],
            "candy2":[2],
            "candy3":[3],
            "candy4":[4],
            "candy5":[5]
        }
    }

    // Asset Manager Class
    export class Assets {
        public static manifest;
        public static data;

        public static loader;
        public static atlas: createjs.SpriteSheet;
        public static veggies: createjs.SpriteSheet;
        public static candy: createjs.SpriteSheet;

        public static init() {
            createjs.Sound.initializeDefaultPlugins();
            this.loader = new createjs.LoadQueue();
            this.loader.installPlugin(createjs.Sound);
            this.loader.loadManifest(assetManifest);
            this.atlas = new createjs.SpriteSheet(spriteSheetData);
            this.veggies = new createjs.SpriteSheet(veggiesSpritesheet);
            this.candy = new createjs.SpriteSheet(candySpritesheet);
        }

        public static pauseSounds() {

        }
    }
} 