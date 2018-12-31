var donkeyKong = donkeyKong || {};


donkeyKong.menu = {
    
    
    preload: function () {
        this.load.image('menu_background', 'assets/sprites/menu_background.png');
        this.load.image('menu_selector', 'assets/sprites/menu_selector.png');
        
        this.load.audio('menu', 'assets/audio/menu.mp3');
        this.load.audio('start', 'assets/audio/start.mp3');
        
    },
    
    create: function () {
        
        // Settings
        this.menuVerticalAlignement = 191;
        this.selectorOffset = 25;
        //var style = { font: "20px title", fill: "#f9bc00", boundsAlignH: "top", boundsAlignV: "middle" };
        
        this.game.add.sprite(0, 0, 'menu_background');
        
        // Buttons sprites    
        this.newGame = this.game.add.text(this.menuVerticalAlignement, 240, "NEW GAME", style);
        this.levelSelector = this.game.add.text(this.menuVerticalAlignement, 270, "LEVELS", style);
        this.score = this.game.add.text(this.menuVerticalAlignement, 300, "SCORES", style);
        this.exit = this.game.add.text(this.menuVerticalAlignement, 330, "EXIT", style);
        

        // Buttons list
        this.buttonIterator = 0;
        this.buttonList = Array(4);
        this.buttonList[0] = this.newGame;
        this.buttonList[1] = this.levelSelector;
        this.buttonList[2] = this.score;
        this.buttonList[3] = this.exit;
        
        
        // Selector
        this.selectorPressed = false;        
        this.selector = this.game.add.sprite(this.menuVerticalAlignement - this.selectorOffset, this.buttonList[0].y, 'menu_selector');
        
        // Input initialization
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        //Audio
        this.menuAudio = this.game.add.audio('menu');
        if(!this.menuAudio.isPlaying){
            this.menuAudio.play();
            this.menuAudio.loopFull();
        }
            
        this.startAudio = this.game.add.audio('start');
        this.started = false;
        
    },
    
    update: function () {
        if(!this.started){
            this.SelectorLogic();
        }
        else{
            if(!this.startAudio.isPlaying && this.buttonIterator == 0){
                this.game.state.start('level1');
            }
            else if(this.buttonIterator == 1){
                this.game.state.start('LevelSelector');
            }
            else if(this.buttonIterator == 2){
                this.startAudio.destroy();
                    this.game.state.start('Scores');
            }
            else if(this.buttonIterator == 3){
                this.game.destroy();
            }
        }  
    },
    
    // -------------- FUNCTIONS --------------
    
    SelectorLogic: function () {        
        
        if(this.cursors.down.isDown){
            this.UpdateSelector(1);
        }
        else if(this.cursors.up.isDown){
            this.UpdateSelector(-1);            
        }
        else {
            this.selectorPressed = false;
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            if(this.buttonIterator == 0){
                this.startAudio.play();
            }
            this.started = true;
            this.menuAudio.destroy();
        }
    },
    
    UpdateSelector: function (input){

        if(this.selectorPressed) return;
        
        this.buttonIterator += input;
        
        if(this.buttonIterator >= this.buttonList.length) {
            this.buttonIterator = 0;            
        }
        else if(this.buttonIterator < 0) {
            this.buttonIterator = this.buttonList.length - 1;
        }
        
        this.selector.y = this.buttonList[this.buttonIterator].y;
        
        this.selectorPressed = true;
    },    
    
};