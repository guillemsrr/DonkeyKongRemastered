var donkeyKong = donkeyKong || {};


donkeyKong.mineBarrel = function(_game, _x, _y, _points, _speed, _direction, _level, _tag){
    donkeyKong.barrel.call(this, _game, _x, _y, _points, _speed, _direction, _level, _tag);
    
    this.mineActivated = false;
    this.explosionTime = 3;
    //this.animations.add('mineExplosion', null, 10);
};

donkeyKong.mineBarrel.prototype = Object.create(donkeyKong.barrel.prototype);
donkeyKong.mineBarrel.prototype.constructor = donkeyKong.mineBarrel;

//Detecta si hay colisión del barril con los jugadores
donkeyKong.mineBarrel.prototype.hitJumpman = function(_barrel, _jumpman){
    if(_barrel.body.touching.up && _jumpman.body.touching.down){
        this.mineActivation();
        _jumpman.JumpOnBarrel();
    }
    else{
        if(_jumpman.hasHammer){
            this.kill();
        }
        else{
            this.level.hitJumpman(_jumpman);
            
        }
    }
};

donkeyKong.mineBarrel.prototype.mineActivation = function(){
    this.speed = 0;
    this.time = 0;
    this.mineActivated = true;
}

donkeyKong.mineBarrel.prototype.checkExplosion = function(){
    if(this.mineActivated && this.time>this.explosionTime){
        console.log("booooom");
        //this.animations.play('mineExplosion');
    }
    else{
        console.log("sdfsdf");
    }
    //else if()
    
}

