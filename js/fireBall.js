var donkeyKong = donkeyKong || {};

donkeyKong.fireBall = function(_game, _x, _y, _speed, _direction, _level, _tag){
    Phaser.Sprite.call(this,_game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.animations.add('move',null,4,true);
    this.speed = _speed;
    this.direction = _direction;
    this.level = _level;
    this.game.physics.arcade.enable(this);
    this.outOfBoundsKill = true;
    
    //Collisioner:
    this.body.setCircle(8, 10, 20);
}

donkeyKong.fireBall.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.fireBall.prototype.constructor = donkeyKong.fireBall;


donkeyKong.fireBall.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.beams);
    this.game.physics.arcade.collide(this,this.level.jumpman,this.hitJumpman,null,this);
    this.game.physics.arcade.collide(this,this.level.jumpman2,this.hitJumpman,null,this);
}

donkeyKong.fireBall.prototype.move = function(){
    this.animations.play('move');
}


donkeyKong.fireBall.prototype.hitJumpman = function(_fireball, _jumpman){
    this.level.hitJumpman(_jumpman);
};