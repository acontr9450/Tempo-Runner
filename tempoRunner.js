import runner from './runner.js'
import hurdle from './hurdle.js'

// Declare and assign image variables
const canvas = document.getElementById("trackCanvas");
const context = canvas.getContext("2d");
const run1 = document.getElementById("run1");
const run2 = document.getElementById("run2");
const hurdles = document.getElementById("hurdles");

//Declare game variables
let frameTimer = 0;
const runRate = 20;
let score = 0;
let isTrackRunning = false;
let isHurdle = true;
let count = 1;
const runX = 100;
const hurdleX = canvas.width;
const runY = canvas.height - 150;
const runWidth = 100;
const runHeight = 120;
let myRunner = new runner(runX, runY, runWidth, runHeight);
let myHurdle = new hurdle(hurdleX, runY, runWidth, runHeight);
let airHurdle = new hurdle(hurdleX, runY - 125, runWidth, runHeight)

//Start the track game with the start button
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
    if(!isTrackRunning){
        isTrackRunning = true;
        startButton.disabled = true;
        trackLoop();
    }
});

//handle jumping and sliding when up and down are pressed
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

//The game loop for drawing and handling all the moving objects
function trackLoop(){
    //declare variables needed for game
    frameTimer +=1;
    score += 1;

    //set hurdle speed and start moving it
    hurdle.setSpeed(score);

    //if hurdle on ground goes off screen create new hurdle object and hurdle drawing
    if(isHurdle){
        myHurdle.move(hurdle.getHurdleSpeed());
        count += 1;
        drawGame(myRunner, myHurdle, myRunner.isStriding, isHurdle);
        if(myHurdle.getX < -100){
            myHurdle = new hurdle(hurdleX, runY, runWidth, runHeight);
            count = 0;
            isHurdle = !isHurdle;
        }
        
        
    }
    //else if hurdle on air goes off screen create new hurdle object and hurdle drawing
    else{
        airHurdle.move(hurdle.getHurdleSpeed());
        count +=1;
        drawGame(myRunner, airHurdle, myRunner.isStriding, isHurdle);
        if(airHurdle.getX < -100){
            airHurdle = new hurdle(hurdleX, runY - 125, runWidth, runHeight);
            count = 0;
            isHurdle = !isHurdle;
        }
        
    }

    //if the runner and hurdle come into contact, end the game
    if((gameCondition(myRunner, myHurdle) && isHurdle) || (gameCondition(myRunner, airHurdle) && !isHurdle)){
        alert("Game Over!\nYour Score: " + score);
        return score;
    }

    //update frame after frame timer has reached the frame rate set
    if(frameTimer > runRate){
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

//draw game objects
function drawGame(runner, hurdle, stride, isHurdle){
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(stride){
        context.drawImage(run1, runX, runner.getY, runWidth, runHeight);
    }
    else{
        context.drawImage(run2, runX, runner.getY, runWidth, runHeight);
    }

    if(isHurdle){
        drawHurdle(hurdle.getX);
    }
    else{
        drawJumpHurdle(hurdle.getX, hurdle.getY);
    }
   
}

//draw hurdle and change xCoord
function drawHurdle(xCoord){
    context.drawImage(hurdles,xCoord, runY, runWidth, runHeight);
}
function drawJumpHurdle(xCoord, yCoord){
    context.drawImage(hurdles, xCoord, yCoord, runWidth, runHeight);
}

//handle collision logic of game
function gameCondition(runner, hurdle){
    const runnerX = runner.getX;
    const runnerY = runner.getY;
    const runnerWidth = runner.getWidth;
    const runnerHeight = runner.getHeight;
    const hurdleX = hurdle.getX;
    const hurdleY = hurdle.getY;
    const hurdleWidth = hurdle.getWidth;
    const hurdleHeight = hurdle.getHeight;
    if(runnerX < hurdleX + hurdleWidth &&
        runnerX + runnerWidth > hurdleX &&
        runnerY < hurdleY + hurdleHeight &&
        runnerY + runnerHeight > hurdleY){
        return true;
    }
    return false;
}