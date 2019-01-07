var donkeyKong = donkeyKong || {};

donkeyKong.mineExplosion = function(_game, _x, _y, _tag, _level){
    Phaser.Sprite.call(this,_game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.game = _game;
    this.level = _level;
    this.animations.add('explosion', null,10,false);
    this.animations.play('explosion');
    this.time = 0;
    this.explodingRad = 30;
}

donkeyKong.mineExplosion.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.mineExplosion.prototype.constructor = donkeyKong.mineExplosion;

donkeyKong.mineExplosion.prototype.update = function(){
    this.time += this.game.time.physicsElapsed;
    if(this.time > .8){
        this.kill();
    }
    else{
        if(Phaser.Math.distance(this.position.x, this.position.y, this.level.jumpman.position.x, this.level.jumpman.position.y) < this.explodingRad){
            this.level.hitJumpman(this.level.jumpman);
        }
    }
        
}
