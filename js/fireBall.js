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
    this.IsGoingUp = false;
    this.isGoingDownStairs = false;
    this.goingDownTime = 0.5;
    this.goingDownCounter = 0;
    
    this.overlapStairs = false;
    this.overlapFinalStair = false;
    
    //Collisioner:
    this.body.setCircle(6, 0, 4);
}

donkeyKong.fireBall.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.fireBall.prototype.constructor = donkeyKong.fireBall;


donkeyKong.fireBall.prototype.update = function(){
    this.game.physics.arcade.overlap(this,this.level.jumpman,this.hitJumpman,null,this);
    this.game.physics.arcade.overlap(this,this.level.jumpman2,this.hitJumpman,null,this);
    this.animations.play('move');
    
    
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
    if(this.game.physics.arcade.overlap(this,this.level.finalStair) && this.GoDownRand == true){
        this.isGoingDownStairs = true;
    }
    else{
        this.game.physics.arcade.collide(this,this.level.beams,this.movement,null,this);
        this.goingDownCounter = 0;
    }
    
    if(this.isGoingDownStairs){
        this.GoingDownStairLogic();
    }
    this.GoingUpStairLogic();
}

//-------------------MOVIMIENTO LATERAL DE LA FIREBALL-------------------------
donkeyKong.fireBall.prototype.movement = function(_fireball, _beam){
    if(_fireball.body.touching.down && _beam.body.touching.up){
        if(this.body.y - this.lastPos > 1){
            this.body.allowGravity = true;
            this.IsGoingDown = false;
            this.IsGoingUp = false;
            this.direction *= -1;
        }
        this.lastPos = this.body.y;
    }
    this.scale.x=this.direction;
    this.body.velocity.x = this.speed*this.direction;
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
    
    if(this.overlapStairs){
        if(!this.isInStair){
            if(this.GoUpRand == true){
                this.isInStair = true;
                this.body.allowGravity = false;
            }
        }
    } 
    else{
        if(this.isInStair){
            this.isInStair = false;
            this.body.allowGravity = true;
            return;            
        }  
    }
    
    if(this.isInStair){
        if(this.GoUpRand == true){
        this.body.velocity.y = -this.speed;
        }
        else{
            this.body.velocity.y = 0;            
        }
    }
}

//------------------FUNCIÓN PARA MATAR AL PLAYER-----------------------
donkeyKong.fireBall.prototype.hitJumpman = function(_fireball, _jumpman){
    this.level.hitJumpman(_jumpman);
};