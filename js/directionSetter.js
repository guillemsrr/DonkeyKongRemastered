var donkeyKong = donkeyKong || {};

donkeyKong.directionSetter = function(_game, _x, _y, _newDirection, _level, _tag){
    Phaser.Sprite.call(this, _game, _x, _y, _tag);
    this.newDirection = _newDirection;
    this.level = _level;
    
    this.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.moves = false;
    this.outOfBoundsKill = true;
    
    
};

donkeyKong.directionSetter.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.directionSetter.prototype.constructor = donkeyKong.directionSetter;

donkeyKong.directionSetter.prototype.update = function(){
    this.game.physics.arcade.overlap(this,this.level.barrels,this.setDirection,null,this);
};

//Movimiento lateral del barril
donkeyKong.directionSetter.prototype.setDirection = function(_setter, _barrel){
    _barrel.direction = this.newDirection;
    _barrel.scale.x = _barrel.direction;
    _barrel.body.velocity.x = _barrel.speed * _barrel.direction;
};























