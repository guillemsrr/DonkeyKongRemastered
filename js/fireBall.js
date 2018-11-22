var donkeyKong = donkeyKong || {};

donkeyKong.fireBall = function(_game, _x, _y, _tag){
    Phaser.Sprite.call(this,_game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.game = _game;

    this.animations.add('move', null,4,true);
    //this.animations.play('move');
}

donkeyKong.fireBall.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.fireBall.prototype.constructor = donkeyKong.fireBall;

donkeyKong.fireBall.prototype.update = function(){

}

donkeyKong.fireBall.prototype.move = function(){
    this.animations.play('move');
}