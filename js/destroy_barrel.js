var donkeyKong = donkeyKong || {};

donkeyKong.destroy_barrel = function(_game, _x, _y, _tag){
    Phaser.Sprite.call(this,_game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.game = _game;
    _game.physics.arcade.enable(this);
    
     
    //Animations
    this.animations.add('exploding', [0,1], 5, true);
    this.animations.add('final', [2, 3], 5, true);
    
    
    //Animation Variables:
    this.time = 0;
    this.deathRollTime = 2;
    this.deathRolling = false;
}

donkeyKong.destroy_barrel.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.destroy_barrel.prototype.constructor = donkeyKong.destroy_barrel;


donkeyKong.destroy_barrel.prototype.update = function(){

};