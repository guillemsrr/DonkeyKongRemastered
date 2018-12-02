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
}

donkeyKong.fireBall.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.fireBall.prototype.constructor = donkeyKong.fireBall;

donkeyKong.fireBall.prototype.spawn = function(_barrel,_oil){
    if(_barrel.body.touching.left && _oil.body.touching.right){
        //this.level.hitHero();
        console.log("fueguesito");
    }
};

donkeyKong.fireBall.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.beams);
    this.game.physics.arcade.collide(this.level.barrel,this.level.oil,this.level.oil,null,this);
    this.game.physics.arcade.collide(this,this.level.jumpman,this.hitJumpman);
    this.game.physics.arcade.collide(this,this.level.jumpman2,this.hitJumpman);
}

donkeyKong.fireBall.prototype.move = function(){
    this.animations.play('move');
}


donkeyKong.fireBall.prototype.hitJumpman = function(_fireball, _jumpman){
    this.level.hitJumpman(_jumpman);
};