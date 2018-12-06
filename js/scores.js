var donkeyKong = donkeyKong || {};


donkeyKong.scores = {
    
    
    preload: function () {
        
        
    },
    
    create: function () {
        
        // Settings
        this.scoreVerticalAlignement = 30; 
        this.scoreHorizontalStart = 80;
        
        this.playerName = "Pepito";
        this.playerScore = 1000;
        
        var style = { font: "bold 25px Arial", fill: "#fff", boundsAlignH: "top", boundsAlignV: "middle" };
        this.scoreTitle = this.game.add.text(gameOptions.gameWidth / 2 - 60, 20, "SCORES", style);
        
        this.scoresList = Array(10);
        for(var i = 0; i < this.scoresList.length; i++){
            this.scoresList[i] = this.game.add.text(this.scoreVerticalAlignement, this.scoreHorizontalStart + 32 * i, (i + 1).toString() + ". " + this.playerName + " - " + this.playerScore, style);
        }
        
    },
    
    update: function () {
                
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){ 
            this.game.state.start('Menu');
        }
    },
    
    // -------------- FUNCTIONS --------------
    
};