var donkeyKong = donkeyKong || {};

donkeyKong.hud = function(_game, _x, _y, _level){
    this.game = _game;
    this.level = _level;
    
    this.life = this.game.add.text(_x, _y, "L", hudStyle);
    this.bonus = this.game.add.text(_x + 10 , _y, "BONUS", hudStyle);
    this.player1Text = this.game.add.text(_x + 10 , _y + 10, "P1", hudStyle);
    this.player2Text = this.game.add.text(_x + 30, _y + 10, "P2", hudStyle);
    this.levelText = this.game.add.text(_x + 50, _y, "L", hudStyle);
};

donkeyKong.hud.prototype.constructor = donkeyKong.hud;