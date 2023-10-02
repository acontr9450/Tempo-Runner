import runner from './runner.js'

// Declare and assign variables
const canvas = document.getElementById("trackCanvas");
const context = canvas.getContext("2d");
const run1 = document.getElementById("run1");
const run2 = document.getElementById("run2");
let frameTimer = 0;
let runRate = 10;
let isTrackRunning = false;
const runX = 0;
const runY = canvas.height - 150;
const runWidth = 100;
const runHeight = 120;

let myRunner = new runner(runX, runY, runWidth, runHeight);

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

    //drawing logic for obstacles

    frameTimer +=1;
    //update frame after frame timer has reached the rate set or on input
    if(frameTimer > 20){
        //update track game logic here
        frameChange();
        frameTimer = 0;
    }
    else{
        requestAnimationFrame(trackLoop);
    }
    let imageY = myRunner.getY;
    if(myRunner.isActive){
        imageY = myRunner.getY;
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawJump(imageY, myRunner.isStriding);
    }
    //draw player character
    else{
        if(myRunner.isStriding){
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(run1, runX, imageY, runWidth, runHeight);
        }
        else{
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(run2, runX, imageY, runWidth, runHeight);
        }
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

