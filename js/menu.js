var donkeyKong = donkeyKong || {};


donkeyKong.menu = {
    
    
    preload: function () {
        this.load.image('menu_background', 'assets/sprites/menu_background.png');
        this.load.image('1player_button', 'assets/sprites/menu_1player_button.png');
        this.load.image('2player_button', 'assets/sprites/menu_2player_button.png');
        this.load.image('menu_selector', 'assets/sprites/menu_selector.png');
        
    },
    
    create: function () {
        
        // Settings
        this.menuVerticalAlignement = 191; 
        this.selectorOffset = 25;   
        
        // Buttons sprites    
        this.background = this.game.add.sprite(0, 0, 'menu_background');
        this.onePlayerButton = this.game.add.sprite(this.menuVerticalAlignement, 250, '1player_button');
        this.twoPlayerButton = this.game.add.sprite(this.menuVerticalAlignement, 280, '2player_button');
        

        // Buttons list
        this.buttonIterator = 0;        
        this.buttonList = Array(2);
        this.buttonList[0] = this.onePlayerButton;
        this.buttonList[1] = this.twoPlayerButton;

        
        // Selector
        this.selectorPressed = false;        
        this.selector = this.game.add.sprite(this.menuVerticalAlignement - this.selectorOffset, this.buttonList[0].y, 'menu_selector');
        
        // Input initialization
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
    },
    
    update: function () {
        
        this.SelectorLogic();
        
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
                this.game.state.start('DebugLevel');            
            }
            else if(this.buttonIterator == 1){
                this.game.state.start('DebugLevel');
            }
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