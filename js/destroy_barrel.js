var donkeyKong = donkeyKong || {};

donkeyKong.destroy_barrel = function(_game, _x, _y, _tag){
    Phaser.Sprite.call(this,_game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.game = _game;
    _game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    
     
    //Animations
    this.animations.add('exploding', [0,1], 5, true);
    this.animations.add('final', [2, 3], 5, false);
    
    
    //Animation Variables:
    this.explodingTime = 1;
    this.DyingTime = 1.4;
    this.explodingCounter = 0;
}

donkeyKong.destroy_barrel.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.destroy_barrel.prototype.constructor = donkeyKong.destroy_barrel;


donkeyKong.destroy_barrel.prototype.update = function(){
    if(this.explodingCounter < this.explodingTime){
        this.animations.play('exploding');
        this.explodingCounter += this.game.time.physicsElapsed;
    }
    else{
        if(this.explodingCounter < this.DyingTime){
            this.animations.play('final');
            this.explodingCounter += this.game.time.physicsElapsed;
        }
        else{
            this.kill();
        }
    }
};