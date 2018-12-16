var donkeyKong = donkeyKong || {};

donkeyKong.jumpman = function(_game, _x, _y, _tag){
    Phaser.Sprite.call(this,_game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.game = _game;
    _game.physics.arcade.enable(this);

    //Variables
    this.speed = 90;
    this.normalSpeed = 90;
    this.powerUpSpeed = 180;
    this.jumpForce = 250;
    this.stairSpeed = 70;
    this.health = 3;
    this.hasHammer = false;
    this.hammerTime = 10;
    this.hammerCounter = 0;
    
    this.isInStair = false;
    
    this.leftPressed;
    this.rightPressed;
    this.upPressed;
    this.downPressed;
    
    this.overlapStairs;
    this.overlapFinalStair;
    
     
    //Animations
    this.animations.add('run',[0,1,2],10,true);
    this.animations.add('stairs',[3, 4, 5], 10, true);
    this.animations.add('endStairs',[6, 7], 10, true);
    this.animations.add('hammerIdle',[8, 9], 7, true);
    this.animations.add('hammerWalk',[12, 13, 14, 15], 7, true);
    this.animations.add('deathRoll',[16, 17, 18, 19], 10, true);
    this.animations.add('finalDeath',[10], 1, true);
    
    //Collisioner:
    //this.body.setSize(15, 20, 12, 15);
    this.body.setCircle(8, 10, 20);
    
    //Animation Variables:
    this.time = 0;
    this.deathRollTime = 2;
    this.deathRolling = false;
    
    // Powerup
    this.speedPowerUpActive = false;
    this.speedPowerUpCounter = 0;
    this.speedPowerUpTime = 3;
}

donkeyKong.jumpman.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.jumpman.prototype.constructor = donkeyKong.jumpman;

donkeyKong.jumpman.prototype.setInputs = function(rightPressed, leftPressed, upPressed, downPressed, overlapStairs, overlapFinalStair){
    
    this.rightPressed = rightPressed;
    this.leftPressed = leftPressed;
    this.upPressed = upPressed;
    this.downPressed = downPressed;
    
    this.overlapStairs = overlapStairs;
    this.overlapFinalStair = overlapFinalStair;
}

donkeyKong.jumpman.prototype.move = function(){    
    
    if(this.rightPressed){
        this.scale.x=1;
        this.body.velocity.x = this.speed;
        if(!this.hasHammer)
            this.animations.play('run');
        else
            this.animations.play('hammerWalk');
    }
    else if(this.leftPressed){
        this.scale.x=-1;
        this.body.velocity.x = -this.speed;
        if(!this.hasHammer)
            this.animations.play('run');
        else
            this.animations.play('hammerWalk');
    }
    else{
        this.body.velocity.x = 0;
        if(!this.hasHammer)
            this.animations.stop();
        else{
            this.body.velocity.x = 0;
            if(!this.hasHammer)
                this.animations.stop();
            else{
                this.animations.play('hammerIdle');
            }
        }
    }
}

donkeyKong.jumpman.prototype.jump = function(){
    if (this.upPressed && this.body.touching.down){
        this.body.velocity.y = -this.jumpForce;
    }
}

donkeyKong.jumpman.prototype.stairs = function(){
    
    if(this.overlapStairs){
        if(!this.isInStair){
            if(this.upPressed || this.downPressed){
                this.isInStair = true;
                this.body.allowGravity = false;
            }
        }
    }
    else if(this.overlapFinalStair){
        if(!this.isInStair){
            if(this.downPressed){        
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
        if(this.upPressed){
        this.body.velocity.y = -this.stairSpeed;
        this.animations.play('stairs');
        }
        else if(this.downPressed){
            this.body.velocity.y = this.stairSpeed;
            this.animations.play('stairs');
        }
        else{
            this.body.velocity.y = 0;            
        }
    }
}


donkeyKong.jumpman.prototype.die = function(){
    this.animations.play('deathRoll');
    this.health = 0;
    this.time = 0;
    this.deathRolling = true;
}

donkeyKong.jumpman.prototype.finalDeath = function(){
    if(this.deathRolling){
        this.time += this.game.time.physicsElapsed;
        if(this.time > this.deathRollTime){
            this.animations.play('finalDeath');
            this.deathRolling = false;
        }
    }
}

donkeyKong.jumpman.prototype.grabHammer = function(){
    this.hasHammer = true;
}

donkeyKong.jumpman.prototype.hammerLogic = function(){
    
    if(this.hammerCounter < this.hammerTime){
        this.hammerCounter += this.game.time.physicsElapsed;
    }
    else{
        this.hammerCounter = 0;        
        this.hasHammer = false;
    }
}

// power-ups
donkeyKong.jumpman.prototype.speedPowerUp = function(){
    if(this.speedPowerUpCounter < this.speedPowerUpTime){
        this.speedPowerUpCounter += this.game.time.physicsElapsed;
        
        this.speed = this.powerUpSpeed;
    }
    else{
        this.speed = this.normalSpeed;
        
        this.speedPowerUpActive = false;
        
        this.speedPowerUpCounter = 0;
    }
}


donkeyKong.jumpman.prototype.customUpdate = function(){
    //provisional
    if(this.health > 0){
        this.move();
        this.jump();
        this.stairs();
        
        if(this.speedPowerUpActive){
            this.speedPowerUp();
        }
    }
    else{
        this.finalDeath();    
    }
    
    if(this.hasHammer){
        this.hammerLogic();
    }
}