var donkeyKong = donkeyKong || {};

donkeyKong.kong = function(_game, _x, _y, _tag){
    Phaser.Sprite.call(this,_game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.game = _game;
    this.time = 0;
    this.nextMaxTime;
    this.SetNextMaxTime();
    this.MIN_TIME = 1;
    this.MAX_TIME = 3;
    this.animations.add('throw',[4, 5,6,7],4,true);
}

donkeyKong.kong.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.kong.prototype.constructor = donkeyKong.kong;

donkeyKong.kong.prototype.update = function(){
    if(this.time >= this.nextMaxTime){
        this.move();
    }
    if(this.time >= this.nextMaxTime*2){
        this.SetNextMaxTime();
        this.animations.stop();
    }
    this.time += this.game.time.physicsElapsed;
    //console.log(this.time);
}

donkeyKong.kong.prototype.SetNextMaxTime = function(){
    this.time = 0;
    this.nextMaxTime = 1;//this.game.rnd.integerInRange(this.MIN_TIME, this.MAX_TIME);
    //console.log(this.nextMaxTime);
}

donkeyKong.kong.prototype.move = function(){
    //this.scale*=-1;
    this.animations.play('throw');
}