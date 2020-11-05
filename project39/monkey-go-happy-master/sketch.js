
var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage, bananagroup;
var FoodGroup, obstacleGroup,obstacle;
var score = 0;
var background2,background_image,invisibleGround,background;

var gameover, gameover_image;

var health = 50;
var Health = 3;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
   monkey_collided = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage= loadImage("obstacle.png"); 
  
  gameover_image = loadImage("game over image.png");
  
  background_image = loadImage("forest.png");
 
}



function setup() {
 createCanvas(400,400);  

 background2 = createSprite(200,200,400,400);
 background2.addImage(background_image);
 background2.scale = 2.3;
 
 
 background2.width/2;
  
 invisibleGround = createSprite(10,400,400,20);
 invisibleGround.velocityX = -3;
 invisibleGround.width/2;
 invisibleGround.visible = false;
  
 monkey = createSprite(100,320,20,20); 
 monkey.addAnimation("running",monkey_running);
  
 monkey.scale = 0.2;

 gameover = createSprite(200,300);
 gameover.addImage(gameover_image);

 gameover.scale = 2;
  
 bananagroup = createGroup();
 obstacleGroup = createGroup();
}


function draw() {
  background("green");
  
if (gameState === PLAY){
  
   background2.velocityX = -(3 + 2 * score/4);

   gameover.visible = false;
   background2.visible = true;

  if (background2.x < 90){
    background2.x = background2.width/2; 
  }
  
  if (invisibleGround.x < 200){
     invisibleGround.x = invisibleGround.width/2;
  }
  
  if (keyDown("space") && monkey.y >= 250){  
     monkey.velocityY = -17;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(bananagroup.isTouching(monkey)){ 
     bananagroup.destroyEach();
    
     score = score + 1;
  }
  
  obstacles();
  food();
  
}
  
   if(obstacleGroup.isTouching(monkey)){
    health = health - 1;
   }

   if(health === 32){
     Health = 2;
   }
   if(health === 14){
    Health = 1;
  }
  if(health === 0){
    Health = 0;
  }


   if(health === 0){
     end();
     fill("white");
     textSize(15);
     text("press up arrow to get second chance", 50, 100);

     if(keyCode === 38){
      gameState = PLAY;
      
      health = 50;

      score = 0;
    }
   }

  

  
  monkey.collide(invisibleGround);
  
  drawSprites();
  fill("white");
  text("score: " + score, 10,10);

  fill("white");
  text("Health: " + Health, 310,10);
   }





function food () {
  if (frameCount % 80 === 0){
      banana = createSprite(400,100,20,20);
      banana.addImage(bananaImage);
      banana.y = Math.round(random(120,200));
      banana.velocityX = -(7 + score/3);
      banana.lifetime = 50;
      banana.scale = 0.2;
    
      bananagroup.add(banana);
  }
}

function obstacles(){
   if (frameCount % 300 === 0){
  obstacle = createSprite(300,350,20,20); 
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.4;

  obstacle.velocityX = -(7 + score/2);
     
  obstacle.setCollider("rectangle",0,0,30,30);
   obstacle.debug = true;
     
   obstacleGroup.add(obstacle);
 }
  
}

function end(){
 

    
    background2.visible = false;
    
    //health = health - 1;
    
   
    monkey.velocityX = 0;
    
    monkey.changeAnimation(monkey_collided);  
   
    invisibleGround.velocityX = 0; 

    gameover.visible = true;
    
   
    obstacleGroup.setVelocityXEach(0); 
    bananagroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1); 
    bananagroup.setLifetimeEach(-1); 
   
    monkey.velocityX = 0;
    bananagroup.destroyEach();
    obstacleGroup.destroyEach();
   
    
   
    

}






