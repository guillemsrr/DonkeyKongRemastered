var donkeyKong = donkeyKong || {};

donkeyKong.clockTimeStop = function(_game, _tag, _jumpman){
    Phaser.Sprite.call(this,_game, _jumpman.body.position.x + 0, _jumpman.body.position.y - 18, _tag);
    this.anchor.setTo(.5);
    this.game = _game;
    this.jumpman = _jumpman;
    this.animations.add('clock', null,10,true);
    this.animations.play('clock');
    this.time = 0;
}

donkeyKong.clockTimeStop.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.clockTimeStop.prototype.constructor = donkeyKong.clockTimeStop;

donkeyKong.clockTimeStop.prototype.update = function(){
    this.time += this.game.time.physicsElapsed;
    if(this.time > 3){
        this.kill();
        
    }
    else{        
        this.position.x = this.jumpman.body.position.x + 9;
        this.position.y = this.jumpman.body.position.y - 18;
    }
}
