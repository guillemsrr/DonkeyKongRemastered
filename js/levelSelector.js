var donkeyKong = donkeyKong || {};


donkeyKong.levelSelector = {
    
    
    preload: function () {
        this.load.image('menu_selector', 'assets/sprites/menu_selector.png');
        this.load.audio('start', 'assets/audio/start.mp3');
    },
    
    create: function () {
        
        // Settings
        this.horizontalAlignment = 100;
        this.selectorOffset = 25;
        this.titleSpace = 30;
        var style = { font: "20px title", fill: "#f9bc00", boundsAlignH: "top", boundsAlignV: "middle" };
        
        // Buttons sprites    
        this.level1 = this.game.add.text(this.horizontalAlignment, 50, "LEVEL 1", style);
        this.level2 = this.game.add.text(this.horizontalAlignment, this.level1.y + this.titleSpace, "LEVEL 2", style);
        this.level3 = this.game.add.text(this.horizontalAlignment, this.level2.y + this.titleSpace, "LEVEL 3", style);
        this.level4 = this.game.add.text(this.horizontalAlignment, this.level3.y + this.titleSpace, "LEVEL 4", style);
        this.level5 = this.game.add.text(this.horizontalAlignment, this.level4.y + this.titleSpace, "LEVEL 5", style);
        
        this.return = this.game.add.text(this.horizontalAlignment, this.level5.y + this.titleSpace*2, "RETURN", style);
        

        // Buttons list
        this.buttonIterator = 0;
        this.buttonList = Array(6);
        this.buttonList[0] = this.level1;
        this.buttonList[1] = this.level2;
        this.buttonList[2] = this.level3;
        this.buttonList[3] = this.level4;
        this.buttonList[4] = this.level5;
        this.buttonList[5] = this.return;
        
        
        // Selector
        this.selectorPressed = false;        
        this.selector = this.game.add.sprite(this.horizontalAlignment - this.selectorOffset, this.buttonList[0].y, 'menu_selector');
        
        // Input initialization
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
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
            if(!this.startAudio.isPlaying){
                if(this.buttonIterator == 0){
                    this.game.state.start('level1');
                }
                else if(this.buttonIterator == 1){
                    this.game.state.start('level2');
                }
                else if(this.buttonIterator == 2){
                    this.game.state.start('level3');
                }
                else if(this.buttonIterator == 3){
                    this.game.state.start('level4');
                }
                else if(this.buttonIterator == 4){
                    this.game.state.start('level5');
                }
            }
            if(this.buttonIterator == 5){
                this.game.state.start('Menu');
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
            if(this.buttonIterator != 5){
                this.startAudio.play();
            }
            this.menuAudio.destroy();
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