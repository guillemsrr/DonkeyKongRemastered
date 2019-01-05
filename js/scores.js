var donkeyKong = donkeyKong || {};


donkeyKong.scores = {
    
    
    preload: function () {
        
        
    },
    
    create: function () {
        
        this.FillScores();
        
    },
    
    update: function () {
                
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){ 
            this.game.state.start('Menu');
        }
    },
    
    // -------------- FUNCTIONS --------------
    
    FillScores: function (){
        
        // Settings
        this.scoreVerticalAlignement = 30; 
        this.scoreHorizontalStart = 80;
        
        var style = { font: "bold 25px Arial", fill: "#fff", boundsAlignH: "top", boundsAlignV: "middle" };
        this.scoreTitle = this.game.add.text(gameOptions.gameWidth / 2 - 60, 20, "SCORES", style);
        
        this.saveFile = localStorage.getItem("ScoreFile");
        this.saveFile = JSON.parse(this.saveFile);
        
        //console.log(this.saveFile.scoresList[0].name);
        
        this.textList = Array(10);
        for(var i = 0; i < this.textList.length; i++){
                    
            this.textList[i] = this.game.add.text(this.scoreVerticalAlignement, this.scoreHorizontalStart + 32 * i, (i + 1).toString() + ". " + this.saveFile.scoresList[0].name + " - " + this.saveFile.scoresList[i].highScore, style);
        }
        
    }
    
};

