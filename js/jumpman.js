var donkeyKong = donkeyKong || {};

donkeyKong.jumpman = function(_game, _x, _y, _tag){
    Phaser.Sprite.call(this,_game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.game = _game;
    _game.physics.arcade.enable(this);

    //Variables
    this.speed = 90;
    this.jumpForce = 250;
    this.stairSpeed = 70;
    this.health = 3;
    this.hasHammer = false;
    
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
    this.animations.add('death',[16, 17, 18, 19], 10, true);
    
    //this.body.setSize(15, 20, 12, 15);
    this.body.setCircle(8, 10, 20);
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
            this.animations.play('hammerIdle');
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
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.F))
        this.animations.play('death');
}

donkeyKong.jumpman.prototype.hammerPowerUp = function(){
    if(!this.hasHammer){
        this.hasHammer = true;
        this.time = 0;
        console.log("hammerMode");
    }
}


donkeyKong.jumpman.prototype.customUpdate = function(){
    //provisional    
    this.move();
    this.jump();
    this.stairs();
    this.die();
    
    //this.resetInputs();
    //this.hammerPowerUp();
}