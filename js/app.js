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
let enemy


window.onload = function(){
    //assing canvas and context
    canvas = document.getElementById("game-canvas")
    ctx = canvas.getContext("2d")
    //draw on canvas

    //key listeners
    setupInputs()
    //Create Player
    player = new Player(1,200)

    //Create Borders
    borders.push(new Border(1, 300, 400, 100, 100))
    for(let i = 0; i < 20; i++){
        borders.push(new Border(0+100*i, 620, 100, 100, 1))
    }
    borders.push(new Border(0, 520, 100, 100, 2))
    borders.push(new Border(460, 110, 620, 100, 100))
    borders.push(new Border(600, 500, 50, 50, 100))

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
            retur
        }else if(e.key === "a" || e.key==="ArrowLeft"){
            leftKey = true
        }else if(e.key === "d" || e.key === "ArrowRight"){
            rightKey = true
        }
    })
    document.addEventListener("keyup", function(e){
        if(e.key ==="w" || e.key === "ArrowUp" ){
            upKey = false
        }else if(e.key === "a" || e.key==="ArrowLeft"){
            leftKey = false
        }else if(e.key === "d" || e.key === "ArrowRight"){
            rightKey = false
        }
    })
}

function checkIntersection(r1, r2){
    if(r1.x >= r2.x + r2.width){return false}
    else if(r1.x + r1.width <= r2.x){return false;}
    else if(r1.y >= r2.y + r2.height){return false;}
    else if(r1.y + r1.height <= r2.y){return false}
    else{return true}
}



function Player(x,y){
    this.x = x
    this.y = y
    this.jumping= true,
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
            this.yspeed += 9
            //vertical movement

            //correct the speed
            if(this.xspeed > this.maxSpeed) this.xspeed = this.maxSpeed
            else if(this.xspeed < -this.maxSpeed) this.xspeed = -this.maxSpeed
            if(this.yspeed > this.maxSpeed) this.yspeed = this.maxSpeed
            else if(this.yspeed < -this.maxSpeed) this.yspeed = -this.maxSpeed

            if(this.xspeed > 0){this.xspeed = Math.floor(this.xspeed)}
            else{this.xspeed = Math.ceil(this.xspeed)}

            let horizontalRect = {
                x: this.x + this.xspeed,
                y: this.y,
                width: this.width,
                height: this.height
            }
            let verticalRect ={
                x: this.x,
                y: this.y + this.yspeed,
                width: this.width,
                height: this.height
            }

            //check for intersections
            borders.forEach((border)=>{
                let borderRect ={
                    x: border.x,
                    y: border.y,
                    width: border.width,
                    height: border.height
                }
                if(checkIntersection(horizontalRect, borderRect)){
                    while(checkIntersection(horizontalRect, borderRect)){
                        horizontalRect.x -= Math.sign(this.xspeed)//tell us if its positive or negative
                    }
                    this.x = horizontalRect.x
                    this.xspeed = 0
                }
                if(checkIntersection(verticalRect, borderRect)){
                    while(checkIntersection(verticalRect, borderRect)){
                        verticalRect.y -= Math.sign(this.yspeed)
                    }
                    this.y = verticalRect.y
                    this.yspeed = 0
                }
            })

            this.x += this.xspeed
            this.y += this.yspeed
        }
    this.draw = function(){
        ctx.fillStyle = "green"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
}






function Border(x, y, width, height, type){
    this.x = x;
    this.y = y;
    this.width  = width;
    this.height = height;
    this.type = type;

    this.draw = function(){
        if(this.type === 1){ctx.fillStyle = "blue"}
        else if(this.type === 2){ctx.fillStyle = "red"}
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}