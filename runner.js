class runner {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.active = false;
        this.stride = false;
        this.frame = 21;
    }

    set setX(x)
        {this.x = x;}
    set setY(y)
        {this.y = y;}
    set setWidth(width)
        {this.width = width;}
    set setHeight(height)
        {this.height = height;}
    set setFrame(frame)
        {this.frame = frame;}
    toggleActive()
        {this.active = !this.active;}
    toggleStride()
        {this.stride = !this.stride;}
    
    get getX()
        {return this.x;}
    get getY()
        {return this.y;}
    get getWidth()
        {return this.width;}
    get getHeight()
        {return this.height;}
    get isActive()
        {return this.active;}
    get isStriding()
        {return this.stride;}
    get getFrame()
        {return this.frame;}

    jump(){
        this.active = true;
        this.y -= 75;
    }
    unJump(){
        this.active = false;
        this.y += 75;
         this.frame += 1;
    }
    //this slide doesn't need an unslide since it can just be toggled again to unslide
    slide(){
        this.toggleActive();
        let temp = this.width;
        this.width = this.height;
        this.height = temp; 
    }
    
}

export default runner;