class hurdle {
    static hurdleSpeed = 5;

    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    set setX(x)
        {this.x = x;}
    set setY(y)
        {this.y = y;}
    set setWidth(width)
        {this.width = width;}
    set setHeight(height)
        {this.height = height;}
    static setSpeed(time){
        this.hurdleSpeed += (time * 0.0000001)
    }

    static getHurdleSpeed(){
        return this.hurdleSpeed;
    }
    get getX()
        {return this.x;}
    get getY()
        {return this.y;}
    get getWidth()
        {return this.width;}
    get getHeight()
        {return this.height;}

    move(hurdleSpeed){
        this.x -= hurdleSpeed;
    }
    
}

export default hurdle;