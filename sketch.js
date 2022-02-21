var hypnoticBall, database;
var position;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";

console.log("setting up ....")
  var hypnoticBallPosition = database.ref('position');
  console.log("reading now ")
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  console.log("position = = " + position)
  if (position !== undefined)
  {
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      console.log("up arrw pressed")
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    
  }
  drawSprites();
}

function writePosition(x,y){
  console.log ("position " + position)
  //console.log (position.y)

  database.ref('position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log("reading position " + position);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
