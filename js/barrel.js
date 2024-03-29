var donkeyKong = donkeyKong || {};

donkeyKong.barrel = function(_game, _x, _y, _speed, _direction, _fallingDown, _level, _tag){
    Phaser.Sprite.call(this, _game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.animations.add('roll',[0,1,2,3],5,true);
    this.animations.add('front',[4, 5],10,true);
    this.speed = _speed;
    this.direction = _direction;
    this.fallingDown = _fallingDown;
    this.level = _level;
    
    this.game.physics.arcade.enable(this);
    this.outOfBoundsKill = true;
    
    this.isGoingDown = false;
    this.isFallingStairs = false;
    this.fallingTime = 0.1;
    this.fallingCounter = 0;
    this.time = 0;
    
    this.limitDown = gameOptions.gameHeight - 8*12;
    
    //this.body.setCircle(5);
};

donkeyKong.barrel.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.barrel.prototype.constructor = donkeyKong.barrel;

donkeyKong.barrel.prototype.update = function(){

    this.game.physics.arcade.collide(this,this.level.oil,this.spawnFireball,null,this);
       
    if(this.level.timeStopped || this.level.isPaused){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        
        this.body.allowGravity = false;
        this.animations.stop();
        
        return;
    }
    else{
        this.animations.play();
        this.body.allowGravity = true;        
    }
    
    if(!this.fallingDown){
        if(this.game.physics.arcade.overlap(this, this.level.jumpman)){
            this.hitJumpman(this, this.level.jumpman);
        }
        if(this.game.physics.arcade.overlap(this, this.level.jumpman2)){
            this.hitJumpman(this, this.level.jumpman2);
        }

        //Con esto nos aseguramos de que calcule el random 1 vez cada vez que está en una escalera y no 1 vez por frame
        if(!this.isGoingDown){
            this.GoDownRand = Math.floor(Math.random() * 2);
            this.isGoingDown = true;
        }
        //Si el barril se encuentra en la posición de una escalera y el random calculado antes es true, el barril caerá. Si no, seguirá recto.
        if(this.game.physics.arcade.overlap(this,this.level.finalStair) && this.GoDownRand == true){
            this.isFallingStairs = true;
        }
        else{
            this.animations.stop('front');
            this.animations.play('roll');
            this.game.physics.arcade.collide(this,this.level.beams,this.movement,null,this);

            this.fallingCounter = 0;
        }
            
        if(this.isFallingStairs){
            this.fallingStairLogic();
        }
    }
    else{
        
        if(this.game.physics.arcade.overlap(this, this.level.jumpman)){
            this.hitJumpman(this, this.level.jumpman);
        }
        if(this.game.physics.arcade.overlap(this, this.level.jumpman2)){
            this.hitJumpman(this, this.level.jumpman2);
        }
        
        if(this.y < this.limitDown){
            this.animations.play('front');
            this.body.velocity.x = 0;
            this.body.allowGravity = false;
            this.scale.x=1.1;
            if(this.game.physics.arcade.overlap(this,this.level.beams)){
                this.body.velocity.y = this.speed;
            }
            else{
                this.body.velocity.y = this.speed*2;
            }
        }
        else{
            this.body.velocity.y = 0;
            this.direction *= -1;
            this.scale.x=this.direction;
            this.body.velocity.x = this.speed*this.direction;
            this.fallingDown = false;
        }
    }
    
    this.time += this.game.time.physicsElapsed;
};

//Movimiento lateral del barril
donkeyKong.barrel.prototype.movement = function(_barrel, _beam){    
    if(this.body.y - this.lastPos > 5){
        this.IsGoingDown = false;
        this.direction *= -1;
    }
    this.lastPos = this.body.y;
    
    this.scale.x=this.direction;
    
    this.body.velocity.x = this.speed*this.direction;
};

//Detecta si hay colisión del barril con los jugadores
donkeyKong.barrel.prototype.hitJumpman = function(_barrel, _jumpman){
    if(_barrel.body.touching.up && _jumpman.body.touching.down){
        this.level.DestroyBarrel(this.x, this.y);
        this.destroyBarrel(_jumpman);
        this.kill();
        _jumpman.JumpOnBarrel(500);
    }
    else{
        if(_jumpman.hasHammer || _jumpman.starPowerUpActive){
            this.level.DestroyBarrel(this.x, this.y);
            this.destroyBarrel(_jumpman);
            this.kill();
            _jumpman.JumpOnBarrel(500);
        }
        else{
            if(!_jumpman.temporallyInmune)
                this.level.hitJumpman(_jumpman);
        }
    }
};

donkeyKong.barrel.prototype.destroyBarrel = function(_jumpman){
    
    //this.level.timeStopped = true;    
    //this.level.SpawnClockSprite(_jumpman);
    //this.level.timeStoppedCounter = 0;   
    
    //_jumpman.speedPowerUpActive = true;
    //this.level.timeStopped = true;
    //_jumpman.starPowerUpActive = true;
    //_jumpman.starPowerUpCounter = 0;
    //this.level.SpawnStarSprite(_jumpman);
    
    this.randomNum = Math.floor(Math.random() * 10);
    if(this.randomNum > 4){       
        if(this.randomNum < 6){
            _jumpman.speedPowerUpActive = true;
        }
        else if(this.randomNum < 8){
            this.level.timeStopped = true;    
            this.level.SpawnClockSprite(_jumpman);
            this.level.timeStoppedCounter = 0;    
        }
        else if(this.randomNum < 10){            
            _jumpman.starPowerUpActive = true;
            _jumpman.starPowerUpCounter = 0;

            this.level.SpawnStarSprite(_jumpman);
        }
    }
    
}

donkeyKong.barrel.prototype.spawnFireball = function(_barrel, _oil){
    this.level.SpawnFireBall(_oil);
    this.kill();
};

donkeyKong.barrel.prototype.fallingStairLogic = function(){
    
    if(this.fallingCounter < this.fallingTime){
        this.game.physics.arcade.collide(this,this.level.beams,this.movement,null,this);
        this.fallingCounter += this.game.time.physicsElapsed;
    }
    else{
            this.body.velocity.x = 0;
            this.animations.stop('roll');
            this.animations.play('front');
        
    }
};

