var donkeyKong = donkeyKong || {};

var gameOptions={
    gameWidth:510,
    gameHeight:450,
    level1Width:1280,
    level1Height:800,
    gravity:1000,
};

var style = { font: "20px title", fill: "#f9bc00", boundsAlignH: "top", boundsAlignV: "middle" };
var hudStyle = { font: "9px title", fill: "#ffff", boundsAlignH: "top", boundsAlignV: "middle" };

donkeyKong.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,'gameFrame',this,false,false);

donkeyKong.game.state.add('Menu', donkeyKong.menu);
donkeyKong.game.state.add('Scores', donkeyKong.scores);
donkeyKong.game.state.add('HighScore', donkeyKong.highScore);
donkeyKong.game.state.add('LevelSelector', donkeyKong.levelSelector);
donkeyKong.game.state.add('level1', donkeyKong.level1);
donkeyKong.game.state.add('level2', donkeyKong.level2);
donkeyKong.game.state.add('level3', donkeyKong.level3);
donkeyKong.game.state.add('level4', donkeyKong.level4);
donkeyKong.game.state.add('level5', donkeyKong.level5);
donkeyKong.game.state.start('level4');
