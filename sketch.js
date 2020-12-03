var Monkey;
var BG;
var bananaGroup, ObstacleGroup;
var Ground;
var score;


function preload(){
  monkey=loadAnimation("Monkey1.png","Monkey2.png", "Monkey3.png","Monkey4.png","Monkey5.png","Monkey6.png", "Monkey7.png", "Monkey8.png","Monkey9.png","Monkey10.png");
  BGimg=loadImage("jungle.jpg");
  Stone=loadImage("stone.png")
  banana=loadImage("banana.png")
}
function setup() {
  createCanvas(600, 400);
  BG=createSprite(200,200,400,400);
  BG.addImage(BGimg);
  Ground = createSprite(200,380,400,22);
  Ground.visible=false;
  Monkey = createSprite(100,340,20,20);
  Monkey.addAnimation("monkeyrunner",monkey);
  Monkey.scale=0.1;
  ObstacleGroup=new Group();
  bananaGroup=new Group();
  score=0;
}

function draw() {
  background("BG");
  Ground.velocityX=-20;
  Monkey.collide(Ground);
  BG.velocityX=-20;
 if(BG.x<90){
   BG.x=BG.width/2;
 }
 if(Ground.x<200){
    Ground.x=Ground.width/2;
  }
 if(keyDown("space") && Monkey.y>=210){
   Monkey.velocityY=-7;
 }
  Monkey.velocityY= Monkey.velocityY+0.8;
  rock();
  Banana();
  if(Monkey.isTouching(bananaGroup)){
    var rand=random(-5,-12)
    bananaGroup.destroyEach();
    Monkey.scale=Monkey.scale+0.03 
    score=score+1;
    bananaGroup.velocityX=rand;
    if(keyDown("space") && Monkey.y>=100){
   Monkey.velocityY=-8;
 }
  }
  if(Monkey.isTouching(ObstacleGroup) && score>0){
     ObstacleGroup.destroyEach();
     Monkey.scale=Monkey.scale-0.01;
    score=score+1;
    
  }
  drawSprites(); 
  stroke("black");
  textSize(50);
  textFont("Papyrus");
  fill("black");
  text("Score: " + score,100,50);
}
function rock(){
  if(World.frameCount%100===0){
  var stone=createSprite(400,350,5,5);
  stone.addImage(Stone);
  stone.scale=0.2;
  stone.velocityX=-10-score;
  stone.lifetime=200;
  ObstacleGroup.add(stone);
  console.log(stone.velocityX);
  }
}
function Banana(){
  if(World.frameCount%80===0){
    var fruit=createSprite(400,130,20,20);
    fruit.addImage(banana);
    fruit.scale=0.1;
    var rand=random(-10,-25)
    var randy=random(130,230);
    fruit.y=randy; 
    fruit.velocityX=rand;
    fruit.lifeTime=400;
    bananaGroup.add(fruit);
    
  }
}