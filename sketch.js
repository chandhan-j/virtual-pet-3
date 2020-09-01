var dog,dog_is_happy,database,foodS,foodStock,dog_normal
var database;
var foodObj;
var time = new Date();
var hours = time.getHours();
var gameState = 0;
var bedroom,garden,washroom;



function preload(){
  dog_normal = loadImage("dogImg.png");
  dog_is_happy = loadImage("dogImg1.png");
  bedroom = loadImage("BedRoom.png");
  garden = loadImage("Garden.png")
  washroom = loadImage("WashRoom")
}

function setup() {
  createCanvas(500, 500);

  
  database = firebase.database();


  dog = createSprite(250,250,10,10);
  dog.addImage("dog",dog_normal);
  dog.addImage("dog is happy",dog_is_happy);

  foodStock = database.ref("food");
  foodStock.on("value",readStock);

  feed = createButton("Feed the dog");
  feed.position(650,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(750,95)
  addFood.mousePressed(addFoods)

  foodObj = new Food();

}


function draw() {  
  background(46,139,87);

  /*if(keyWentDown(UP_ARROW)){
    console.log("up");
    writeStock(foodS);
    dog.changeImage("dog is happy",dog_is_happy);
  }*/

  if(gameState != "Hungry"){
    feed.hide();
  }

  fill('white')

  if(foodObj.lastFed > 12){
    text("last fed : " +  foodObj.lastFed % 12 + "PM",320,30)
    console.log('1')
} else if(foodObj.lastFed == 0){
    text("last fed : 12 AM",350,30)
    console.log('2')
} else {
    text("last fed : " + foodObj.lastFed + "AM",320,30)
    console.log('3')
}


  fill(255,255,255)
  textSize(15)


  drawSprites();

  

  foodObj.display();
  
  //text("food remaining: " + foodS,200,150);


  console.log('food')

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x <= 0){
    x = 0
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    food:x
  })
}

function feedDog(){
  dog.addImage(dog_is_happy)
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1)
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    getFedTime:hour()
  })
  foodObj.lastFed = hours;
}

function addFoods(){
  foodObj.updateFoodStock(foodObj.getFoodStock() + 1)
  database.ref('/').update({
    food:foodObj.getFoodStock()
  })
}

function getState(){
  var gameStateRef = database.ref('gameState');
  gameStateRef.on("value",function(data){
    gameState = data.val()
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
} 



