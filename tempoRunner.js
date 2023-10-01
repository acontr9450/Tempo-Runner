import runner from './runner.js'

// Declare and assign variables
const canvas = document.getElementById("trackCanvas");
const context = canvas.getContext("2d");
let runRate = 10;
let runnerX = 50;
let runnerY = canvas.height - 100;
let myRunner = new runner(10, 10, 30, 40);
myRunner.toggleStride();

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

    context.clearRect(0, 0, canvas.width, canvas.height);

    //draw player character
    //drawing logic for obstacles

    //continue game loop
    requestAnimationFrame(trackLoop);

}

//handle jumping and sliding
document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp" && !isActive){
        //handle jumping
        //increase the y coords of runner

    }
    else if (event.code === "ArrowDown" && !isActive){
        //handle sliding
        //flip the x and y values of runner size
    }
});

//handle letting go of jumping and sliding
document.addEventListener(("keyup"), (event) => {
    if (event.code === "ArrowUp"){
        //handle stopping jump
        //bring y down back to floor
    }
    else if (event.code === "ArrowDown"){
        //handle stopping sliding
        //reflip the x and y values of runner
    }
});