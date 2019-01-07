var donkeyKong = donkeyKong || {};


donkeyKong.mineBarrel = function(_game, _x, _y, _points, _speed, _direction, _level, _tag){
    donkeyKong.barrel.call(this, _game, _x, _y, _points, _speed, _direction, _level, _tag);
    
    this.mineActivated = false;
    this.explosionTime = 3;
    this.level = _level;
};

donkeyKong.mineBarrel.prototype = Object.create(donkeyKong.barrel.prototype);
donkeyKong.mineBarrel.prototype.constructor = donkeyKong.mineBarrel;

//Detecta si hay colisión del barril con los jugadores
donkeyKong.mineBarrel.prototype.hitJumpman = function(_barrel, _jumpman){
    if(_barrel.body.touching.up && _jumpman.body.touching.down){
        
        if(!this.mineActivated)
            _jumpman.JumpOnBarrel(1000);
        
        this.mineActivation();
    }
    else{
        if(_jumpman.hasHammer || _jumpman.starPowerUpActive){
            this.kill();
        }
        else{
            if(!this.mineActivated)
                this.level.hitJumpman(_jumpman);
        }
    }
};

donkeyKong.mineBarrel.prototype.mineActivation = function(){
    this.speed = 0;
    this.time = 0;
    this.mineActivated = true;
    this.level.mines.add(this);
}

donkeyKong.mineBarrel.prototype.checkExplosion = function(){
    if(this.mineActivated && this.time>this.explosionTime){
        var explosion = new donkeyKong.mineExplosion(this.game, this.body.x, this.body.y,'mineExplosion', this.level);
        this.game.add.existing(explosion);
        this.level.mines.remove(this);
        this.kill();
    }
}

