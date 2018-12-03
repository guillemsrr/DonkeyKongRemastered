var donkeyKong = donkeyKong || {};

donkeyKong.fireBall = function(_game, _x, _y, _speed, _direction, _level, _tag){
    Phaser.Sprite.call(this,_game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.animations.add('move',null,4,true);
    this.speed = _speed;
    this.direction = _direction;
    this.level = _level;
    this.game.physics.arcade.enable(this);
    this.outOfBoundsKill = true;
    
    this.IsGoingDown = false;
    this.isGoingDownStairs = false;
    this.goingDownTime = 0.5;
    this.goingDownCounter = 0;
    
    this.IsGoingUp = false;
    this.isGoingUpStairs = false;
    this.goingUpTime = 0.5;
    this.goingUpCounter = 0;
    
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
    
    /*
    console.log(this.IsGoingUp);
    //Random Bajar Escaleras
    if(!this.IsGoingDown){
        this.GoDownRand = Math.floor(Math.random() * 2);
        this.IsGoingDown = true;
    }
    
    //Random Subir Escaleras
    if(!this.IsGoingUp){
        this.GoUpRand = Math.floor(Math.random() * 2);
        this.IsGoingUp = true;
    }
    
    //Si la fireball se encuentra en la posición de una escalera y el random calculado antes es true, la fireball bajará las escaleras. Si no, seguirá recta.
    if(this.game.physics.arcade.overlap(this,this.level.finalStair) && this.GoDownRand && !this.IsGoingUp){
        this.isGoingDownStairs = true;
    }
    else if ((this.game.physics.arcade.overlap(this,this.level.stairs) || this.game.physics.arcade.overlap(this,this.level.finalStair)) && this.GoUpRand){
        this.isGoingUpStairs = true;
    }
    else{
        this.game.physics.arcade.collide(this,this.level.beams,this.movement,null,this);
        if(this.isInStair){
            this.IsGoingUp = false;
            this.body.velocity.y = 0;
            this.body.allowGravity = true;
            this.isGoingUpStairs = false;   
            this.direction *= -1;
            this.isInStair = false;   
        }  
        this.scale.x=this.direction;
        this.body.velocity.x = this.speed*this.direction;
    }
    
    if(this.isGoingDownStairs){
        this.GoingDownStairLogic();
    }
    if(this.isGoingUpStairs){
        this.GoingUpStairLogic();
    }
    */
    // ---
    
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
    
    if(!this.game.physics.arcade.overlap(this,this.level.stairs) && !this.game.physics.arcade.overlap(this,this.level.finalStair)){
        this.IsGoingUp = false;
        this.IsGoingDown = false;
    }
    
    if(this.IsInStair){
        if(this.IsGoingUp){
            // Subir
            this.body.velocity.x = 0;
            this.body.velocity.y = -this.speed;
            this.body.allowGravity = false;
        }
        else if(this.IsGoingDown){
            // bajar
            this.body.velocity.x = 0;
            this.body.velocity.y = this.speed;
            this.body.allowGravity = false;
            
            if(!this.overlapFinalStair){
                if(this.game.physics.arcade.collide(this,this.level.beams)){
                    this.IsGoingDown = false;
                }
            }
        }
        else{
            // salir
            this.body.allowGravity = true;
            
            //this.game.physics.arcade.collide(this,this.level.beams,this.movement,null,this);
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
        //this.game.physics.arcade.collide(this,this.level.beams,this.movement,null,this);
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
    
    // ---
    
    
}

//-------------------MOVIMIENTO LATERAL DE LA FIREBALL-------------------------
donkeyKong.fireBall.prototype.movement = function(_fireball, _beam){
    if(_fireball.body.touching.down && _beam.body.touching.up){
        if(this.body.y - this.lastPos > 1){
            this.IsGoingUp = false;
            this.body.allowGravity = true;
            this.IsGoingDown = false;
            this.direction *= -1;
            this.goingDownCounter = 0;
            this.goingUpCounter = 0;
        }
        this.lastPos = this.body.y;
    }
};

//------------------------FUNCIÓN DE LA LÓGICA DE BAJAR ESCALERAS DE LAS BOLAS DE FUEGO-------------------
donkeyKong.fireBall.prototype.GoingDownStairLogic = function(){
    if(this.goingDownCounter < this.goingDownTime){
        this.game.physics.arcade.collide(this,this.level.beams,this.movement,null,this);
        this.goingDownCounter += this.game.time.physicsElapsed;
    }
    else{
        this.body.velocity.x = 0;
        this.body.velocity.y = this.speed;
        this.body.allowGravity = false;
    }
};

//------------------------FUNCIÓN DE LA LÓGICA DE SUBIR ESCALERAS DE LAS BOLAS DE FUEGO-------------------
donkeyKong.fireBall.prototype.GoingUpStairLogic = function(){
    if(this.goingUpCounter < this.goingUpTime){
        this.game.physics.arcade.collide(this,this.level.beams,this.movement,null,this);
        this.goingUpCounter += this.game.time.physicsElapsed;
    }
    else{
        if(!this.isInStair){
            this.body.velocity.x = 0;
            this.isInStair = true;
            this.body.allowGravity = false;
        }

        if(this.isInStair){
            this.body.velocity.y = -this.speed;
        }
        
    }
}

//------------------FUNCIÓN PARA MATAR AL PLAYER-----------------------
donkeyKong.fireBall.prototype.hitJumpman = function(_fireball, _jumpman){
    this.level.hitJumpman(_jumpman);
};