//drawing variables

let canvas
let ctx
let gameLoop
let player
let borders = [];

//create input variables

let upKey
let rightKey
let downKey
let leftKey


window.onload = function(){
    //assing canvas and context
    canvas = document.getElementById("game-canvas")
    ctx = canvas.getContext("2d")
    //draw on canvas

    //key listeners
    setupInputs()
    //Create Player
    player = new Player(100,400)

    //Create Borders
    for(let i = 0; i < 6; i++){
        borders.push(new Border(0+100*i, 620, 100, 100, 1))
    }
    borders.push(new Border(0, 520, 100, 100, 2))
    for(let i = 0; i < 3; i++){
        borders.push(new Border(600, 420 + 100 * i, 100, 100, 100))
    }

    //startGame loop
    gameLoop = setInterval(step, 1000/30)

    ctx.fillStyle = "white"
    ctx.fillRect(0,0,1280,720)
}

function step(){
    //step player
    player.step()

    draw()
}

function draw(){
    //clear the canvas
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,1280,720)

    player.draw()
    borders.forEach((border)=>border.draw())
}

function setupInputs(){
    document.addEventListener("keydown", function(e){
        if(e.key ==="w" || e.key === "ArrowUp"){
            upKey = true
        }else if(e.key === "a" || e.key==="ArrowLeft"){
            leftKey = true
        }else if(e.key === "d" || e.key === "ArrowRight"){
            rightKey = true
        }
    })
    document.addEventListener("keyup", function(e){
        if(e.key ==="w" || e.key === "ArrowUp"){
            upKey = false
        }else if(e.key === "a" || e.key==="ArrowLeft"){
            leftKey = false
        }else if(e.key === "d" || e.key === "ArrowRight"){
            rightKey = false
        }
    })
}

function Player(x,y){
    this.x = x
    this.y = y
    this.xspeed = 0 //horizontal speed of player
    this.yspeed = 0 //vertical speed of player
    this.friction = 0.6 //how quickly player slows down
    this.maxSpeed = 10
    this.width = 50
    this.height = 100
    this.active = true

    this.step = function(){
        //movement
        if(this.active){
            //Horizontal movement
            if(!leftKey && !rightKey || leftKey && rightKey){
            //slow
                this.xspeed *= this.friction
            }else if(rightKey){
                this.xspeed ++
            }else if(leftKey){
                this.xspeed --
            }
            if(upKey){
                this.yspeed -= 15
            }
            //Gravity
            this.yspeed += 5
            //vertical movement

            //correct the speed
            if(this.xspeed > this.maxSpeed){
                this.xspeed = this.maxSpeed
            }else if(this.xspeed < -this.maxSpeed){
                this.xspeed = -this.maxSpeed
            }
            if(this.yspeed > this.maxSpeed){
                this.yspeed = this.maxSpeed
            }else if(this.yspeed < -this.maxSpeed){
                this.yspeed = -this.maxSpeed
            }
        this.x += this.xspeed
        this.y += this.yspeed
        }
    }
    this.draw = function(){
        ctx.fillStyle = "green"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

function Border(x, y, width, height, type){
    this.x = x;
    this.y = y;
    this.width  = width;
    this.height = height;
    this.type = type;

    this.draw = function(){
        if(this.type === 1){
            ctx.fillStyle = "blue"
        }else if(this.type === 2){
            ctx.fillStyle = "red"
        }
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}