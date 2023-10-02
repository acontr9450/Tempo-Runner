import runner from './runner.js'
import hurdle from './hurdle.js'

// Declare and assign variables
const canvas = document.getElementById("trackCanvas");
const context = canvas.getContext("2d");
const run1 = document.getElementById("run1");
const run2 = document.getElementById("run2");
const hurdles = document.getElementById("hurdles");
let frameTimer = 0;
const runRate = 20;
let score = 0;
let isTrackRunning = false;
let isHurdle = false;
const runX = 0;
const hurdleX = canvas.width;
const runY = canvas.height - 150;
const runWidth = 100;
const runHeight = 120;
let myRunner = new runner(runX, runY, runWidth, runHeight);
let myHurdle = new hurdle(hurdleX, runY, runWidth, runHeight);

//myRunner variables testing
/*console.log(myRunner.getX);
console.log(myRunner.getY);
console.log(myRunner.getWidth);
console.log(myRunner.getHeight);
console.log(myRunner.isActive);
console.log(myRunner.isStriding);
*/
/*
let myRunner = {
    drawImage("run1.png", )
};
*/


//Start the track game with the start button
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
    if(!isTrackRunning){
        isTrackRunning = true;
        startButton.disabled = true;
        trackLoop();
    }
});

//use drawImage() to get hurdle, steeple, and runners
//handle jumping and sliding
 document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp" && !myRunner.isActive){
        //handle jumping
        myRunner.jump();
    }
    else if (event.code === "ArrowDown" && !myRunner.isActive){
        //handle sliding
        myRunner.slide();
    }
});
//handle letting go of jumping and sliding
document.addEventListener(("keyup"), (event) => {
    if (event.code === "ArrowUp"){
        //handle stopping jump
        myRunner.unJump();

    }
    else if (event.code === "ArrowDown"){
        //handle stopping sliding
        myRunner.slide();
    }
});
//The game loop
function trackLoop(){

    //drawing logic for obstacle
    frameTimer +=1;
    score += 1;
    let imageY = myRunner.getY;
    let rand = Math.floor(Math.random() * 10);
    hurdle.setSpeed(score);
    myHurdle.move(hurdle.getHurdleSpeed());
    console.log(hurdle.getHurdleSpeed());
    if(myHurdle.getX < -100 && rand < 3){
        myHurdle = new hurdle(hurdleX, runY, runWidth, runHeight);
    }

    if(myRunner.isActive){
        imageY = myRunner.getY;
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawJump(imageY, myRunner.isStriding);
        drawHurdle(myHurdle.getX);
    }
    //draw player character
    else{
        if(myRunner.isStriding){
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(run1, runX, imageY, runWidth, runHeight);
            drawHurdle(myHurdle.getX);
        }
        else{
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(run2, runX, imageY, runWidth, runHeight);
            drawHurdle(myHurdle.getX);
        }
    }
    //update frame after frame timer has reached the rate set or on input
    if(frameTimer > runRate){
        //update track game logic here
        frameChange();
        frameTimer = 0;
    }
    else{
        requestAnimationFrame(trackLoop);
    }
}

//clear canvas and request new animation frame
function frameChange(){
    myRunner.toggleStride();
    context.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(trackLoop);
}

//draw runner jumping
function drawJump(y, stride){
    if(stride){
        context.drawImage(run1, runX, y, runWidth, runHeight);
    }
    else{
        context.drawImage(run2, runX, y, runWidth, runHeight);
    }
}

function drawHurdle(xCoord){
    context.drawImage(hurdles,xCoord, runY, runWidth, runHeight);
}

function gameCondition(runner, hurdle){
    if(runner.getX === hurdle.getX && runner.getY === hurdle.getY){
        return true;
    }
    return false;
}