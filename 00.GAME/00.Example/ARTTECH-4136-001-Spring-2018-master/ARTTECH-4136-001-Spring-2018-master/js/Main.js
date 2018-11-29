let canvas, canvasContext;

let warrior = new Player();

let game_over = false;
let cheatMode = false;

window.onload = function() {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext('2d');
  canvasContext.font = '24px serif';

  // IMAGE LOAD
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');

  loadImages();

}

function imageLoadingDoneSoStartGame() {
  let framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);
  setupInput();

  loadLevel(level01_01, 100, 'init');
  warrior.currentMap = 'level01_01';
}

function loadLevel(whichLevel, tile_type ,reset_status) {
  worldGrid = whichLevel.slice();
  console.log("Created new map");
  warrior.reset(playerAvatar, "Blue Storm", tile_type, reset_status);
  console.log("Placed Player!")

}

function updateAll() {
  moveAll();
  drawAll();
}

function moveAll() {
  warrior.move();

}

function clearScreen() {
  colorRect(0, 0, canvas.width, canvas.height, 'black'); // Background
}

function drawAll() {
  // clearScreen();
  drawTracks();
  warrior.draw();

  // For Debugging
  // colorText("Keys: ", 10, canvas.height-10, 'blue');
  // colorText(warrior.keysHeld, 30, canvas.height-10, 'blue');

  // CHEAT MODE DISPLAY
  if (cheatMode) {
    colorText("CHEAT MODE ON (DEBUGGING): ", 10, canvas.height-50, 'blue');
  }

  // if (warrior.keyHeld_Action) {
  //   speech_ready = true;
  // }
  speechAction(speech_text);

  if (game_over) {
    gameOver();
  }

}

function gameOver() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  colorText("Prologue Complete... Chapter 01 coming soon...", canvas.width/2-250, canvas.height/2, 'white');

}
