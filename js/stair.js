var donkeyKong = donkeyKong || {};

donkeyKong.stair = function( _game, _tag, _group, _hasFinalStair, _finalTag, _finalGroup){
    this.game = _game;
    this.group = _group;
    this.tag = _tag;
    
    this.hasFinalStair = _hasFinalStair;
    this.finalGroup = _finalGroup;
    this.finalTag = _finalTag;
}

donkeyKong.stair.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.stair.prototype.constructor = donkeyKong.stair;

donkeyKong.stair.prototype.createStair = function(stairSize, posX, posY){
    for(var i = 0; i < stairSize; i++){        
        var stairChunk = this.game.add.sprite(posX, posY - i * 4, this.tag);
        this.game.physics.arcade.enable(stairChunk);
        stairChunk.body.enable = true;
        stairChunk.body.immovable = true;
        stairChunk.body.allowGravity = false;
        stairChunk.body.gravity = false;
        this.group.add(stairChunk);
    }
    
    if(this.hasFinalStair){     
        var finalStairChunk = this.game.add.sprite(posX, posY - (stairSize - 1) * 4 - 15, this.finalTag);
        this.game.physics.arcade.enable(finalStairChunk);
        finalStairChunk.body.enable = true;
        finalStairChunk.body.immovable = true;
        finalStairChunk.body.allowGravity = false;
        finalStairChunk.body.gravity = false;
        this.finalGroup.add(finalStairChunk);
    }
}