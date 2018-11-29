var donkeyKong = donkeyKong || {};

donkeyKong.jumpman = function(_game, _x, _y, _tag){
    Phaser.Sprite.call(this,_game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.game = _game;
    _game.physics.arcade.enable(this);

    //Variables
    this.speed = 150;
    this.jumpForce = 300;
    this.stairSpeed = 100;
    this.health = 3;
    this.hasHammer = false;
    
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
}

donkeyKong.jumpman.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.jumpman.prototype.constructor = donkeyKong.jumpman;

donkeyKong.jumpman.prototype.update = function(){
    //provisional
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.F))
        this.die();
    //this.hammerPowerUp();
    
    //this function stops the death roll animation
    this.finalDeath();
}

donkeyKong.jumpman.prototype.move = function(cursors){
    if(this.health>0){
        if(cursors.right.isDown){
        this.scale.x=1;
        this.body.velocity.x = this.speed;
        if(!this.hasHammer)
            this.animations.play('run');
        else
            this.animations.play('hammerWalk');
        }
        else if(cursors.left.isDown){
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
}

donkeyKong.jumpman.prototype.jump = function(jumpButton){
    if(this.health>0){
        if (jumpButton.isDown && this.body.touching.down && jumpButton.downDuration(150)){
            this.body.velocity.y = -this.jumpForce;
        }
    }
}

donkeyKong.jumpman.prototype.stairs = function(stairButton, stairs){
    if(false){//si està en una escala
        if(stairButton.up.isDown){
            this.body.velocity.y = -this.stairSpeed;
            this.animations.play('stairs');
        }
        else if(stairButton.down.isDown){
            this.body.velocity.y = this.stairSpeed;
            this.animations.play('stairs');
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

donkeyKong.jumpman.prototype.hammerPowerUp = function(){
    if(!this.hasHammer){
        this.hasHammer = true;
        this.time = 0;
        console.log("hammerMode");
    }
}