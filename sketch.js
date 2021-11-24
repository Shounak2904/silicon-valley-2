var PLAY=0
var END =1
var gameState= PLAY

var freeGuy,freeguyImg,backgroundImg,bg
var invisibleGround ,theif1,theif2,obstacleImg
var retryImg,gameOverImg,obstacleGroup

var score=0

function preload(){
  backgroundImg=loadImage("Images/SVbg.png")
  freeGuy_running=loadAnimation("Images/1.png","Images/2.png","Images/3.png")
  freeGuy_jumping=loadAnimation("Images/4.png","Images/5.png","Images/6.png","Images/7.png")
  theif1=loadImage("Images/theif1.png")
  theif2=loadImage("Images/theif2.png")
  obstacleImg=loadImage("Images/obstacle.png")
  retryImg=loadImage("Images/retry.png")
  gameOverImg=loadImage("Images/gameover.png")

}

function setup() {
  
  createCanvas(1500,700);
  obsatcleGroup=new Group()

  bg=createSprite(750, 350, 50, 50);
  bg.addImage("bg",backgroundImg)
  bg.scale=3
  bg.velocityX=-3

freeGuy=createSprite(100,460)
freeGuy.addAnimation ("Guy",freeGuy_running)
freeGuy.addAnimation ("Guy",freeGuy_jumping)
freeGuy.scale=3

gameOver = createSprite(600,100);
gameOver.addImage(gameOverImg);

retry = createSprite(600,140);
retry.addImage(retryImg);

gameOver.scale = 0.5;
  retry.scale = 0.5;

  gameOver.visible = false;
  retry.visible = false;

invisibleGround=createSprite(120,510,250,5)
invisibleGround.visible=false
}

function draw() {
  background(255,255,255);  

  if (gameState===PLAY){
    bg.velocityX = -(6 + 3*score/100);

  if (bg.x<0){ 
  bg.x=bg.width/2}



if(keyDown(UP_ARROW)){
freeGuy.changeAnimation("Guy",freeGuy_jumping)
freeGuy.velocityY=-14
}

freeGuy.velocityY=freeGuy.velocityY+0.5

 

//   if(obstacleGroup.isTouching(freeGuy)){
//     gameState = END;
//  }
}


else if (gameState === END) {
  gameOver.visible = true;
  retry.visible = true;
  
freeGuy.velocityX = 0
 
  bg.velocityX = 0;
  freeGuy.velocityY = 0;
  obstacleGroup.setVelocityXEach(0);
   
  obstacleGroup.setLifetimeEach(-1);
   
  if(mousePressedOver(retry) || keyDown("R")) {
    reset();
  }
}
freeGuy.collide(invisibleGround)
spawnTheif();
spawnObstacles();
drawSprites();
}


  function spawnObstacles() {
    if(frameCount % 120 === 0) {
      var obstacle = createSprite(1300,random(350,450),10,40);
   obstacle.addImage (obstacleImg)
      obstacle.velocityX = -(6 + 3*score/100);
     obstacle.scale=0.1
    }
    //obstacleGroup.add(obstacle)
      }

function spawnTheif(){
  if(frameCount%200===0){
    var theif=createSprite(1300,random(150,500),10,40)
    theif.addImage(theif2)
    theif.velocityX=-(6+score/100)
theif.scale=0.5
  }

}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacle.destroyEach();
  
  freeGuy.changeAnimation("Guy",freeGuy_running);
  
}