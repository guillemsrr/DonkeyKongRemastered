var donkeyKong = donkeyKong || {};

//750,100,720,1000,100,1
donkeyKong.enemy_prefab = function(_game, _x, _y, _points, _speed, _direction, _level, _tag){
    Phaser.Sprite.call(this, _game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.animations.add('roll',[0,1,2,3],5,true);
    this.animations.play('roll');
    this.pointsArray = _points;
    this.speed = _speed;
    this.direction = _direction;
    this.level = _level;
    this.game.physics.arcade.enable(this);
};

donkeyKong.enemy_prefab.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.enemy_prefab.prototype.constructor = donkeyKong.enemy_prefab;

donkeyKong.enemy_prefab.prototype.update = function(){
   this.game.physics.arcade.collide(this,this.level.beams);
   this.game.physics.arcade.collide(this,this.level.jumpman,this.hitHero,null,this);
    
   this.body.velocity.x = this.speed*this.direction;
    if(!this.body.touching.down && (this.body.x<=this.pointsArray[0] || this.body.x>=this.pointsArray[1]))
            this.direction *= -1;
    this.scale.x=this.direction;
    this.body.velocity.x = this.speed*this.direction;
    
};

donkeyKong.enemy_prefab.prototype.hitHero = function(_enemy,_hero){
    if(_enemy.body.touching.up && _hero.body.touching.down){
        this.kill();
        _hero.body.velocity.y=-gameOptions.heroJump;
    }else{
        this.level.hitHero();
    }
};


/*

        //Barrel
        //donkeyKong.enemy_prefab =     function(_game,_x,_y,_pointA, _pointB,_speed,_direction,_level, _tag)
        var pointsArray = [16*3, 16*28];
        this.barrel = new donkeyKong.enemy_prefab(this.game, 16*5, gameOptions.gameHeight - 8*41, pointsArray, 75, 1, this, 'barrel');
        this.game.add.existing(this.barrel);
*/

