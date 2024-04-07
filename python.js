const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const game = document.getElementById("game");
const menu = document.getElementById("menu");
const displayTime = document.getElementById("time");
const displayScore = document.getElementById("score");
const btnRewind = document.getElementById("rewind");
const sliderRewind = document.getElementById("slider");
const btnCancel = document.getElementById("cancel")
const activate = document.getElementById("activate");
const userInput = document.getElementById("username");
const play = document.getElementById("play");
const progressBar = document.getElementById("rewind-progress-bar");
const checkPath = document.getElementById("path");


const up = new Audio();
up.src = "audio/up.mp3";
const right = new Audio();
right.src = "audio/right.mp3";
const left = new Audio();
left.src = "audio/left.mp3";
const down = new Audio();
down.src = "audio/down.mp3";
const effect = new Audio();
effect.src = "audio/rewind.mp3";
const eat = new Audio();
eat.src = "audio/eat.mp3"

var gameStatus = "paused";


play.addEventListener("click", function(){
    game.style.display = "flex";
    gameStatus = "start";
    menu.style.display = "none";
    
})

checkPath.addEventListener("click", function(){
    if(path == "off"){
        path = "on"
    }
    else if(path == "on"){
        path = "off"
    }
})

userInput.addEventListener("input", function(e){
    if(e.target.value == " "){
        play.setAttribute('disabled',true);
    }
    else{
        play.removeAttribute('disabled');
    }
})

window.addEventListener("keydown", function(e){
    if(e.key == " "){
        btnRewind.style.display = "none"
        btnCancel.style.display = "block"
        sliderRewind.style.display = "block"
        activate.style.display = "block"
        gameStatus = "paused"
        effect.play();
        sliderRewind.value = 5;
    }
})

function btnClicked(){
    btnRewind.style.display = "none"
    btnCancel.style.display = "block"
    sliderRewind.style.display = "block"
    activate.style.display = "block"
    gameStatus = "paused"
    effect.play();
    sliderRewind.value = 5;
}

function activateKingCrimson(){
    activate.style.display = "none"
    btnCancel.style.display = "none"
    sliderRewind.style.display = "none"
    btnRewind.style.display = "block"
    gameStatus = "start"
}


const cvsW = cvs.width;
const cvsH = cvs.height;
const scale = 20;
var newHead;
let path = "off";
    let fps = 10;
    let animation = null;
    let frame = null;
    let ffp =  null
    let directionPost;
    // let score = 6
  
    // Game Board
    const grid = {row:47,col:29}
    // let ms = 0;
    let m = 0;
    let h = 0;
    let s = 0;

    let displayS = 0;
    let displayM = 0;
    let displayH = 0;

    function GameWhole(){
        gameStart();
    }

    function gameStart(){
        gameRunning();
    } 
    
    function gameRunning(){
        animation = setInterval(snakeGame, 1000/fps); 
        console.log(animation)  
    }
    
    function snakeGame(){
        gameFunction()
    }
    
    const snake = {
        direction: "right",
        body: [
            {
                x: 25,
                y:16
            },
            {
                x: 24,
                y:16
            },
            {
                x: 23,
                y:16
            },
            {
                x: 22,
                y:16
            },
            {
                x: 21,
                y:16
            },
            {
                x: 20,
                y:16
            },
        ],
        
        food: [
            {
                x: Math.floor(Math.random() * grid.row),
                y: Math.floor(Math.random() * grid.col)
            },
            {
                x: Math.floor(Math.random() * grid.row),
                y: Math.floor(Math.random() * grid.col)
            },
            {
                x: Math.floor(Math.random() * grid.row),
                y: Math.floor(Math.random() * grid.col)
            }
        ],
        position: [],
        tempPost: [],
        tempDir: [],
    };
    
    function gameFunction(){
        drawGame();
        if(gameStatus == "start"){
            updateGame()
        }
    }
    
    // Draw all the Element of the Game
    function drawGame(){
        drawGameBoard()
        drawSnake()
        drawFood()
        if(path == "on"){
            drawPath();
        }
    } 
    
    function drawTemplate(){
        ctx.fillStyle = "#187bcd";
        ctx.fillRect(0,0,tempW,tempH);
    }

    function drawGameBoard(){

        // Column
        for(let c = 0; c < cvsW; c+=20){
            ctx.fillStyle = "#58BB43";
            for(let i = 0; i < cvsW; i+=20){
                ctx.fillRect(i,c,20,20);
            }
            
            ctx.fillStyle = "#1E8C45";
            for(let j = 20; j < cvsW; j+=40){
                ctx.fillRect(j,c,20,20);
            }
        }
        
        // Row
        for(let r = 0; r < cvsH; r+=40){
            ctx.fillStyle = "#1E8C45";
            for(let i = 0; i < cvsW; i+=20){
                ctx.fillRect(i,r,20,20);
            }
            
            ctx.fillStyle = "#58BB43";
            for(let j = 20; j < cvsW; j+=40){
                ctx.fillRect(j,r,20,20);
            }
        }
        
    }
    
    // Draw Snake
    function drawSnake(){
        for(let i = 0; i < snake.body.length; i++){
            const body = snake.body[i];
            let x = body.x * scale;
            let y = body.y * scale;
            let color = (i == 0) ? "#1167b1" : "#2a9df4";
            ctx.fillStyle = color;
            ctx.fillRect(x,y,scale,scale); 
        }
    }
    
    // Draw Food
    function drawFood(){
        for(let i = 0; i < snake.food.length; i++){
            const food = snake.food[i];
            let x = food.x * scale;
            let y = food.y * scale;
            ctx.fillStyle = "red";
            ctx.fillRect(x,y,scale,scale);
        }
    }

    function generateFood(){
        let newFood = {
                        x: Math.floor(Math.random() * grid.row),
                        y: Math.floor(Math.random() * grid.col)
                      }

        snake.food.push(newFood);
    }

    // Time
    function time(){
        // if(gameStatus == "start"){
        //     ms++;
        // }

        // if(ms == 60){
            // s += 1;
            // ms = 0;
            // }
    if(gameStatus == "start")s++;

    if(s == 60){
        m += 1;
        s = 0;
    }

    
    if(m == 60){
        h += 1;
        m = 0;
    }
    
    if(s < 10){
        displayS = "0" + s.toString();
    }else{
        displayS = s;
    }
    
    if(m < 10){
        displayM = "0" + m.toString();
    }else{
        displayM = m;
    }
    
    if(h < 10){
        displayH = "0" + h.toString();
    }else{
        displayH = h;
    }
    
    displayTime.innerHTML = displayH + ":" + displayM + ":" + displayS;

    }
   
  
    // Key Event
    document.addEventListener("keydown", function(e){
        if((e.key == 'w' || e.key == 'ArrowUp') && snake.direction != "down"){snake.direction = 'up'; up.play();}
        if((e.key == 'a' || e.key == 'ArrowLeft') && snake.direction != "right"){snake.direction = 'left'; left.play();}
        if((e.key == 'd' || e.key == 'ArrowRight') && snake.direction != "left"){snake.direction = 'right'; right.play();}
        if((e.key == 's' || e.key == 'ArrowDown') && snake.direction != "up"){snake.direction = 'down'; down.play();}
    })

    function updateGame(){
        // Snake Movement
        const head = snake.body[0];
        const oldHead = Object.assign({}, snake.body[0]);
        newHead = Object.assign({}, head);
        snake.tempPost = snake.body;

        if(snake.direction == "right") newHead.x = newHead.x + 1;
        if(snake.direction == "up") newHead.y = newHead.y - 1;
        if(snake.direction == "left") newHead.x = newHead.x - 1;
        if(snake.direction == "down") newHead.y = newHead.y + 1;
        directionPost = snake.direction;
        
        // Pass through walls and appear at the opposite side
        if(newHead.x < 0)newHead.x = grid.row;
        if(newHead.y < 0)newHead.y = grid.col;
        if(newHead.x > grid.row)newHead.x = 0;
        if(newHead.y > grid.col)newHead.y = 0;
        

            // Head Hits Body
            for(let i = 0; i < snake.body.length; i++){
                const body = snake.body[i];
                
                if(newHead.x == body.x && newHead.y == body.y){
                    // gameOver();
                    location.reload();
                }
            }
            
            // Eats Food
            let ate = false;
            for(let i = 0; i < snake.food.length; i++){
                const food = snake.food[i];
                if(newHead.x == food.x && newHead.y == food.y){
                    snake.food.splice(i, 1);
                    // score++;
                    // const newFood = {
                    //     x: Math.floor(Math.random() * grid.row),
                    //     y: Math.floor(Math.random() * grid.col)
                    // }
                    // snake.food.push(newFood);
                    ate = true
                    eat.play();
                }
            }         
            
                snake.body.unshift(newHead);
                if(!ate)snake.body.pop()
        }

    function gameOver(){
        let highscore = localStorage.getItem('highscore');

        if(snake.body.length > highscore) localStorage.setItem('highscore',snake.body.length);

        highscore = localStorage.getItem('highscore');

        alert("Game Over. Highscore: " + highscore);
        location.reload();
        
    }

    function scoreCount(){
            displayScore.innerHTML = snake.body.length;
    }
    
        
    let i = 0;
    let p = ["0","60","120","180","240","300"];
    function saveSnakePosition(){
        if(snake.position.length >= 5 ){
            snake.position.shift();
            snake.tempDir.shift();
        }
        var newPosition = snake.body.slice();
        var newDirection = snake.direction;
        snake.position.push(newPosition);
        snake.tempDir.push(newDirection);
        progressBar.style.width = p[i] + "px";
    

            console.log(i);
            console.log("Snake Position " + snake.position.length);

    }

    setInterval(() => {
            if(gameStatus == "start"){
                saveSnakePosition();
                i++
            }

            if(i == p.length){
                i = 5
            }
    }, 1000);

    sliderRewind.addEventListener("input", function(e){
            let val = e.target.value;
            // s -= 1;
            snake.body = snake.position[val] == undefined ? snake.body : snake.position[val];
            snake.direction = snake.tempDir[val];
            console.log(snake.direction);
           i = val;

            // for(let i = 0; i < snake.body.length; i++){
            //     let body = snake.body[i];
            //     if(newHead.x == body.x && newHead.y == body.y ){

            //     }
            // }

    })

    function drawPath(){
        for(let i = 0; i < snake.position.length; i++){
            // console.log("Snake Save "+snake.position[i][i].y)
            ctx.strokeStyle = "yellow"
            let x = snake.position[i][i].x * scale;
            let y = snake.position[i][i].y * scale;
            ctx.strokeRect(x,y,scale,scale);
        }
    }


        
    function cancelKingCrimson(){
        activate.style.display = "none"
        btnCancel.style.display = "none"
        sliderRewind.style.display = "none"
        btnRewind.style.display = "block"
        gameStatus = "start"
        snake.body = snake.tempPost;
        snake.direction = directionPost;
    }
        setInterval(() => {
            if(snake.food.length >= 5){
                return;
            }
            generateFood();
        },3000)
        // setInterval(drawPath,1000);
        setInterval(time,1000)
        setInterval(scoreCount,10)
        window.onload = GameWhole();