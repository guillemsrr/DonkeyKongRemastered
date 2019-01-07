var donkeyKong = donkeyKong || {};

donkeyKong.pauline = function(_game, _x, _y, _tag){
    Phaser.Sprite.call(this,_game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.game = _game;
    this.time = 0;
    this.nextMaxTime;
    this.SetNextMaxTime();
    this.MIN_TIME = 1;
    this.MAX_TIME = 3;
    this.flipped = false;
    this.animations.add('idle',null,8,true);
}

donkeyKong.pauline.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.pauline.prototype.constructor = donkeyKong.pauline;

donkeyKong.pauline.prototype.customUpdate = function(){
    if(this.time >= this.nextMaxTime){
        if(!flipped){
            this.scale.x*=-1;
            flipped = true;
        }   
        this.move();
    }
    if(this.time >= this.nextMaxTime*2){
        this.SetNextMaxTime();
        this.animations.stop();
    }
    this.time += this.game.time.physicsElapsed;
    //console.log(this.time);
}

donkeyKong.pauline.prototype.SetNextMaxTime = function(){
    this.time = 0;
    flipped = false;
    this.nextMaxTime = this.game.rnd.integerInRange(1, 3);
    //console.log(this.nextMaxTime);
}

donkeyKong.pauline.prototype.move = function(){
    //this.scale*=-1;
    this.animations.play('idle');
}