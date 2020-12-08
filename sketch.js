//Nothing Displaying

var dog, dogHappy
var database
var foodS, foodStock
var fedTime, lastFed;

function preload()
{
	dog1 = loadImage("./images/dogImg.png");
  dogHappy = loadImage("./images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(245,245,10,10);
  dog.addImage(dog1,dogImg.png);
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);  
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  drawSprites();
  
  textSize(55)
  fill(255,255,254);
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12 + " PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+lastFed + " AM",350,30)
  }
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}