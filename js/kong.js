var donkeyKong = donkeyKong || {};

donkeyKong.kong = function(_game, _x, _y, _tag, _level, _kongSound){
    Phaser.Sprite.call(this,_game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.game = _game;
    this.time = 0;
    this.nextMaxTime = 0;
    this.level = _level;
    //this.SetNextMaxTime();
    
    //Animations
    this.animations.add('throwRight',[4,5,7],3,false);
    this.animations.add('throwDown',[4,5,6],3,false);
    this.animations.add('monkey',[1,2], 3 , true);
    
    //this doesn't work for the randomInRange
    this.MIN_TIME = 1;
    this.MAX_TIME = 3;
    
    this.firstThrowDown = false;
    
    this.kongSound = _kongSound;
    this.kongSound.loopFull();
    this.kongSound.stop();
}

donkeyKong.kong.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.kong.prototype.constructor = donkeyKong.kong;

donkeyKong.kong.prototype.customUpdate = function(){
    
    if(this.time >= this.nextMaxTime){
        this.SetNextMaxTime();
        //the first throw
        if(!this.firstThrowDown){
            this.firstThrowDown = true;
            this.ThrowDown();
        }
        else{
            this.NextAnimation();
        }
    }
    
    this.time += this.game.time.physicsElapsed;
    //console.log(this.time);
}

donkeyKong.kong.prototype.SetNextMaxTime = function(){
    this.time = 0;
    //this.nextMaxTime = this.game.rnd.integerInRange(this.MIN_TIME, this.MAX_TIME);
    this.nextMaxTime = this.game.rnd.integerInRange(8, 15);
    this.nextMaxTime/=10;
    //console.log(this.nextMaxTime);
}

donkeyKong.kong.prototype.NextAnimation = function(){
     if(this.animations.name == "monkey"){
         if(this.game.state.getCurrentState().key == 1 ){
             if(this.game.rnd.integerInRange(0, 100)<80) //40% per fer throw right
             this.ThrowRight();
         else 
             this.ThrowDown();
         }
         else{
             if(this.game.rnd.integerInRange(0, 100)<40) //40% per fer throw right
             this.ThrowRight();
         else if(this.game.rnd.integerInRange(0, 100)<80) //40% per fer throw right
             this.ThrowLeft();
         else 
             this.ThrowDown();
         }
         
         this.kongSound.stop();
    }
    else{
        this.animations.play('monkey');
        this.kongSound.play();
            
    }
}

donkeyKong.kong.prototype.ThrowDown = function(){
    this.animations.play('throwDown');
    //throw barrel down
    this.level.barrelDownSpawned = true;
}

donkeyKong.kong.prototype.ThrowRight = function(){
    if(this.scale.x < 0)
        this.scale.x*=-1;
    this.animations.play('throwRight');
    //throw barrel right
    this.level.barrelRightSpawned = true;
}

donkeyKong.kong.prototype.ThrowLeft = function(){
    if(this.scale.x > 0)
        this.scale.x*=-1;
    this.animations.play('throwRight');
    //throw barrel right
    this.level.barrelLeftSpawned = true;
}