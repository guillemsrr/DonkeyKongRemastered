var donkeyKong = donkeyKong || {};

donkeyKong.jumpman = function(_game, _x, _y, _tag){
    Phaser.Sprite.call(this,_game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.game = _game;
    _game.physics.arcade.enable(this);

    //Variables
    this.speed = 150;
    this.jumpForce = 200;
    
    //Animations
    this.animations.add('run',[0,1,2],10,true);
    //this.health = gameOptions.heroEnergy;
    this.body.setSize(15, 20, 12, 15);
}

donkeyKong.jumpman.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.jumpman.prototype.constructor = donkeyKong.jumpman;

donkeyKong.jumpman.prototype.update = function(){
    
}

donkeyKong.jumpman.prototype.move = function(cursors){
    
    if(cursors.right.isDown){
        this.scale.x=1;
        this.body.velocity.x = this.speed;
        this.animations.play('run');
    }
    else if(cursors.left.isDown){
        this.scale.x=-1;
        this.body.velocity.x = -this.speed;
        this.animations.play('run');
    }
    else{
        this.body.velocity.x = 0;
        this.animations.stop();
    }
}

donkeyKong.jumpman.prototype.jump = function(jumpButton){
    if (jumpButton.isDown && this.body.touching.down && jumpButton.downDuration(150)){
        this.body.velocity.y = -this.jumpForce;
        console.log("JUMP: " + this.body.velocity.y );
    }
}















