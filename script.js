const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score")
const menuPausa = document.getElementById("contenedor-pausa");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocidadX = 0, velocidadY = 0;
let setIntervalID;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random()*30) + 1;
    foodY = Math.floor(Math.random()*30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalID);
    document.getElementById("modal").style.display = "flex";
    //alert("Game Over!")
    location.reload;
    if(score > highScore) highScore = score;
    document.querySelector(".high-score-final").innerHTML = `High Score: ${highScore}`
    document.querySelector(".score-final").innerHTML = `Final score: ${score}`
}

const pausado = (e) => {
    if(e.key === "Escape"){
        clearInterval(setIntervalID);
        document.querySelector(".contenedor-pausa").style.display = "flex";
    }
}

const continuar = () => {
    setInterval(initGame, 125)
    document.querySelector(".contenedor-pausa").style.display = "none";

}

const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocidadY != 1){
        velocidadX = 0;
        velocidadY = -1;
    }else if(e.key === "ArrowDown" && velocidadY != -1){
        velocidadX = 0;
        velocidadY = 1;
    }else if(e.key === "ArrowLeft" && velocidadX != 1){
        velocidadX = -1;
        velocidadY = 0;
    }else if(e.key === "ArrowRight" && velocidadX != -1){
        velocidadX = 1;
        velocidadY = 0;
    }
}

const retry = () => {
    document.getElementById("modal").style.display = "none";
    window.location.reload()
}

const initGame = () => {
    if(gameOver === true) return handleGameOver();
    highScoreElement.innerHTML = `High Score: ${highScore}`

    let htmlMarkup = `<div class= "food" style= "grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;

        highScore = score >= highScore?score:highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${score}`;
    };

    for(let i = snakeBody.length -1; i > 0; i--){
        snakeBody[i] = snakeBody[i -1];
    }

    snakeBody[0] = [snakeX, snakeY]

    snakeX += velocidadX;
    snakeY += velocidadY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class= "head" style= "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i != 0 && snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]){
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
//initGame();
setIntervalID = setInterval(initGame, 125)
document.addEventListener("keydown", changeDirection);
document.addEventListener("keydown", pausado);