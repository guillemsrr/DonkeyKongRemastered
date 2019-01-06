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
    
    this.current = this.game.add.text(_x + 163 , _y + 12, "I·", hudStyle);
    this.top = this.game.add.text(_x + 145 , _y + 24, "TOP·", hudStyle);
    
    this.player1Text = this.game.add.text(_x - 18 , _y + 12, "P1", hudStyle);
    this.player2Text = this.game.add.text(_x - 18, _y + 24, "P2", hudStyle);
    this.levelText = this.game.add.text(_x + 125, _y, "L", hudStyle);
    
    //Variables
    this.lifes1 = this.game.add.text(_x + 3, _y +12, "3", player1Style);
    this.lifes2 = this.game.add.text(_x + 3, _y +24, "3", player2Style);
    
    this.currentScore1 = "0";
    this.points1 = this.game.add.text(_x + 22, _y +12, this.currentScore1, player1Style);
    
    this.currentScore2 = "0";
    this.points2 = this.game.add.text(_x + 22, _y +24, this.currentScore2, player2Style);
    
    this.bonus = this.game.add.text(_x + 80, _y +17, "5000", hudStyle);
    
    this.currentScore = this.game.add.text(_x + 180 , _y + 12, "000000", hudStyle);
    this.topScore = this.game.add.text(_x + 180 ,  _y + 24, "000000", hudStyle);
    
    this.level = this.game.add.text(_x + 125, _y +17, "1", hudStyle);
    
    this.bonusNum = 5000;
    this.bonusTimer = 0;
    this.bonusMaxTime = 2;
    
    //final death
    this.gameOverTimer = 0;
    this.maxGameOverTimer = 3;
    this.gameOver = false;
    
    this.curSc = localStorage.getItem("TotalScore");
    
    this.scoresList = localStorage.getItem("ScoreFile");
    this.scoresList = JSON.parse(this.scoresList);
    
    this.topSc = this.scoresList[0].highScore;
    
    this.updateTotalScore();
};

donkeyKong.hud.prototype.constructor = donkeyKong.hud;

donkeyKong.hud.prototype.customUpdate = function(_jumpman1, _jumpman2){
    
    this.bonusTimer += this.game.time.physicsElapsed;
    if(this.bonusTimer > this.bonusMaxTime){
        this.bonusTimer = 0;
        this.bonusNum -= 100;
        this.bonus.text = this.bonusNum.toString();
    }
    
    this.gameOverFunction();
    
    this.updateTotalScore();
}

donkeyKong.hud.prototype.updateTotalScore = function(){
    //CURRENT SCORE
    //this.curSc = _jumpman1.points + _jumpman2.points;
    if(this.curSc<100){
        this.currentScore.text = "000000";
    }
    else if(this.curSc<1000){
        this.currentScore.text = "000" + this.curSc.toString();
    }
    else if(this.curSc<10000){
        this.currentScore.text = "00" + this.curSc.toString();
    }
    else if(this.curSc<100000){
        this.currentScore.text = "0" + this.curSc.toString();
    }
    else if(this.curSc<1000000){
        this.currentScore.text = this.curSc.toString();
    }
    
    //TOP SCORE
    if(this.curSc > this.topSc){
        this.topSc = this.curSc;
        this.topScore.text = this.currentScore.text;
    }
    else{
        this.topScore.text = this.topSc;
        
        if(this.topSc<100){
            this.topScore.text = "000000";
        }
        else if(this.topSc<1000){
            this.topScore.text = "000" + this.topSc;
        }
        else if(this.topSc<10000){
            this.topScore.text = "00" + this.topSc;
        }
        else if(this.topSc<100000){
            this.topScore.text = "0" + this.topSc;
        }
        else if(this.topSc<1000000){
            this.topScore.text = this.topSc;
        }
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
    if(_playerNum == 1){
         this.points1.text = points.toString();
    }
    else if(_playerNum == 2){
        this.points2.text =  points.toString();
     }
}

donkeyKong.hud.prototype.gameOverFunction = function(){
    if(this.lifes1.text.toString() == "0" && this.lifes2.text.toString() == "0" && !this.gameOver){
        console.log("both dead");
        this.gameOver = true;
        this.gameOverText = this.game.add.text(gameOptions.gameWidth/2 - 80, gameOptions.gameHeight/2, "GAME OVER", style);
    }
    if(this.gameOver){
        this.gameOverTimer+= this.game.time.physicsElapsed;
        if(this.gameOverTimer > this.maxGameOverTimer){
            console.log("change level");
            donkeyKong.game.state.start('HighScore');
        }
    }
}