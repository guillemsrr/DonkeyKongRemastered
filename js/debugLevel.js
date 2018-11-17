var donkeyKong = donkeyKong || {};

donkeyKong.debugLevel= {
    
    init:function(){
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y=gameOptions.gravity;
        this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
        this.game.world.enableBody = true;
    },
    
    preload: function () {
        // Sprites
        this.load.image('fire', 'assets/sprites/Fire_Ball.png');
        this.load.image('pause_background', 'assets/sprites/pause_background.png');
        this.load.image('menu_selector', 'assets/sprites/menu_selector.png');
        this.load.spritesheet('jumpman', 'assets/sprites/Mario.png', 38, 34);
        this.load.spritesheet('jumpman2', 'assets/sprites/Mario_2.png', 38, 34);
        this.load.image('beam', 'assets/sprites/beam.png');
        
        // Fonts
        
    },
    
    create: function () {
        
        // ------------------ GAMEPLAY -------------------
        
        //Jumpman
        this.jumpman = new donkeyKong.jumpman(this.game, 100, 100, 'jumpman');
        this.game.add.existing(this.jumpman);
        
        //FireBall
        //this.fireBall = this.game.add.sprite(100, 100, 'fire');
        
        //-------------------- LEVEL ---------------------
        this.beams = this.game.add.group();
        //beamRow = new donkeyKong.beamRow(this.game, 10, 16, gameOptions.gameHeight - 8*15, 'beam');
        //this.game.add.existing(beamRow);
        //beamRow.createRow(true);
        //this.beams.add(beamRow);
        
        for (var i=0; i<gameOptions.gameWidth/16;i++){
            beam = this.game.add.sprite(16*i, gameOptions.gameHeight - 8*15,'beam');
            beam.body.immovable = true; 
            beam.body.gravity = false;
            this.beams.add(beam);
        }
        
        
        
        // ------------------ PAUSE MENU -----------------
        
        // Settings
        this.menuVerticalAlignement = 191;
        this.selectorOffset = 25;
        
        this.isPaused = true;
        this.pauseButtonPressed = false;
        
        // Pause graphics
        this.pauseBackground = this.game.add.sprite(0, 0, 'pause_background');
        var style = { font: "bold 25px Arial", fill: "#fff", boundsAlignH: "top", boundsAlignV: "middle" };
        this.resume_button = this.game.add.text(this.menuVerticalAlignement, 200, "Resume", style);
        this.backToMenu_button = this.game.add.text(this.menuVerticalAlignement, 250, "Back to Menu", style);        

        // Buttons list
        this.buttonIterator = 0;        
        this.buttonList = Array(2);
        this.buttonList[0] = this.resume_button;
        this.buttonList[1] = this.backToMenu_button;        
        
        // Selector
        this.selectorPressed = false;        
        this.selector = this.game.add.sprite(this.menuVerticalAlignement - this.selectorOffset, this.buttonList[0].y, 'menu_selector');
        
        // Cursor input initialization
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.jumpButton=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
        
        // This is called once so all Pause grafics and logic are hidden.
        this.PausePressed();
        
    },
    
    update: function () {
        
        // ---------------- GAMEPLAY -----------------
        this.jumpman.update();
        this.jumpman.move(this.cursors);
        this.jumpman.jump(this.jumpButton);
        this.game.physics.arcade.collide(this.jumpman,this.beams);
        
        
        
        // ---------------- PAUSE LOGIC --------------------
        
        
        // Pause input
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
            this.PausePressed();
        }
        else{
            this.pauseButtonPressed = false;
        }
        
        // Selector Input
        if(this.isPaused){
            this.SelectorLogic();           
        }
        
    },
    render: function () {

    // Input debug info
    //this.game.debug.inputInfo(32, 32);
    //this.game.debug.pointer(this.game.input.activePointer );
        this.game.debug.text(this.cursors);
    },
    
    
    // -------------- FUNCTIONS ----------------
    
    PausePressed: function (){        
        
        if(this.pauseButtonPressed) return;
        
        this.isPaused = !this.isPaused;
        
        this.pauseBackground.visible = this.isPaused;
        this.selector.visible = this.isPaused;
        for(var i = 0; i < this.buttonList.length; i++){
            this.buttonList[i].visible = this.isPaused;
        }
        
        this.pauseButtonPressed = true;
    },
    
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
            //this.game.state.start(this.buttonList[this.buttonIterator].tagName);
            if(this.buttonIterator == 0){
                this.PausePressed();
            }
            else if(this.buttonIterator == 1){
                this.game.state.start('Menu');                
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
    }
    
};