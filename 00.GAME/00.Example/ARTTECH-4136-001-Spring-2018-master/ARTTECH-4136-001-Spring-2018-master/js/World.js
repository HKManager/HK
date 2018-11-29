const WORLD_W = 50;
const WORLD_H = 50;
const WORLD_GAP = 2;
const WORLD_COLS = 16;
const WORLD_ROWS = 13;

let level01_01 =  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
									 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 1, 1,
									 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1,
									 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1,
									 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1,
									 1, 1001, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1,
									 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1,
									 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1,
									 1, 0, 0, 1, 0, 0, 1002, 0, 0, 0, 0, 0, 0, 1, 1, 1,
									 1, 0, 2, 1, 0, 100.5, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1,
									 1, 1, 1, 1, 100, 100, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,// ROW END
									 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

// NAV from level01_01 SOUTH
let level01_02 = [1, 1, 1, 1, 100, 100, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
									1, 1, 1, 1, 0, 100.5, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
									1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1004, 0, 1, 1,
									1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
									1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
									101, 101.5, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1,
									101, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1,
									1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 102.5, 102,
									1, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
									1, 1005, 0, 5, 0, 0, 0, 1, 1, 5, 0, 0, 0, 1, 1, 1,
									1, 0, 0, 1, 1, 1, 1, 1, 1, 103.5, 1, 1, 1, 1, 1, 1,
									1, 1, 1, 1, 1, 1, 1, 1, 1, 103, 1, 1, 1, 1, 1, 1,// ROW END
									1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

// NAV from level01_02 WEST
let level01_03 =  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
									 1, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 101.5, 101,
									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 101,
									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
									 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,// ROW END
									 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

let level01_03_EXIT =  [1, 20, 1, 20, 22, 1, 22, 1, 1, 1, 1, 1, 1, 1, 1, 1,
											 105, 22, 20, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
											 105, 21, 0, 21, 21, 0, 20, 0, 0, 0, 20, 0, 0, 0, 1, 1,
											 105, 20, 21, 20, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 1, 1,
											 105, 1, 20, 22, 21, 20, 0, 0, 21, 0, 0, 0, 0, 0, 1, 1,
											 105, 22, 0, 21, 21, 20, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
											 105, 20, 21, 21, 21, 0, 20, 0, 0, 21, 0, 0, 0, 0, 101.5, 101,
											 105, 22, 0, 21, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 101,
											 105, 21, 0, 20, 20, 21, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
											 1, 21, 20, 22, 21, 21, 20, 0, 0, 20, 0, 0, 0, 0, 1, 1,
											 105, 1, 21, 20, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
											 1, 22, 21, 22, 22, 21, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,// ROW END
											 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

// NAV from level01_02 EAST
let level01_04 =  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
									 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
									 102, 102.5, 0, 1, 1, 1, 1, 1, 1, 1, 1007, 1, 0, 4, 1, 1,
									 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1008, 1, 1,
									 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1,
									 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1,
									 1, 0, 0, 5, 0, 0, 0, 1, 0, 1006, 1, 1, 0, 1, 1, 1,
									 1, 0, 0, 1, 1, 1, 1, 1, 0, 4, 1, 1, 0, 1, 1, 1,
									 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1,
									 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
									 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1,
									 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,// ROW END
									 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

// NAV from level01_02 SOUTH
let level01_05 =  [1, 1, 1, 1, 1, 1, 1, 103, 103, 1, 1, 1, 1, 1, 1, 1,
									 1, 1, 0, 0, 0, 0, 0, 0, 103.5, 1, 0, 0, 0, 1, 1, 1,
									 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 4, 1, 0, 1, 1, 1,
									 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1,
									 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1,
									 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1,
									 1, 1, 1010, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
									 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1,
									 1, 1, 0, 0, 0, 0, 0, 1, 1009, 1, 0, 0, 0, 0, 1, 1,
									 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
									 1, 1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 1,
									 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 104.5, 1, 1,// ROW END
									 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 104, 1, 1];

// NAV from level01_05 SOUTH
let level01_06 =  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 104, 1, 1,
									 1, 1, 14, 0, 0, 16, 0, 0, 0, 0, 0, 0, 1, 104.5, 1, 1,
									 1, 1, 0, 0, 1, 0, 0, 0, 0, 11, 0, 0, 1, 0, 1, 1,
									 1, 1, 0, 1, 0, 0, 13, 0, 0, 0, 1, 1, 1, 0, 1, 1,
									 1, 1, 0, 0, 0, 14, 0, 15, 1, 1, 1, 1, 1, 0, 1, 1,
									 1, 1, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
									 1, 1, 0, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
									 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1,
									 1, 1, 0, 1, 12, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1,
									 1, 1, 13, 0, 1, 0, 0, 15, 0, 0, 12, 0, 1, 0, 1, 1,
									 1, 1, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 1, 0, 1, 1,
									 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1,// ROW END
									 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1];

// let level01_03 =  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
// 									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
// 									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
// 									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
// 									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
// 									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
// 									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
// 									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
// 									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
// 									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
// 									 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
// 									 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,// ROW END
// 									 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

// Support Multiple Levels
// let levelList = [level01_01, level01_02, level01_03];
// let levelNow = 1;
// let levelList = [theArena, slamZone];

let worldGrid = [];
const WORLD_GROUND = 0;
const WORLD_WALL = 1;
const PLAYER_START_POSITION = 2;
const WORLD_GOAL = 3;
const WORLD_KEY = 4;
const WORLD_DOOR = 5;
const SCROLL_RED = 6;

const STATUE_01 = 11;
const STATUE_02 = 12;
const STATUE_03 = 13;
const STATUE_04 = 14;
const STATUE_05 = 15;
const STATUE_06 = 16;
const STATUE_IRON = 17;

const GROUND_GRASS = 20;
const GROUND_DIRT = 21;
const WALL_VINES = 22;


// WARP to next screen
// const PLAYER_MAP_NAV = 100.5;

const WORLD_NAVIGATION_00 = 100;
const WORLD_NAVIGATION_00_R = 100.5;

const WORLD_NAVIGATION_01 = 101;
const WORLD_NAVIGATION_01_R = 101.5;

const WORLD_NAVIGATION_02 = 102;
const WORLD_NAVIGATION_02_R = 102.5;

const WORLD_NAVIGATION_03 = 103;
const WORLD_NAVIGATION_03_R = 103.5;

const WORLD_NAVIGATION_04 = 104;
const WORLD_NAVIGATION_04_R = 104.5;

const WORLD_NAVIGATION_05 = 105;
// const WORLD_NAVIGATION_05_R = 105.5;

// WORLD_INFORMATION
const WORLD_INFO_01 = 1001;
const WORLD_INFO_02 = 1002;
const WORLD_INFO_03 = 1003;
const WORLD_INFO_04 = 1004;
const WORLD_INFO_05 = 1005;
const WORLD_INFO_06 = 1006;
const WORLD_INFO_07 = 1007;
const WORLD_INFO_08 = 1008;
const WORLD_INFO_09 = 1009;
const WORLD_INFO_10 = 1010;


function returnTileTypeAtColRow(col, row) {
  if (col >= 0 && col < WORLD_COLS &&
      row >= 0 && row < WORLD_ROWS) {
    let trackIndexUnderCoord = rowColToArrayIndex(col, row);
    return worldGrid[trackIndexUnderCoord];
  } else {
    return WORLD_WALL;
  }
}

function getTileIndexAtPixelCoord(atX, atY) {
	var warriorWorldCol = Math.floor(atX / WORLD_W);
	var warriorWorldRow = Math.floor(atY / WORLD_H);
	var worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

	if(warriorWorldCol >= 0 && warriorWorldCol < WORLD_COLS &&
		warriorWorldRow >= 0 && warriorWorldRow < WORLD_ROWS) {
		return worldIndexUnderWarrior;
	} // end of valid col and row

	return undefined;
} // end of warriorWorldHandling func

function rowColToArrayIndex(col, row) {
  return col + WORLD_COLS * row;
}

function drawTracks() {

  let arrayIndex = 0;
  let drawTileX = 0;
  let drawTileY = 0;

  for(let eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
    for(let eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
      let tileKindHere = worldGrid[arrayIndex];
      let useImg = trackPics[tileKindHere];
			if (useImg != undefined) {
				// console.log(trackPics[tileKindHere]);
				// console.log(tileKindHere);
			}
      canvasContext.drawImage(useImg, drawTileX, drawTileY);

      arrayIndex += 1;
      drawTileX += WORLD_W;
    } // End of for each track
    drawTileX = 0;
    drawTileY += WORLD_H;
  }
} // End of drawBticks func
