import runner from './runner.js'
import hurdle from './hurdle.js'

// Declare and assign image variables
const canvas = document.getElementById("trackCanvas");
const context = canvas.getContext("2d");
const run1 = document.getElementById("run1");
const run2 = document.getElementById("run2");
const hurdles = document.getElementById("hurdles");
const track = document.getElementById("track");

//Declare game variables
let frameTimer = 0;
const runRate = 20;
let score = 0;
let isTrackRunning = false;
const runX = 100;
const hurdleX = canvas.width;
const runY = canvas.height - 150;
const runWidth = 100;
const runHeight = 120;
let myRunner = new runner(runX, runY, runWidth, runHeight);
let myHurdle = new hurdle(hurdleX, runY, runWidth, runHeight);

//Start the track game with the start button
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
    if(!isTrackRunning){
        isTrackRunning = true;
        startButton.disabled = true;
        drawBackground();
        trackLoop();
    }
});

//handle jumping and sliding when up and down are pressed
 document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp" && !myRunner.isActive && !(score % 20 === 0)){
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
    let imageY = myRunner.getY;
    let rand = Math.floor(Math.random() * 10);

    //set hurdle speed and start moving it
    hurdle.setSpeed(score);
    myHurdle.move(hurdle.getHurdleSpeed());

    //if hurdle goes off screen create new hurdle object and hurdle drawing
    if(myHurdle.getX < -100 && rand < 3){
        myHurdle = new hurdle(hurdleX, runY, runWidth, runHeight);
    }

    //if runner is jumping draw the runner jumping
    if(myRunner.isActive){
        imageY = myRunner.getY;
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawJump(imageY, myRunner.isStriding);
        drawHurdle(myHurdle.getX);
    }
    //else draw one of the striding images for runner
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

    //if the runner and hurdle come into contact, end the game
    if(gameCondition(myRunner, myHurdle)){
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

//draw track background
function drawBackground(){
    context.drawImage(track,0,0,canvas.width,canvas.height);
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

//draw hurdle
function drawHurdle(xCoord){
    context.drawImage(hurdles,xCoord, runY, runWidth, runHeight);
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