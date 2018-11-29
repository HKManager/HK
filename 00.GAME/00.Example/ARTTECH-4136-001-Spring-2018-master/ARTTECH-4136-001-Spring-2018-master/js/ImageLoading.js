let playerAvatar = document.createElement("img");

let trackPics = [];
// let roadPic = document.createElement("img");
// let wallPic = document.createElement("img");
// let goalPic = document.createElement("img");
// let treePic = document.createElement("img");
// let flagPic = document.createElement("img");

let picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady() {
  picsToLoad -= 1;
  // console.log(picsToLoad);
  if (picsToLoad == 0) {
    imageLoadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload = countLoadedImagesAndLaunchIfReady;
  imgVar.src = "images/" + fileName;
}

function loadImageForTrackCode(trackCode, fileName) {
  trackPics[trackCode] = document.createElement("img");
  beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
  let imageList = [
    {varName: playerAvatar, theFile: "warrior.png"},

    {trackType: WORLD_GROUND, theFile: "world_ground.png"},
    {trackType: WORLD_WALL, theFile: "world_wall.png"},
    {trackType: WORLD_GOAL, theFile: "world_goal.png"},
    {trackType: WORLD_KEY, theFile: "world_key.png"},
    {trackType: WORLD_DOOR, theFile: "world_door.png"},
    {trackType: SCROLL_RED, theFile: "scroll_red.png"},

    {trackType: STATUE_01, theFile: "crumbled_column_1.png"},
    {trackType: STATUE_02, theFile: "crumbled_column_2.png"},
    {trackType: STATUE_03, theFile: "crumbled_column_3.png"},
    {trackType: STATUE_04, theFile: "crumbled_column_4.png"},
    {trackType: STATUE_05, theFile: "crumbled_column_5.png"},
    {trackType: STATUE_06, theFile: "crumbled_column_6.png"},
    {trackType: STATUE_IRON, theFile: "statue_iron.png"},

    {trackType: GROUND_GRASS, theFile: "dirt_g.png"},
    {trackType: GROUND_DIRT, theFile: "dirt_1.png"},
    {trackType: WALL_VINES, theFile: "brick_brown-vines_3.png"},

    // NAVIGATING SCENES & PLACES
    // {trackType: PLAYER_MAP_NAV, theFile: "world_ground.png"},

    {trackType: WORLD_NAVIGATION_00, theFile: "world_ground.png"},
    {trackType: WORLD_NAVIGATION_00_R, theFile: "world_ground.png"},
    {trackType: WORLD_NAVIGATION_01, theFile: "world_ground.png"},
    {trackType: WORLD_NAVIGATION_01_R, theFile: "world_ground.png"},
    {trackType: WORLD_NAVIGATION_02, theFile: "world_ground.png"},
    {trackType: WORLD_NAVIGATION_02_R, theFile: "world_ground.png"},
    {trackType: WORLD_NAVIGATION_03, theFile: "world_ground.png"},
    {trackType: WORLD_NAVIGATION_03_R, theFile: "world_ground.png"},
    {trackType: WORLD_NAVIGATION_04, theFile: "world_ground.png"},
    {trackType: WORLD_NAVIGATION_04_R, theFile: "world_ground.png"},

    {trackType: WORLD_NAVIGATION_05, theFile: "dirt_g.png"},

    // DIALOGUE
    {trackType: WORLD_INFO_01, theFile: "world_info.png"},
    {trackType: WORLD_INFO_02, theFile: "world_info.png"},
    {trackType: WORLD_INFO_03, theFile: "world_info.png"},
    {trackType: WORLD_INFO_04, theFile: "world_info_02.png"},
    {trackType: WORLD_INFO_05, theFile: "world_info.png"},
    {trackType: WORLD_INFO_06, theFile: "world_info_02.png"},
    {trackType: WORLD_INFO_07, theFile: "world_info_02.png"},
    {trackType: WORLD_INFO_08, theFile: "world_info.png"},
    {trackType: WORLD_INFO_09, theFile: "world_info_02.png"},
    {trackType: WORLD_INFO_10, theFile: "world_info.png"},
  ];

  picsToLoad = imageList.length;

  for (let i = 0; i < imageList.length; i++) {
    if (imageList[i].varName != undefined) {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    } else {
      loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
    }

  }

}
