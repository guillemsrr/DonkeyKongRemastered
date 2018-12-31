var donkeyKong = donkeyKong || {};

donkeyKong.hud = function(_game, _x, _y, _level){
    this.game = _game;
    this.x = _x;
    this.y = _y;
    
    this.level = _level;
    var player1Style = { font: "9px title", fill: "#ff0000", boundsAlignH: "top", boundsAlignV: "middle" };
    var player2Style = { font: "9px title", fill: "#42e500", boundsAlignH: "top", boundsAlignV: "middle" };
    
    //TITLES
    this.life = this.game.add.text(_x + 2, _y, "M", hudStyle);
    this.points = this.game.add.text(_x + 15, _y, "POINTS", hudStyle);
    this.bonus = this.game.add.text(_x + 75 , _y, "BONUS", hudStyle);
    this.player1Text = this.game.add.text(_x - 18 , _y + 12, "P1", hudStyle);
    this.player2Text = this.game.add.text(_x - 18, _y + 24, "P2", hudStyle);
    this.levelText = this.game.add.text(_x + 125, _y, "L", hudStyle);
    
    //Variables
    this.lifes1 = this.game.add.text(_x + 3, _y +12, "3", player1Style);
    this.lifes2 = this.game.add.text(_x + 3, _y +24, "3", player2Style);
    this.points1 = this.game.add.text(_x + 22, _y +12, "000", player1Style);
    this.points2 = this.game.add.text(_x + 22, _y +24, "000", player2Style);
    this.bonus = this.game.add.text(_x + 80, _y +17, "5000", hudStyle);
    this.level = this.game.add.text(_x + 125, _y +17, "1", hudStyle);
    
    this.bonusNum = 5000;
    this.bonusTimer = 0;
    this.bonusMaxTime = 2;
};

donkeyKong.hud.prototype.constructor = donkeyKong.hud;

donkeyKong.hud.prototype.customUpdate = function(){
    
    this.bonusTimer += this.game.time.physicsElapsed;
    if(this.bonusTimer > this.bonusMaxTime){
        this.bonusTimer = 0;
        this.bonusNum -= 100;
        this.bonus.text = this.bonusNum.toString();
    }
}

donkeyKong.hud.prototype.setLife = function(_playerNum, life){
    if(_playerNum == 1){
         this.lifes1.text = life.toString();
    }
    else if(_playerNum == 2){
        this.lifes2.text = life.toString();
     }
}

donkeyKong.hud.prototype.setPoints = function(_playerNum, points){
    console.log(_playerNum);
    if(_playerNum == 1){
         this.points1.text = points.toString();
    }
    else if(_playerNum == 2){
        this.points2.text =  points.toString();
     }
}