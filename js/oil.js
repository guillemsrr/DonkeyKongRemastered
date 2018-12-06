var donkeyKong = donkeyKong || {};

donkeyKong.oil = function(_game, _x, _y, _tag){
    Phaser.Sprite.call(this,_game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.game = _game;
    this.fired = false;
    this.animations.add('move', [1][2],4,true);
}

donkeyKong.oil.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.oil.prototype.constructor = donkeyKong.oil;

donkeyKong.oil.prototype.update = function(){

}

donkeyKong.oil.prototype.move = function(){
    if(this.fired){
        this.animations.play('move');
    }
}