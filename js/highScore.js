var donkeyKong = donkeyKong || {};


donkeyKong.highScore = {
    
    
    preload: function () {
        
        
    },
    
    create: function () {
        
        this.scoreVerticalAlignement = 100; 
        this.scoreHorizontalStart = 80;
        
        this.letterCounter = 0;
        this.newNameInput = '';
        this.letterPressed = false;
        this.qPressed = false;
        this.wPressed = false;
        this.ePressed = false;
        this.rPressed = false;
        this.tPressed = false;
        this.yPressed = false;
        this.uPressed = false;
        this.iPressed = false;
        this.oPressed = false;
        this.pPressed = false;
        this.aPressed = false;
        this.sPressed = false;
        this.dPressed = false;
        this.fPressed = false;
        this.gPressed = false;
        this.hPressed = false;
        this.jPressed = false;
        this.kPressed = false;
        this.lPressed = false;
        this.zPressed = false;
        this.xPressed = false;
        this.cPressed = false;
        this.vPressed = false;
        this.bPressed = false;
        this.nPressed = false;
        this.mPressed = false;
        
        this.title = this.game.add.text(this.scoreVerticalAlignement, 50, "Out of lives!", style);
        
        this.player1Score = parseInt(localStorage.getItem("Player1Score"));
        this.player2Score = parseInt(localStorage.getItem("Player2Score"));
        
        this.bestScore = 0;
        
        if(this.player1Score > this.player2Score){         
            this.bestScore = this.player1Score;
            
            this.title = this.game.add.text(this.scoreVerticalAlignement, 100, "Player 1 won!", style);
            
            this.scoreText = this.game.add.text(this.scoreVerticalAlignement, 150, "Score:" + localStorage.getItem("Player1Score"), style);            
        }
        else if(this.player1Score < this.player2Score){       
            this.bestScore = this.player2Score;
            
            this.title = this.game.add.text(this.scoreVerticalAlignement, 100, "Player 2 won!", style);
            
            this.scoreText = this.game.add.text(this.scoreVerticalAlignement, 150, "Score:" + localStorage.getItem("Player2Score"), style);
        }
        else{    
            this.bestScore = this.player1Score;
            
            this.title = this.game.add.text(this.scoreVerticalAlignement, 100, "Score tie!", style);
            
            this.scoreText = this.game.add.text(200, 150, "Score:" + localStorage.getItem("Player1Score"), style);               
        }
        
        this.newHighscoreIterator = 0;
        this.newHighscore = false;
        
        this.scoresList = localStorage.getItem("ScoreFile");
        this.scoresList = JSON.parse(this.scoresList);
        
        //console.log(this.saveFile.scoresList[0].name);
        
        //this.textList = Array(10);
        for(var i = 0; i < this.scoresList.length; i++){
                    
            if(this.bestScore > this.scoresList[i].highScore){
                this.newHighscore = true;
                this.newHighscoreIterator = i;
                break;
            }
        }
        
        this.newNameText = null;
        
        if(this.newHighscore){
            this.newScoreText = this.game.add.text(this.scoreVerticalAlignement, 200, "New HIGHSCORE!", style);
            this.newScoreText = this.game.add.text(this.scoreVerticalAlignement, 250, "Enter your name: ", style);
            this.newNameText = this.game.add.text(this.scoreVerticalAlignement, 290, "_", style);
        }
        
        
        
        
    },
    
    update: function () {
                
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){ 
            this.game.state.start('Menu');
        }
                
        if(this.newHighscore){
            /*
            var newName = prompt("Please enter your name", "name");

            this.SaveNewHighScore(newName);
            
            this.newHighscore = false;
            */
            
            this.InsertName();
        }    
        
        
    },
    
    // -------------- FUNCTIONS --------------
    
    SaveNewHighScore: function (newName){   
        this.scoreInserted = false;
        this.newScoresList = Array(10);
            
        for(var i = 0; i < this.newScoresList.length; i++){
                if(!this.scoreInserted){
                    if(i == this.newHighscoreIterator){
                        savedScore.name = newName;
                        savedScore.highScore = this.bestScore;
                        
                        this.newScoresList[i] = savedScore;
                        
                        this.scoreInserted = true;
                    }
                    else{
                        this.newScoresList[i] = this.scoresList[i];
                    }
                }
                else{
                    this.newScoresList[i] = this.scoresList[i-1];
                }
            }
            
            
            localStorage.setItem("ScoreFile", JSON.stringify(this.newScoresList));
    }, 
    
    InsertName: function (){
        if(this.letterCounter >= 5){
            this.SaveNewHighScore(this.newNameInput);
            
            this.game.state.start('Scores');
        }
        if(this.letterCounter > 0){
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
                
                this.SaveNewHighScore(this.newNameInput);

                this.game.state.start('Scores');
            }
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.Q)){
            if(!this.qPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'Q';
                this.newNameText.text = this.newNameInput + "_";
                this.qPressed = true;
            }
        }
        else{
            this.qPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.W)){
            if(!this.wPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'W';  
                this.newNameText.text = this.newNameInput + "_";
                this.wPressed = true;
            }
        }
        else{
            this.wPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.E)){
            if(!this.ePressed){
                
                this.letterCounter ++;
                this.newNameInput += 'E';  
                this.newNameText.text = this.newNameInput + "_";
                this.ePressed = true;
            }
        }
        else{
            this.ePressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.R)){
            if(!this.rPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'R';  
                this.newNameText.text = this.newNameInput + "_";
                this.rPressed = true;
            }
        }
        else{
            this.rPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.T)){
            if(!this.tPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'T';  
                this.newNameText.text = this.newNameInput + "_";
                this.tPressed = true;
            }
        }
        else{
            this.tPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.Y)){
            if(!this.yPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'Y';  
                this.newNameText.text = this.newNameInput + "_";
                this.yPressed = true;
            }
        }
        else{
            this.yPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.U)){
            if(!this.uPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'U'; 
                this.newNameText.text = this.newNameInput + "_"; 
                this.uPressed = true;
            }
        }
        else{
            this.uPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.I)){
            if(!this.iPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'I';
                this.newNameText.text = this.newNameInput + "_";  
                this.iPressed = true;
            }
        }        
        else{
            this.iPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.O)){
            if(!this.oPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'O';  
                this.newNameText.text = this.newNameInput + "_";
                this.oPressed = true;
            }
        }        
        else{
            this.oPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.P)){
            if(!this.pPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'P'; 
                this.newNameText.text = this.newNameInput + "_"; 
                this.pPressed = true;
            }
        }
        else{
            this.pPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
            if(!this.aPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'A';  
                this.newNameText.text = this.newNameInput + "_";
                this.aPressed = true;
            }
        }
        else{
            this.aPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.S)){
            if(!this.sPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'S';  
                this.newNameText.text = this.newNameInput + "_";
                this.sPressed = true;
            }
        }
        else{
            this.sPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
            if(!this.dPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'D';  
                this.newNameText.text = this.newNameInput + "_";
                this.dPressed = true;
            }
        }
        else{
            this.dPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.F)){
            if(!this.fPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'F';  
                this.newNameText.text = this.newNameInput + "_";
                this.fPressed = true;
            }
        }
        else{
            this.fPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.G)){
            if(!this.gPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'G';  
                this.newNameText.text = this.newNameInput + "_";
                this.gPressed = true;
            }
        }
        else{
            this.gPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.H)){
            if(!this.hPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'H'; 
                this.newNameText.text = this.newNameInput + "_"; 
                this.hPressed = true;
            }
        }
        else{
            this.hPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.J)){
            if(!this.jPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'J';  
                this.newNameText.text = this.newNameInput + "_";
                this.jPressed = true;
            }
        }
        else{
            this.jPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.K)){
            if(!this.kPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'K';
                this.newNameText.text = this.newNameInput + "_";  
                this.kPressed = true;
            }
        }
        else{
            this.kPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.L)){
            if(!this.lPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'L';  
                this.newNameText.text = this.newNameInput + "_";
                this.lPressed = true;
            }
        }
        else{
            this.lPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.Z)){
            if(!this.zPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'Z';  
                this.newNameText.text = this.newNameInput + "_";
                this.zPressed = true;
            }
        }
        else{
            this.zPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.X)){
            if(!this.xPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'X';  
                this.newNameText.text = this.newNameInput + "_";
                this.xPressed = true;
            }
        }
        else{
            this.xPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.C)){
            if(!this.cPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'C'; 
                this.newNameText.text = this.newNameInput + "_"; 
                this.cPressed = true;
            }
        }
        else{
            this.cPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.V)){
            if(!this.vPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'V';  
                this.newNameText.text = this.newNameInput + "_";
                this.vPressed = true;
            }
        }
        else{
            this.vPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.B)){
            if(!this.bPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'B';  
                this.newNameText.text = this.newNameInput + "_";
                this.bPressed = true;
            }
        }
        else{
            this.bPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.N)){
            if(!this.nPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'N';  
                this.newNameText.text = this.newNameInput + "_";
                this.nPressed = true;
            }
        }
        else{
            this.nPressed = false;            
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.M)){
            if(!this.mPressed){
                
                this.letterCounter ++;
                this.newNameInput += 'M';  
                this.newNameText.text = this.newNameInput + "_";
                this.mPressed = true;
            }
        }
        else{
            this.mPressed = false;
        }        
    }
    
};
