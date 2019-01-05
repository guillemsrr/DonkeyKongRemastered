var donkeyKong = donkeyKong || {};

donkeyKong.jumpman = function(_game, _x, _y, _tag, _run, _jump, _scoreUp, _death, _itemGet, _hammer, _hud, jumpManNum){
    Phaser.Sprite.call(this,_game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.game = _game;
    _game.physics.arcade.enable(this);
    this.num = jumpManNum;
    this.hud = _hud;

    //Variables
    this.speed = 90;
    this.normalSpeed = 90;
    this.powerUpSpeed = 180;
    this.jumpForce = 250;
    this.stairSpeed = 70;
    this.health = 3;
    this.points = 0;
    
    //hammer
    this.hasHammer = false;
    this.hammerTime = 10;
    this.hammerCounter = 0;
    
    //lifes
    this.temporallyInmune = false;
    this.inmuneTimer = 0;
    this.maxInmuneTime = 2;
    
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
    this.animations.add('jump',[11], 1, true);
    this.isMoving = false;
    
    //Collisioner:
    //this.body.setSize(15, 20, 12, 15);
    this.body.setCircle(8, 10, 20);
    
    //Animation Variables:
    this.time = 0;
    this.deathRollTime = 2;
    this.deathRolling = false;
    
    //Audios:
    this.runSound = _run;
    this.jumpSound = _jump;
    this.scoreUpSound = _scoreUp;
    this.deathSound = _death;
    this.itemGetSound = _itemGet;
    this.hammerSound = _hammer;
    this.hammerSound.loop = true;
    this.hammerSound.stop();
    
    // Powerup speed
    this.speedPowerUpActive = false;
    this.speedPowerUpCounter = 0;
    this.speedPowerUpTime = 3;
    
    // Powerup star
    this.starPowerUpActive = false;
    this.starPowerUpCounter = 0;
    this.starPowerUpTime = 5;
    
    //Bonus Text
    this.bonusTime = 0;
    this.bonusMaxTime = 1;
    this.bonusActive = false;
    this.bonusText;
    
    
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
    if(this.body != null){//bug fixing
        if(this.rightPressed){
            if(!this.speedPowerUpActive){
                this.scale.x=1;            
                this.scale.y=1;            
            }
            else{
                this.scale.x = 1.3;
                this.scale.y = 1.3;
            }
            this.body.velocity.x = this.speed;
            this.isMoving = true;
            if(!this.runSound.isPlaying && this.body.touching.down)
                    this.runSound.play();
        }
        else if(this.leftPressed){
            if(!this.speedPowerUpActive){
                this.scale.x=-1;            
                this.scale.y=1;            
            }
            else{
                this.scale.x = -1.3;
                this.scale.y = 1.3;
            }

            this.body.velocity.x = -this.speed;
            this.isMoving = true;
            if(!this.runSound.isPlaying && this.body.touching.down)
                    this.runSound.play();
        }
        else{
            this.body.velocity.x = 0;
            this.isMoving = false;
        }
    }
    
}

donkeyKong.jumpman.prototype.jump = function(){
    if (this.upPressed && this.body.touching.down && !this.hasHammer){
        this.body.velocity.y = -this.jumpForce;
        if(this.runSound.isPlaying)
            this.runSound.stop();
        this.jumpSound.play();
        this.animations.play('jump');
    }
}

donkeyKong.jumpman.prototype.stairs = function(){
    if(this.hasHammer){
        return;
    }
    
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
            this.isMoving = true;
        }
        else if(this.downPressed){
            this.body.velocity.y = this.stairSpeed;
            this.isMoving = true;
        }
        else{
            this.body.velocity.y = 0;       
            this.isMoving = false;
        }
    }
}

donkeyKong.jumpman.prototype.die = function(){
    this.animations.play('deathRoll');
    this.health = 0;
    this.time = 0;
    this.deathRolling = true;
    if(!this.deathSound.isPlaying)
        this.deathSound.play();
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
    this.itemGetSound.play();
    if(!this.hammerSound.isPlaying)
            this.hammerSound.play();
}

donkeyKong.jumpman.prototype.hammerLogic = function(){
    
    if(this.hammerCounter < this.hammerTime){
        this.hammerCounter += this.game.time.physicsElapsed;
    }
    else{
        this.hammerCounter = 0;        
        this.hasHammer = false;
    }
    
    if(!this.hasHammer){
        this.hammerSound.stop();
    }
}

// power-ups
donkeyKong.jumpman.prototype.speedPowerUp = function(){
    if(this.speedPowerUpCounter == 0){
        this.setCenter
        this.scale.x = 1.5;        
        this.scale.y = 1.5;    
        this.anchor.setTo(.5);    
    }
    if(this.speedPowerUpCounter < this.speedPowerUpTime){
        this.speedPowerUpCounter += this.game.time.physicsElapsed;
        
        this.speed = this.powerUpSpeed;
    }
    else{
        this.speed = this.normalSpeed;
       
        this.scale.x = 1;
        this.scale.y = 1;
        this.anchor.setTo(.5);
        
        this.speedPowerUpActive = false;
        
        this.speedPowerUpCounter = 0;
    }
}

donkeyKong.jumpman.prototype.starPowerUp = function(){
    if(this.starPowerUpCounter < this.speedPowerUpTime){
        this.starPowerUpCounter += this.game.time.physicsElapsed;
    }
    else{
        this.starPowerUpActive = false;
        this.starPowerUpCounter = 0;
    }
}

donkeyKong.jumpman.prototype.marioAnimations = function(){
    if(this.hasHammer){
        if(this.isMoving){            
            this.animations.play('hammerWalk');
        }
        else{            
            this.animations.play('hammerIdle');
        }
    }
    else{
        if(!this.isInStair){
            if(this.isMoving){
                if(this.body.touching.down)
                    this.animations.play('run');
                else
                    this.animations.play('jump');
            }
            else{
                if(this.body.touching.down)
                    this.animations.play('run');
                this.animations.stop();
            }            
        }
        else{
            if(this.isMoving){
                this.animations.play('stairs');
            }
            else{
                this.animations.stop();
            }
        }
    }
}


donkeyKong.jumpman.prototype.customUpdate = function(){
    //provisional
    if(this.health > 0){
        this.move();
        this.jump();
        this.stairs();
        this.marioAnimations();
        
        if(this.speedPowerUpActive){
            this.speedPowerUp();
        }
        if(this.starPowerUpActive){
            this.starPowerUp();
        }
        
        this.BonusCounter();
    }
    else{
        this.finalDeath();    
    }
    
    if(this.hasHammer){
        this.hammerLogic();
    }
    
    if(this.temporallyInmune && this.game!=null){
        this.Inmunity();
    }
}

donkeyKong.jumpman.prototype.JumpOnBarrel = function(){
    this.scoreUpSound.play();
    this.points+=100;
    this.bonusText = this.game.add.text(this.body.position.x, this.body.position.y - 10, "100", hudStyle);
    this.bonusTime = 0;
    this.bonusActive = true;
    this.body.velocity.y = -this.jumpForce*0.75;
    
    //send it to the hud
    this.hud.setPoints(this.num, this.points);
}

donkeyKong.jumpman.prototype.BonusCounter = function(){
    if(this.bonusActive){
        if(this.bonusTime > this.bonusMaxTime){
            this.bonusActive = false;
            this.bonusText.destroy();
        }
        this.bonusTime += this.game.time.physicsElapsed
    }
}

donkeyKong.jumpman.prototype.Inmunity = function(){
    if(this.inmuneTimer > this.maxInmuneTime){
            this.temporallyInmune = false;
            this.inmuneTimer = 0;
    }
    this.inmuneTimer += this.game.time.physicsElapsed;
}