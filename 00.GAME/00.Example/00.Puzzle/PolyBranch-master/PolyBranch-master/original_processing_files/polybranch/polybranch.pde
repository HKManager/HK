/* @pjs globalKeyEvents=true; 
 */

PVector[] tris = {
      new PVector(200,200),
      new PVector(400,200),
      new PVector(0,100)
    };
    
PShape[] levelText = new PShape[11];

boolean[] keys = new boolean[4];
      
int originX;
int originY;

boolean paused;
                
//Tree testTree;

Player player;
Game g;

PVector focalPoint;

void setup(){
  paused = true;
  size(800,800);
  //frameRate(30);
  originX = width/2;
  originY = height/2;
  
  for(int i = 0; i < levelText.length; i++){
    levelText[i] = loadShape("level"+(i+2)+".svg");
    levelText[i].disableStyle();
  }
  

  colorMode(HSB, 255);
  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(CENTER);
  shapeMode(CENTER);
  focalPoint = new PVector(width/2,height/2);
  noStroke();
  background(230);
  //testTree = new Tree(5, bob);
  
  player = new Player();
  g = new Game();
  //Layer layer = new Layer(16, width, height);
  noLoop();
}

void draw(){
  if(frameCount % 30 == 0){
    //println(frameRate);
    println("LEVEL "+g.level+"  SCORE:"+g.score+"  SPEED "+g.speed);
  }
  if(keys[0] || keys[1] || keys[2] || keys[3]){
    player.hue += g.speed*100;
    if(player.hue > 255){
      player.hue = 0;
    }
  }
  if(keys[0] || keys[1]){
    if(keys[0]){
      //originY += player.speed;
      player.velY += 0.3;
    }
    if(keys[1]){
      //originY -= player.speed;
      player.velY -= 0.3;
    }
  }else if(player.velY != 0.0){
    if(player.velY > 0){
      player.velY -= 0.5;
      if(player.velY < 0){
        player.velY = 0;
      }
    }else if(player.velY < 0){
      player.velY += 0.5;
      if(player.velY > 0){
        player.velY = 0;
      } 
    }
   
//    float brakes = (player.velY > 0) ? -0.5 : 0.5;
//    player.velY += brakes;
  }
  if(keys[2] || keys[3]){
    if(keys[2]){
      //originX += player.speed;
      player.velX += 0.3;
    }
    if(keys[3]){
      //originX -= player.speed;
      player.velX -= 0.3;
    }
  }else if(player.velX != 0.0){
    if(player.velX > 0){
      player.velX -= 0.5;
      if(player.velX < 0){
        player.velX = 0;
      }
    }else if(player.velX < 0){
      player.velX += 0.5;
      if(player.velX > 0){
        player.velX = 0;
      } 
    }
    
    //    float brakes = (player.velX > 0) ? -0.5 : 0.5;
//    player.velX += brakes;
  }
  
  
  originX += player.velX;
  originY += player.velY;
  
  if(dist(player.pos.x, player.pos.y, originX, originY) > (height/2 - player.r - 8)){
    float a = myAngleBetween(player.pos, new PVector(originX, originY))-PI;
    originX = (int)(player.pos.x + (height/2 - player.r - 8) * cos(a));
    originY = (int)(player.pos.y + (height/2 - player.r - 8) * sin(a));
  }
  
  background(235);
  g.update();  
}


//testtesttest
void mousePressed(){
 player.speed++;
}

void keyPressed(){
  if (keyCode == UP || key == 'w' || key == 'W') {
    keys[0] = true;
  }
  if (keyCode == DOWN || key == 's' || key == 'S') {
    keys[1] = true;
  }
  if (keyCode == LEFT || key == 'a' || key == 'A') {
    keys[2] = true;
  }
  if (keyCode == RIGHT || key == 'd' || key == 'D') {
    keys[3] = true;
  }
  
//  if(key == 'a'){
//    player.r -= 0.5;
//  }
//  if(key == 'z'){
//    player.r += 0.5;
//  }
//  
//  if(key == 's'){
//    g.numBranches ++;
//  }
//  if(key == 'x'){
//    g.numBranches --;
//  }
  
  if(key == 'p'){
    pause();
  }
  
  if(key == 'r'){
    newGame();
  }

}

void keyReleased(){
  if (keyCode == UP || key == 'w' || key == 'W') {
    keys[0] = false;
    //player.velY = 0;
  }
  if (keyCode == DOWN || key == 's' || key == 'S') {
    keys[1] = false;
    //player.velY = 0;
  }
  if (keyCode == LEFT || key == 'a' || key == 'A') {
    keys[2] = false;
    //player.velX = 0;
  }
  if (keyCode == RIGHT || key == 'd' || key == 'D') {
    keys[3] = false;
    //player.velX = 0;
  }
}

public void pause(){
  if(paused){
    loop();
    paused = false;
  }else{
    noLoop();
    paused = true;
  }
}

public void newGame(){
  g.newGame();
}

//void mouseMoved(){
//  originX = mouseX;
//  originY = mouseY;
//  //if(dist(int(mouseX),int(mouseY), int(width/2), int(height/2)) < width/2){
//    
//  //}
//}


//utility functions!
float myAngleBetween (PVector myPVector1, PVector myPVector2) {
  float a = atan2(myPVector1.y-myPVector2.y, myPVector1.x-myPVector2.x);
  if (a<0) { a+=TWO_PI; }
  return a;
}


void drawPolygon(float cX, float cY, float r, int numSides, float weight, color cIn){
  float a = TWO_PI / numSides;
  noFill();
  stroke(cIn);
  strokeWeight(weight);
  beginShape();
  for(int i = 0; i < numSides; i++){
    vertex(cX + r * cos(a*i), cY + r * sin(a*i));
  }
  endShape(CLOSE);
}

float easeInExpo(float x, float t, float b, float c, float d) {
  return (t==0) ? b : c * pow(2, 10 * (t/d - 1)) + b;
}
