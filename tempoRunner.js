import runner from './runner.js'

// Declare and assign variables
const canvas = document.getElementById("trackCanvas");
const context = canvas.getContext("2d");
const run1 = document.getElementById("run1");
const run2 = document.getElementById("run2");
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

//Animation for the track runner and obstacles
function trackLoop(){
    //update track game logic here
    myRunner.toggleStride();
    let imageY = myRunner.getY;
    //handle jumping and sliding
    document.addEventListener("keydown", (event) => {
        if (event.code === "ArrowUp" && !isActive){
            //handle jumping
            myRunner.jump();

        }
        else if (event.code === "ArrowDown" && !isActive){
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
    context.clearRect(0, 0, canvas.width, canvas.height);

    //draw player character
    if(myRunner.isStriding == true){
        context.drawImage(run1, runX, imageY, runWidth, runHeight);
    }
    else{
        context.drawImage(run2, runX, imageY, runWidth, runHeight);
    }
    
    
    //drawing logic for obstacles

    //continue game loop
    requestAnimationFrame(trackLoop);

}



