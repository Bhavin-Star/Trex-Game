var trex_r, trex_c, trex, ground,ground2, ground_i, ground_s, score, trex2, gamestate, trex2image, trex2g, gameover, gameoveri, restart1, restarti, sound1, sound2, sound3, s1, s2, s3 ;
var cloudsgroup, cloudimage, obstaclesgroup, o1, o2, o3, o4, o5, o6;

localStorage["HighestScore"] = 0;

function preload(){
  
  trex_r = loadAnimation('trex1.png', 'trex3.png', 'trex4.png');
  trex_c = loadAnimation('trex_collided.png');
  ground_s = loadImage('ground2.png');
//  ground2 = loadImage('ground2.png');
//  trex2image = loadImage('trexcollided.png');
  
  cloudimage = loadImage('cloud.png');
  o1 = loadImage('obstacle1.png');
  o2 = loadImage('obstacle2.png');
  o3 = loadImage('obstacle3.png');
  o4 = loadImage('obstacle4.png');
  o5 = loadImage('obstacle5.png');
  o6 = loadImage('obstacle6.png');
  
  gameoveri = loadImage('gameOver.png');
  restarti = loadImage('restart.png');

  s1 = loadSound('jump.mp3');
  s2 = loadSound("checkPoint.mp3");
  s3 = loadSound('die.mp3');

}

function setup() {
  createCanvas(600,200);
  
  trex = createSprite(50,180,50,50);
  trex.addAnimation('running',trex_r);
  trex.addAnimation("collided",trex_c);
  trex.scale = 0.5;
  
  ground = createSprite(400,180,800,10);
  ground.addImage('ground',ground_s);
  
  
  ground_i = createSprite(400,185,800,10);
  ground_i.visible = false;
  
  cloudsgroup = new Group();
  obstaclesgroup = new Group();
//  trex2g = new Group();
  
  score = 0;
  
  gamestate = 'play'
  
  gameover = createSprite(300,100,50,50); 
  gameover.addImage(gameoveri);
  gameover.scale = 0.5;
  
  restart1 = createSprite(300,135,50,50);
  restart1.addImage(restarti);
  restart1.scale = 0.5;
}

function draw() {
  background(180);
  
if (gamestate == 'play'){
  
  restart1.visible = false;
  gameover.visible = false;
  
  ground.velocityX = -5;
//  trex2g.destroyEach();
  score = score + Math.round(getFrameRate()/60);
  text ("Score: " + score, 500,50);
   
  if(score % 100 == 0 && (score > 0)){
    s2.play();    
  }
  
  
  trex.collide(ground_i);
    
  if (keyDown('space') && (trex.y >= 145)){
  trex.velocityY = -15;
//  trex.addImage(trex2image);
    s1.play();
  }
  trex.velocityY = trex.velocityY + 1;
  
  if (ground.x < 0){
   ground.x = 400; 
  }
  if (trex.isTouching(obstaclesgroup)){
    gamestate = 'end';
    s3.play();
  }
  
  spawnClouds();
  spawnobstacles();
}
  if (gamestate == 'end'){
   trex.velocityY = 0;
   obstaclesgroup.destroyEach(-1);
   cloudsgroup.destroyEach();
   ground.velocityX = 0;
 //  ground.addImage(ground2);
 //  trex.visible = false;
 // trex2 = createSprite(50, 180, 50, 50);
 //  trex2.addImage(trex2image);
 //trex2g.add(trex2);
 //trex2.scale = 0.5;
 //trex2.collide(ground_i);
 trex.changeAnimation('collided', trex_c);
    
  if (mousePressedOver(restart1)){
    restart();
  }
   
    restart1.visible = true;
    gameover.visible = true;
  }
  
  drawSprites();
    
  if (gamestate == 'end'){
          
    textSize(18);
    fill('black');
    text ('Your Score: ' + score,50,50);
  }

}
function spawnobstacles(){

  if(World.frameCount % 50 === 0){
      var cactus = createSprite(800,165,50,50);
      cactus.velocityX = -7;
      
      // add random obstacles
      var rand = Math.round(random(1,6));
      
    switch(rand){
    case 1: cactus.addImage(o1);
    break;
    
    case 2: cactus.addImage(o2);
    break;
    
    case 3: cactus.addImage(o3);
    break;
    
    case 4: cactus.addImage(o4);
    break;
    
    case 5: cactus.addImage(o5);
    break;
    
    case 6: cactus.addImage(o6);
    break;
   }
      cactus.scale = 0.5;
      cactus.lifetime = 300;
      obstaclesgroup.add(cactus);
  }
  }

function spawnClouds() {
  
  // To spawn the clouds after every 60th frame
 if (World.frameCount %  60 === 0 ){
      var cloud = createSprite(600,50,100,100);
      cloud.velocityX = -5;
      cloud.addImage(cloudimage);
      
      cloud.scale = 0.7;
     
     // To make clouds appear at random heights and add lifetime to it
      
      cloud.lifetime = 200;
  
    // To adjust Trex's depth
      trex.depth = cloud.depth + 1;
      cloudsgroup.add(cloud); 
      
}
}
function restart(){


  gamestate = 'play'
  score = 0;
  trex.visible = true;
  trex.changeAnimation('running',trex_r);
  
  if (localStorage["HighestScore"] < score){
   localStorage["HighestScore"] = score; 
  }
console.log(localStorage["HighestScore"]);
}



