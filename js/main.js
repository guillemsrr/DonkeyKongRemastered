var donkeyKong = donkeyKong || {};

var gameOptions={
    gameWidth:510,
    gameHeight:450,
    level1Width:1280,
    level1Height:800,
    gravity:1000,
};

donkeyKong.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,'gameFrame',this,false,false);

donkeyKong.game.state.add('Menu', donkeyKong.menu);
donkeyKong.game.state.add('Scores', donkeyKong.scores);
donkeyKong.game.state.add('LevelSelector', donkeyKong.levelSelector);
donkeyKong.game.state.add('level1', donkeyKong.level1);
donkeyKong.game.state.add('level2', donkeyKong.level2);
donkeyKong.game.state.add('levelProva', donkeyKong.levelProva);
donkeyKong.game.state.start('Menu');
