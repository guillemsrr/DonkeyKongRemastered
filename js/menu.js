var donkeyKong = donkeyKong || {};


donkeyKong.menu = {
    
    
    preload: function () {
        this.load.image('menu_background', 'assets/sprites/menu_background.png');
        this.load.image('1player_button', 'assets/sprites/menu_1player_button.png');
        this.load.image('2player_button', 'assets/sprites/menu_2player_button.png');
        this.load.image('menu_selector', 'assets/sprites/menu_selector.png');
        
        this.load.audio('menu', 'assets/audio/menu.mp3');
        this.load.audio('start', 'assets/audio/start.mp3');
        
    },
    
    create: function () {
        
        // Settings
        this.menuVerticalAlignement = 191; 
        this.selectorOffset = 25;   
        
        // Buttons sprites    
        this.background = this.game.add.sprite(0, 0, 'menu_background');
        this.onePlayerButton = this.game.add.sprite(this.menuVerticalAlignement, 250, '1player_button');
        this.twoPlayerButton = this.game.add.sprite(this.menuVerticalAlignement, 280, '2player_button');
        
        var style = { font: "bold 20px Arial", fill: "#fff", boundsAlignH: "top", boundsAlignV: "middle" };
        this.scoreButton = this.game.add.text(this.menuVerticalAlignement, 310, "SCORES", style);
        

        // Buttons list
        this.buttonIterator = 0;        
        this.buttonList = Array(3);
        this.buttonList[0] = this.onePlayerButton;
        this.buttonList[1] = this.twoPlayerButton;
        this.buttonList[2] = this.scoreButton;
        
        
        // Selector
        this.selectorPressed = false;        
        this.selector = this.game.add.sprite(this.menuVerticalAlignement - this.selectorOffset, this.buttonList[0].y, 'menu_selector');
        
        // Input initialization
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        //Audio
        this.menuAudio = this.game.add.audio('menu');
        this.menuAudio.play();
        this.menuAudio.loopFull();
        
        this.startAudio = this.game.add.audio('start');
        this.started = false;
        
    },
    
    update: function () {
        if(!this.started){
            this.SelectorLogic();
        }
        else{
            if(!this.startAudio.isPlaying){
                if(this.buttonIterator == 0){
                    this.game.state.start('DebugLevel');
                }
                else if(this.buttonIterator == 1){
                    this.game.state.start('Level2');
                }
                else if(this.buttonIterator == 2){
                    this.game.state.start('Scores');
                }
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
            this.menuAudio.destroy();
            this.startAudio.play();
            this.started = true;
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