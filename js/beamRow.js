var donkeyKong = donkeyKong || {};

donkeyKong.beamRow = function( _game, _numBeams, _x, _y, _tag){
    this.numBeams = _numBeams;
    this.posX = _x;
    this.posY = _y;
    this.row = _game.add.group();
    this.tag = _tag;
    this.m_game = _game;
}

donkeyKong.beamRow.prototype = Object.create(Phaser.Sprite.prototype);
donkeyKong.beamRow.prototype.constructor = donkeyKong.beamRow;

donkeyKong.beamRow.prototype.createRow = function(isRight){
    for (var i=0; i<gameOptions.gameWidth/16;i++){
            beam = this.m_game.add.sprite(16*i + this.posX, this.posY, this.tag);
            beam.body.immovable = true;
            beam.body.gravity = false;
            this.row.add(beam);
    }
}