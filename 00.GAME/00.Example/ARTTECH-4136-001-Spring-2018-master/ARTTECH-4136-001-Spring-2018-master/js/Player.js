// const GROUNDSPEED_DECAY_MULT = 0.94;
const PLAYER_MOVE_SPEED = 5;

class Player {
  constructor() {
    this.x = 75;
    this.y = 75;
    this.PlayerAvatar;
    this.name = "Player 01";

    this.keyHeld_Top = false;
    this.keyHeld_Down = false;
    this.keyHeld_Left = false;
    this.keyHeld_Right = false;

    this.keyHeld_Action = false;

    this.keyCheatKey = false;
    this.keyCheatExit = false;

    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;
    this.controlAction;

    this.controlCheatKey;
    this.controlCheatKey02;

    this.keysHeld = 0;

    this.currentMap;

  } // Constructor End

  setupInput(upKey, rightKey, downKey, leftKey, actionKey, cheatKey, cheatKey02) {
    this.controlKeyUp = upKey;
    this.controlKeyRight = rightKey;
    this.controlKeyDown = downKey;
    this.controlKeyLeft = leftKey;

    this.controlAction = actionKey;

    this.controlCheatKey = cheatKey;
    this.controlCheatKey02 = cheatKey02;
  }

  reset(whichImage, playerName, tile_type, reset_status) {
    this.name = playerName;
    this.PlayerAvatar = whichImage;
    console.log(reset_status);

    if (reset_status == "init") { // If the reset function is for starting a new game
      for(let eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
        for(let eachCol = 0; eachCol < WORLD_COLS; eachCol++) {

          let arrayIndex = rowColToArrayIndex(eachCol, eachRow);
          if (worldGrid[arrayIndex] == PLAYER_START_POSITION) { // Start player at map = '2'
            worldGrid[arrayIndex] = WORLD_GROUND;

            this.x = eachCol * WORLD_W + WORLD_W/2;
            this.y = eachRow * WORLD_H + WORLD_H/2;
            return;
          }
        }
      }
    } else if (reset_status == 'nav') { // If the reset function is just for navigation (map change)
      for(let eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
        for(let eachCol = 0; eachCol < WORLD_COLS; eachCol++) {

          let arrayIndex = rowColToArrayIndex(eachCol, eachRow);
          if (worldGrid[arrayIndex] == tile_type+0.5) { // Start player at map = '100'
            // worldGrid[arrayIndex] = WORLD_GROUND;

            this.x = eachCol * WORLD_W + WORLD_W/2;
            this.y = eachRow * WORLD_H + WORLD_H/2;
            return;
          }
        }
      }
    }
    console.log("NO PLAYER START FOUND");
  }

  move() {
    let nextX = this.x;
    let nextY = this.y;
    // this.speed *= GROUNDSPEED_DECAY_MULT;

    if (this.keyHeld_Top) {
      nextY -= PLAYER_MOVE_SPEED;
    }
    if (this.keyHeld_Down) {
      nextY += PLAYER_MOVE_SPEED;
    }
    if (this.keyHeld_Left) {
      nextX -= PLAYER_MOVE_SPEED;
    }
    if (this.keyHeld_Right) {
      nextX += PLAYER_MOVE_SPEED;
    }

    // CHEAT MODE
    if (this.keyCheatKey) {
      this.keysHeld = 9999;
      cheatMode = true;
    }

    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
    // console.log(walkIntoTileIndex);
    var walkIntoTileType = WORLD_WALL;

    if(walkIntoTileIndex != undefined) {
      walkIntoTileType = worldGrid[walkIntoTileIndex];
    }

    switch(walkIntoTileType) {
			case WORLD_GROUND:
				this.x = nextX;
				this.y = nextY;
				break;
      case WORLD_NAVIGATION_00_R:
				this.x = nextX;
				this.y = nextY;
				break;
      case WORLD_NAVIGATION_01_R:
				this.x = nextX;
				this.y = nextY;
				break;
      case WORLD_NAVIGATION_02_R:
				this.x = nextX;
				this.y = nextY;
				break;
      case WORLD_NAVIGATION_03_R:
				this.x = nextX;
				this.y = nextY;
				break;
      case WORLD_NAVIGATION_04_R:
				this.x = nextX;
				this.y = nextY;
				break;
      case GROUND_GRASS:
				this.x = nextX;
				this.y = nextY;
				break;
      case GROUND_DIRT:
				this.x = nextX;
				this.y = nextY;
				break;

			case WORLD_GOAL:
				console.log(this.name + " WINS!");
				// loadLevel(level01_01);
				break;
			case WORLD_DOOR:
				if(this.keysHeld > 0) {
					this.keysHeld--; // one less key
					// this.updateKeyReadout();
          console.log("KEYS:", this.keysHeld);
					worldGrid[walkIntoTileIndex] = WORLD_GROUND;
				}
				break;
			case WORLD_KEY:
				this.keysHeld++; // one more key
				// this.updateKeyReadout();
        console.log("KEYS:", this.keysHeld);
				worldGrid[walkIntoTileIndex] = WORLD_GROUND;
				break;
			case WORLD_WALL:
        speech_ready = false; // DEBUGING PURPOSE
        break;

			default:
				break;
		}

    // FOR MAP NAVIGATION
    switch(walkIntoTileType) {
      case WORLD_NAVIGATION_00:
        console.log(walkIntoTileType);

        if (this.currentMap == 'level01_01') {
          level01_01 = worldGrid;
          this.currentMap = 'level01_02';
          loadLevel(level01_02, walkIntoTileType, 'nav');
        } else if (this.currentMap == 'level01_02') {
          level01_02 = worldGrid;
          this.currentMap = 'level01_01';
          loadLevel(level01_01, walkIntoTileType, 'nav');
        }
        break;
      case WORLD_NAVIGATION_01:
        console.log(walkIntoTileType);

        if (this.currentMap == 'level01_02') {
          level01_02 = worldGrid;
          this.currentMap = 'level01_03';
          loadLevel(level01_03, walkIntoTileType, 'nav');
        } else if (this.currentMap == 'level01_03') {
          level01_03 = worldGrid;
          this.currentMap = 'level01_02';
          loadLevel(level01_02, walkIntoTileType, 'nav');
        }
        break;
      case WORLD_NAVIGATION_02:
        console.log(walkIntoTileType);

        if (this.currentMap == 'level01_02') {
          level01_02 = worldGrid;
          this.currentMap = 'level01_04';
          loadLevel(level01_04, walkIntoTileType, 'nav');
        } else if (this.currentMap == 'level01_04') {
          level01_04 = worldGrid;
          this.currentMap = 'level01_02';
          loadLevel(level01_02, walkIntoTileType, 'nav');
        }
        break;
      case WORLD_NAVIGATION_03:
        console.log(walkIntoTileType);

        if (this.currentMap == 'level01_02') {
          level01_02 = worldGrid;
          this.currentMap = 'level01_05';
          loadLevel(level01_05, walkIntoTileType, 'nav');
        } else if (this.currentMap == 'level01_05') {
          level01_05 = worldGrid;
          this.currentMap = 'level01_02';
          loadLevel(level01_02, walkIntoTileType, 'nav');
        }
        break;
      case WORLD_NAVIGATION_04:
        console.log(walkIntoTileType);

        if (this.currentMap == 'level01_06') {
          level01_06 = worldGrid;
          this.currentMap = 'level01_05';
          loadLevel(level01_05, walkIntoTileType, 'nav');
        } else if (this.currentMap == 'level01_05') {
          level01_05 = worldGrid;
          this.currentMap = 'level01_06';
          loadLevel(level01_06, walkIntoTileType, 'nav');
        }
        break;
      case WORLD_NAVIGATION_05:
        console.log('GAME OVER');
        game_over = true;
        break;

      default:
				break;
    }

    // For dialogue
    switch(walkIntoTileType) {
      case WORLD_INFO_01:
        speechReady('world_01_info_01');
        break;
      case WORLD_INFO_02:
        speechReady('world_01_info_02');
        break;
      case WORLD_INFO_03:
        speechReady('world_01_info_03');
        break;
      case WORLD_INFO_04:
        speechReady('world_01_info_04');
        break;
      case WORLD_INFO_05:
        speechReady('world_01_info_05');
        break;
      case WORLD_INFO_06:
        speechReady('world_01_info_06');
        break;
      case WORLD_INFO_07:
        speechReady('world_01_info_07');
        break;
      case WORLD_INFO_08:
        speechReady('world_01_info_08');
        break;
      case WORLD_INFO_09:
        speechReady('world_01_info_09');
        break;
      case WORLD_INFO_10:
        speechReady('world_01_info_10');
        break;
      case STATUE_IRON:
        speechReady('statue_iron');
        break;
      default:
        break;
    }
  }

  draw() {
    drawBitmapCenteredWithRotation(this.PlayerAvatar, this.x, this.y, 0);
  }

}
