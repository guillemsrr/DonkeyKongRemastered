var donkeyKong = donkeyKong || {};

var gameOptions={
    gameWidth:510,
    gameHeight:450,
    level1Width:1280,
    level1Height:800,
    heroGravity:1000,
    heroSpeed:200,
    heroJump:450
};

donkeyKong.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,'gameFrame',this,false,false);

donkeyKong.game.state.add('Menu', donkeyKong.menu);
donkeyKong.game.state.add('DebugLevel', donkeyKong.debugLevel);
donkeyKong.game.state.start('Menu');
