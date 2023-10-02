class hurdle {
    static hurdles = 0;
    static hurdleSpeed = 5;

    constructor(x, y, width, height, ){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        hurdleCount += 1;
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
        this.hurdleSpeed += (time * 0.01)
    }

    static getHurdles(){
        return this.hurdles;
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

    move(){
        this.x -= this.hurdleSpeed;
    }
    
}

export default hurdle;