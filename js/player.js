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
            if(!leftKey && !rightKey || leftKey && rightKey){}
            //slow
                this.xspeed *= this.friction
            }else if(rightKey){
                this.xspeed ++
            }else if(leftKey){
                this.xspeed --
            }
            this.x += this.xspeed
            this.y += this.yspeed
            //vertical movement

            //correct the speed
        }
    this.draw = function(){
        ctx.fillStyle = "green"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}