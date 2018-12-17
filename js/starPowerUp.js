var donkeyKong = donkeyKong || {};

donkeyKong.starPowerUp = function(_game, _tag, _jumpman){
    Phaser.Sprite.call(this,_game, _jumpman.body.position.x, _jumpman.body.position.y, _tag);
    this.anchor.setTo(.5);
    this.game = _game;
    this.jumpman = _jumpman;
    this.animations.add('star', null,10,true);
    this.animations.play('star');
    this.time = 0;
}

donkeyKong.starPowerUp.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.starPowerUp.prototype.constructor = donkeyKong.starPowerUp;

donkeyKong.starPowerUp.prototype.update = function(){
    this.alpha = 0.5;
    this.time += this.game.time.physicsElapsed;
    if(this.time > 5){
        this.kill();
        
    }
    else{        
        this.position.x = this.jumpman.body.position.x + 9;
        this.position.y = this.jumpman.body.position.y + 2;
    }
}