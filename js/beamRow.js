var donkeyKong = donkeyKong || {};

donkeyKong.beamRow = function( _game, _tag, _group){
    this.game = _game;
    this.group = _group;
    this.tag = _tag;
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

donkeyKong.beamRow.prototype.createDiagRow = function(numBeams, posX, posY, right = 1, up = -1){
    for (var i=0; i<numBeams;i++){
            var beam = this.game.add.sprite(posX + right*16*i, posY + up*i, this.tag);
            this.game.physics.arcade.enable(beam);
            beam.body.enable = true;
            beam.body.immovable = true; 
            beam.body.allowGravity = false;
            beam.body.gravity = false;
            this.group.add(beam);
    }
}

donkeyKong.beamRow.prototype.move = function(){
    
}