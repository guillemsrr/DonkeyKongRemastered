var donkeyKong = donkeyKong || {};


donkeyKong.enemy_prefab = function(game,x,y,points,speed,direction,level){
    Phaser.Sprite.call(this,game,x,y,'barrel');
    this.anchor.setTo(.5);
    //this.animations.add('side',[0,1,2,3],10,true);
    //this.animations.play('walk');
    this.patrolA = pointA;
    this.patrolB = pointB;
    this.speed = speed;
    this.direction = direction;
    this.level = level;
    this.game.physics.arcade.enable(this);
    //this.body.allowGravity = false;
};



donkeyKong.enemy_prefab.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.enemy_prefab.prototype.constructor = donkeyKong.enemy_prefab;

donkeyKong.enemy_prefab.prototype.update = function(){
   this.game.physics.arcade.collide(this,this.level.walls);
   this.game.physics.arcade.collide(this,this.level.hero,this.hitHero,null,this);
    
   this.body.velocity.x = this.speed*this.direction;
   if(this.body.blocked.right || this.body.blocked.left){
       this.direction *=-1;
       this.scale.x=this.direction;
       this.body.velocity.x = this.speed*this.direction;
   } 
    
};

donkeyKong.enemy_prefab.prototype.hitHero = function(_enemy,_hero){
    if(_enemy.body.touching.up && _hero.body.touching.down){
        this.kill();
        _hero.body.velocity.y=-gameOptions.heroJump;
    }else{
        /*
        this.level.camera.shake(0.05,500);
        _hero.health--;
        this.level.hud_energy.frame =_hero.health;
        _hero.reset(65,100);
        */
        this.level.hitHero();
    }
};