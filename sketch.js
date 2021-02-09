var sword, swordImage;
var fruit,fruitGroup;
var applesImage, orangesImage;
var grapeImage;
var fruit4, lemonImage;
var microbe,microbeImage, enemyGroup;
var PLAY=1;
var END=0;
var gameState = PLAY;

var score;
var gameover,gameoverImage;
var position,r;
var gameoversound, knifesound;
var bcg,bcgImage;

function preload(){
   microbeImage = loadAnimation("alien1.png","alien2.png")
  
  swordImage = loadImage("sword.png");
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
   gameoverImage = loadImage("gameover.png");
  gameoversound = loadSound("gameover.mp3");
  knifesound = loadSound("knifeSwooshSound.mp3");
  bcgImage = loadImage("44840611-noce-naturale-woodgrain-trama-con-crack.jpg");
}

function setup(){
  createCanvas(windowWidth, windowHeight);


 
  bcg = createSprite(200,200,600,400);
  bcg.addImage(bcgImage);
  bcg.scale=3;
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.5;

  gameover = createSprite(300,200,20,20);
  gameover.addImage(gameoverImage);
  gameover.scale = 2;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();

  score = 0
  
  sword.setCollider("circle",0,0,30);
  sword.debug = false;
 
 
}
function draw(){
 
 background("lightyellow");
 
 let display = touches.length + ' touches';
  text(display, 5, 10);
  
  
  sword.x=World.mouseX;
  sword.y=World.mouseY;
    
   r = Math.round(random(1,4));
  
   a = Math.round(random(1,4));
  
Fruit();
enemy();
 
  if(gameState===PLAY){
     gameover.visible=false;
    
   if(fruitGroup.isTouching(sword)) { 
   fruitGroup.destroyEach();
     
     knifesound.play();
         score=score+3; 
   }
  }
  if(enemyGroup.isTouching(sword)) {
    enemyGroup.destroyEach();
    
    gameoversound.play();
    gameState=END
    
  } if (gameState===END) {
    sword.destroy();
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();  
    gameover.visible=true;
  }
  
    
  drawSprites();
    
  
  fill("black");
  textSize(18);
  text(" score ="+score,500,20);
}
function Fruit(){

  if(frameCount%80===0){
  
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
  
    r = Math.round(random(1,4));
    if (r===1){
  
      fruit.addImage(fruit1Image);
      
    }
    
    else if (r===2){
    
      fruit.addImage(fruit2Image);
    }
    else if (r===3){
    
      fruit.addImage(fruit3Image);
    }
    else{
    
      fruit.addImage(fruit4Image);
    
    }
    
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX=-7;
    position=Math.round(random(1,2));
    if (position===1){
      
      fruit.x=400;
      fruit.velocityX=-(8+(score/4));
    }
    else if (position===2){
      
      fruit.x=0;
      fruit.velocityX=(8+(score/4));
    }
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  
  }

 
}
   
function enemy(){
   if(World.frameCount%80==0){
  microbe = createSprite(300,300,20,20);
  microbe.addAnimation("moving", microbeImage); 
  microbe.scale=1;
  microbe.y=Math.round(100,300);
  microbe.velocityX=-(8 + score/12); 
  microbe.setLifetime = 100;
 
   enemyGroup.add(microbe);  
}
}