var forestImg, forest;
var gooseImg, goose, goosesGroup;
var flechaImg, flecha, flechasGroup;
var katniss, katnissImg, pin, pinImg;
var invisibleBlockGroup, invisibleBlock, extra, extraSound;
var gameState = "play"
var treasureCollection = 0;

function preload(){
  forestImg = loadImage("forest3.jpg");
  gooseImg = loadImage("goose.png");
  flechaImg = loadImage("flecha.png");
  katnissImg = loadImage("katniss.png");
  pinImg = loadImage("pin.png");
  extraSound = loadSound("checkpoint.mp3");
}

  
function setup(){
  createCanvas(800,400);
  //spookySound.loop();
  forest = createSprite(300,300);
  forest.addImage("forest",forestImg);
  //forest.velocityX = 1;
  forest.scale = 0.4;
  
  goosesGroup = new Group();
  flechasGroup = new Group();
  invisibleBlockGroup = new Group();
  pinsGroup = new Group();
  katniss = createSprite(100,350,50,50);
  katniss.scale = 0.1;
  katniss.addImage("katniss", katnissImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    spawngooses();
    spawnpin();
  
    katniss.x = World.mouseX;  
    katniss.y = World.mouseY;
  

    if(keyDown("space")){
      flecha = createSprite(katniss.x, katniss.y-30 );
      flecha.addImage("flecha", flechaImg);
      flecha.scale = 0.05;
      flecha.velocityX = 10;
      flechasGroup.add(flecha);

      
    }
    
    if (goosesGroup.isTouching(flechasGroup)) {
      goosesGroup.destroyEach();
      flechasGroup.destroyEach();
      //aumente a treasureCollection para 50
      treasureCollection=treasureCollection+1;
    }

    if(pinsGroup.isTouching(katniss)){
      treasureCollection=treasureCollection+50;
      extraSound.play();
      pinsGroup.destroyEach();
    }
    
    
    
    drawSprites();
    stroke("black");
    textSize(20);
    fill("yellow");
    text("Pontos: "+ treasureCollection,680,390);
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  

}

function spawngooses() {
  //escreva o código aqui para gerar portas na torre
  if (frameCount % 240 === 0) {
    var goose = createSprite(800, 400);
    goose.y = Math.round(random(150,300));
    goose.addImage(gooseImg);
    goose.scale = 0.3;
    goose.velocityX = -2;
    
    //atribua tempo de vida à variável
    goose.lifetime = 800;
     
    //adicione cada porta ao grupo
    goosesGroup.add(goose);
  
  }
}

function spawnpin() {
  //escreva o código aqui para gerar portas na torre
  if (frameCount % 100 === 0) {
    var pin = createSprite();
    pin.x = Math.round(random(50,790));
    pin.addImage(pinImg);
    pin.scale = 0.04;
    pin.velocityY = 2;
    
    //atribua tempo de vida à variável
    pin.lifetime = 800;
     
    //adicione cada porta ao grupo
    pinsGroup.add(pin);
  
  }
}