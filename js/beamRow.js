var donkeyKong = donkeyKong || {};

donkeyKong.beamRow = function( _game, _tag, _group, _colliderTag, _colliderGroup){
    this.game = _game;
    this.group = _group;
    this.tag = _tag;
    
    this.colliderGroup = _colliderGroup;
    this.colliderTag= _colliderTag;
}

donkeyKong.beamRow.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.beamRow.prototype.constructor = donkeyKong.beamRow;

donkeyKong.beamRow.prototype.createStraightRow = function(numBeams, posX, posY){
    
    for (var i=0; i<numBeams;i++){
            var beam = this.game.add.sprite(posX + 16*i, posY, this.tag);
        this.game.physics.arcade.enable(beam);
        beam.body.enable = true;
        beam.body.immovable = true; 
        beam.body.allowGravity = false;
        beam.body.gravity = false;
        this.group.add(beam);
    }
}
 
donkeyKong.beamRow.prototype.createDiagRow = function(numBeams, posX, posY, colliderLeft, colliderRight, right = 1, up = -1 ){
    if(colliderLeft){
        var beamCollider = this.game.add.sprite(posX, posY - 20, this.colliderTag);
        this.game.physics.arcade.enable(beamCollider);
        beamCollider.body.enable = true;
        beamCollider.body.immovable = true; 
        beamCollider.body.allowGravity = false;
        beamCollider.body.gravity = false;
        this.colliderGroup.add(beamCollider);
        
    }
    
    for (var i=0; i<numBeams;i++){
            var beam = this.game.add.sprite(posX + right*16*i, posY + up*i, this.tag);
            this.game.physics.arcade.enable(beam);
            beam.body.enable = true;
            beam.body.immovable = true; 
            beam.body.allowGravity = false;
            beam.body.gravity = false;
            this.group.add(beam);
    }
    
    if(colliderRight){
        var beamCollider = this.game.add.sprite(posX + right*16*(numBeams - 1), posY + up*(numBeams - 1) - 20, this.colliderTag);
        this.game.physics.arcade.enable(beamCollider);
        beamCollider.body.enable = true;
        beamCollider.body.immovable = true; 
        beamCollider.body.allowGravity = false;
        beamCollider.body.gravity = false;
        this.colliderGroup.add(beamCollider);
        
    }
}

donkeyKong.beamRow.prototype.move = function(){
    
}