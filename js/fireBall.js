var donkeyKong = donkeyKong || {};

donkeyKong.fireBall = function(_game, _x, _y, _speed, _direction, _target, _level, _tag){
    Phaser.Sprite.call(this,_game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.animations.add('move',null,4,true);
    this.speed = _speed;
    this.direction = _direction;
    this.target = _target
    this.level = _level;
    this.game.physics.arcade.enable(this);
    this.outOfBoundsKill = true;
    
    this.IsGoingDown = false;
    this.isGoingDownStairs = false;
    this.goingDownTime = 0.5;
    this.goingDownCounter = 0;
    
    this.IsGoingUp = false;
    this.isGoingUpStairs = false;
    
    //Waiting
    this.waitingTime = 0.45;
    this.waitingCounter = 0;
    
    this.overlapStairs;
    this.overlapFinalStairs;
    
    // rework
    this.IsInStair = false;
    this.IsInFinalStair = false;
    this.getOutStairTime = 1.0;
    this.getOutStairCounter = 0;
    
    this.changedDirection = false;
    this.changeDirectionTime = 0.5;
    this.changeDirectionCounter = 0;
    
    //Collisioner:
    this.body.setCircle(6, 0, 4);
}

donkeyKong.fireBall.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.fireBall.prototype.constructor = donkeyKong.fireBall;


donkeyKong.fireBall.prototype.update = function(){
    this.game.physics.arcade.overlap(this,this.level.jumpman,this.hitJumpman,null,this);
    this.game.physics.arcade.overlap(this,this.level.jumpman2,this.hitJumpman,null,this);
    
    
    this.animations.play('move');
    
    if(this.game.physics.arcade.overlap(this,this.level.stairs)){
        
        this.overlapStairs = true;
        
        if(!this.IsInStair){
            this.GoUpRand = Math.floor(Math.random() * 2);
            
            if(this.GoUpRand){
                this.IsGoingUp = true;
                this.direction = this.scale.x *= -1;
            }
            this.IsInStair = true;
        }
    }
    else{
        this.overlapStairs = false;
    }
    
    if(this.game.physics.arcade.overlap(this,this.level.finalStair)){
        this.overlapFinalStair = true;
        
        if(!this.IsInStair){
            this.GoUpRand = Math.floor(Math.random() * 2);
            
            if(this.GoUpRand){
                this.IsGoingDown = true;      
                this.direction = this.scale.x *= -1;          
            }
            this.IsInStair = true;      
            
            
        }
    }
    else{
        this.overlapFinalStair = false;
    }
    
    if(!this.game.physics.arcade.overlap(this, this.level.stairs) && !this.game.physics.arcade.overlap(this,this.level.finalStair)){
        this.IsGoingUp = false;
        this.IsGoingDown = false;
    }
    
    if(this.IsInStair){
        if(this.IsGoingUp){
            // Subir
            this.WaitingFunction("up");
        }
        else if(this.IsGoingDown){
            // bajar
            this.WaitingFunction("down");
        }
        else{
            // salir
            this.Pursue(this.target);
            this.waitingCounter = 0;
            
            this.body.allowGravity = true;
            
            if(this.game.physics.arcade.collide(this,this.level.beams)){
                this.body.velocity.x = this.speed * this.direction;
            }
            
            this.getOutStairCounter += this.game.time.physicsElapsed;
            if(this.getOutStairCounter > this.getOutStairTime){
                this.IsInStair = false;
                this.getOutStairCounter = 0;
            }
        }
    }
    else{
        if(this.game.physics.arcade.collide(this,this.level.beams)){
            this.body.velocity.x = this.speed * this.direction;
        }
    }
    
    if(this.game.physics.arcade.collide(this,this.level.beamCollider)){
        if(!this.changedDirection){
            this.changedDirection = true;
            this.direction = this.scale.x *= -1;   
        }
    }

    if(this.changedDirection){
        if(this.changeDirectionCounter < this.changeDirectionTime){
            this.changeDirectionCounter +=this.game.time.physicsElapsed;
        }
        else{
            this.changedDirection = false;
            this.changeDirectionCounter = 0;
        }
    }
}

//-----------FUNCIÓN QUE DETECTA LA LOCALIZACIÓN DEL PLAYER-------
donkeyKong.fireBall.prototype.Pursue = function(_jumpman){
    if(this.direction < 0){
        if(this.x < _jumpman.x){
            this.direction = this.scale.x = 1;   
        }
    }
    else{
        if(this.x > _jumpman.x){
            this.direction = this.scale.x = -1;   
        }
    }
}


//------------------FUNCIÓN PARA MATAR AL PLAYER-----------------------
donkeyKong.fireBall.prototype.hitJumpman = function(_fireball, _jumpman){
    this.level.hitJumpman(_jumpman);
};

//------------------FUNCIÓN PARA SUBIR ESCALERAS-----------------------
donkeyKong.fireBall.prototype.GoUp = function(){
    this.body.velocity.x = 0;
    this.body.velocity.y = -this.speed;
    this.body.allowGravity = false;
};

//------------------FUNCIÓN PARA BAJAR ESCALERAS-----------------------
donkeyKong.fireBall.prototype.GoDown = function(){
    this.body.velocity.x = 0;
    this.body.velocity.y = this.speed;
    this.body.allowGravity = false;

    if(!this.overlapFinalStair){
        if(this.game.physics.arcade.collide(this,this.level.beams)){
            this.IsGoingDown = false;
        }
    }
};

//------------------FUNCIÓN DE DELAY PARA ESCALERAS-----------------------
donkeyKong.fireBall.prototype.WaitingFunction = function(_downOrUp){
    if(this.waitingCounter < this.waitingTime){
        if(this.game.physics.arcade.collide(this,this.level.beams))
            this.body.velocity.x = this.speed;
        this.waitingCounter += this.game.time.physicsElapsed;
    }
    else{
        if(_downOrUp == "up"){
            this.GoUp();
        }
        else if(_downOrUp == "down"){
            this.GoDown();
        }
    }
};