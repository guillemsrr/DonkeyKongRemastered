var donkeyKong = donkeyKong || {};

//750,100,720,1000,100,1
donkeyKong.barrel = function(_game, _x, _y, _points, _speed, _direction, _level, _tag){
    Phaser.Sprite.call(this, _game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.animations.add('roll',[0,1,2,3],5,true);
    this.animations.add('front',[4, 5],5,true);
    this.pointsArray = _points;
    this.speed = _speed;
    this.direction = _direction;
    this.level = _level;
    this.game.physics.arcade.enable(this);
    this.outOfBoundsKill = true;
    
    this.IsGoingDown = false;
    this.isFallingStairs = false;
    this.fallingTime = 0.14;
    this.fallingCounter = 0;
    this.time = 0;
};

donkeyKong.barrel.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.barrel.prototype.constructor = donkeyKong.barrel;

donkeyKong.barrel.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.oil,this.spawnFireball,null,this);
    //this.game.physics.arcade.overlap(this,this.level.jumpman,this.hitJumpman, null, this);
    //this.game.physics.arcade.overlap(this,this.level.jumpman2,this.hitJumpman, null, this);
    
    if(this.game.physics.arcade.overlap(this, this.level.jumpman)){
        this.hitJumpman(this, this.level.jumpman);
    }
    if(this.game.physics.arcade.overlap(this, this.level.jumpman2)){
        this.hitJumpman(this, this.level.jumpman2);
    }
    
    //Con esto nos aseguramos de que calcule el random 1 vez cada vez que está en una escalera y no 1 vez por frame
    if(!this.IsGoingDown){
        this.GoDownRand = Math.floor(Math.random() * 2);
        this.IsGoingDown = true;
    }
    //Si el barril se encuentra en la posición de una escalera y el random calculado antes es true, el barril caerá. Si no, seguirá recto.
    if(this.game.physics.arcade.overlap(this,this.level.finalStair) && this.GoDownRand == true){
        this.isFallingStairs = true;
    }
    else{
        this.animations.stop('front');
        this.animations.play('roll');
        this.game.physics.arcade.collide(this,this.level.beams,this.movement,null,this);
        
        this.fallingCounter = 0;
    }
    
    if(this.isFallingStairs){
        this.fallingStairLogic();
    }
    this.time += this.game.time.physicsElapsed;
};

//Movimiento lateral del barril
donkeyKong.barrel.prototype.movement = function(_barrel, _beam){
    if(_barrel.body.touching.down && _beam.body.touching.up){
        if(this.body.y - this.lastPos > 3){
            this.IsGoingDown = false;
            this.direction *= -1;
        }
        this.lastPos = this.body.y;
    }
    this.scale.x=this.direction;
    this.body.velocity.x = this.speed*this.direction;
};

//Detecta si hay colisión del barril con los jugadores
donkeyKong.barrel.prototype.hitJumpman = function(_barrel, _jumpman){
    if(_barrel.body.touching.up && _jumpman.body.touching.down){
        this.kill();
        _jumpman.JumpOnBarrel();
    }
    else{
        if(_jumpman.hasHammer){
            this.kill();
        }
        else{
            this.level.hitJumpman(_jumpman);
            
        }
    }
};

donkeyKong.barrel.prototype.spawnFireball = function(_barrel, _oil){
    this.level.SpawnFireBall();
    this.kill();
};

donkeyKong.barrel.prototype.fallingStairLogic = function(){
    
    if(this.fallingCounter < this.fallingTime){
        this.game.physics.arcade.collide(this,this.level.beams,this.movement,null,this);
        this.fallingCounter += this.game.time.physicsElapsed;
    }
    else{
        this.body.velocity.x = 0;
        this.animations.stop('roll');
        this.animations.play('front');
        
    }
};

