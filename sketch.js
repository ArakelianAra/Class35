var ball;
var db;
var position
function setup(){

    db = firebase.database();

    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    db.ref("Ball/Position").on("value", readPos, showErr);
    
}

function draw(){
    background("white");
    if(position!==undefined){

    
        if(keyDown(LEFT_ARROW)){
            changePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+1);
        }
        drawSprites();
    }
}

function changePosition(x,y){

db.ref("Ball/Position").set({
    x: ball.x+x,
    y: ball.y+y
    })
}

function readPos(data){
    position = data.val() //.val() - copies the data exactly to position

    ball.x = position.x;
    ball.y = position.y;
}

function showErr(){
    console.log("There is a problem in the database");
}
/*

READ - 
    .on() - turns on a listener that listens to the value changes in the database
        - Reads the values
        - Checks for errors - not necessary

WRITE/UPDATE
    .set() - changes/adds a new value

.ref() - refers to the field/value that we are interested
*/
