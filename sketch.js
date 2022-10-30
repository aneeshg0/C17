var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var ob1, ob2, ob3, ob4, ob5, ob6;
var PLAY = 1;
var END = 0;
var gameState = PLAY
var obstaclesGroup, cloudsGroup

var score;
var cloudImage

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");

  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
 
  
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)

  score = 0

  cloudsGroup = new Group()
  obstaclesGroup = new Group()
  
  //trex.debug = true
  trex.setCollider("circle", 0, 0, 50)
  //shape, x-offset, y-offset, radius/width/height
}

function draw() {
  background(160)

  text("Score- "+score, 500, 30)
  
  
  if(gameState == PLAY){
    score = Math.round(frameCount/10)

    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
    }
    
    trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    SpawnCloud()
    spawnObstacle()

    if(trex.isTouching(obstaclesGroup))
      gameState = END
  }

  else if(gameState == END){
    ground.velocityX = 0
    cloudsGroup.setVelocityXEach(0)
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setLifetimeEach(-1)
    obstaclesGroup.setLifetimeEach(-1)
    trex.changeAnimation("collided", trex_collided)
  }

//stop trex from falling down
  trex.collide(invisibleGround);
  
//console.log(Math.round(random(1,100)))

//modulus
console.log(24%6)

  drawSprites();
}

//function to spawn the clouds
function SpawnCloud() {
if(frameCount%60==0){
  var Cloud = createSprite(600, 100 , 10, 10)
  Cloud.addImage("cloud", cloudImage)
  Cloud.velocityX = -3
  Cloud.y = random(10, 100)

  cloudsGroup.add(Cloud)

  Cloud.depth = trex.depth
  trex.depth = trex.depth+1
  Cloud.lifetime = 180
}

}

function spawnObstacle(){
  if(frameCount%80==0){
    var obstacle = createSprite(600, 170, 10, 10)
    obstacle.velocityX = -4
    obstacle.lifetime = 200

    obstaclesGroup.add(obstacle)

    var anything = Math.round(random(1, 6))
    switch(anything){
      case 1: obstacle.addImage(ob1)
      break
      case 2: obstacle.addImage(ob2)
      break
      case 3: obstacle.addImage(ob3)
      break
      case 4: obstacle.addImage(ob4)
      break
      case 5: obstacle.addImage(ob5)
      break
      case 6: obstacle.addImage(ob6)
      break
    }
    obstacle.scale = 0.6
  }
    
  
}

