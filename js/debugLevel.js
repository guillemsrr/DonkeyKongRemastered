var donkeyKong = donkeyKong || {};

donkeyKong.debugLevel= {
    
    init:function(){
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = gameOptions.gravity;
        this.game.world.setBounds(0,0,gameOptions.level1Width, gameOptions.level1Height);
    },
    
    preload: function () {
        // Sprites
        this.load.image('fire', 'assets/sprites/Fire_Ball.png');
        this.load.image('pause_background', 'assets/sprites/pause_background.png');
        this.load.image('menu_selector', 'assets/sprites/menu_selector.png');
        this.load.spritesheet('jumpman', 'assets/sprites/Mario.png', 38, 34);
        this.load.spritesheet('jumpman2', 'assets/sprites/Mario_2.png', 38, 34);
        this.load.spritesheet('barrel', 'assets/sprites/barrel.png', 15, 10);
        this.load.image('beam', 'assets/sprites/beam.png');
        
        // Fonts
        
    },
    
    create: function () {
        // ------------------ GAMEPLAY -------------------
        
        //Jumpman
        this.jumpman = new donkeyKong.jumpman(this.game, 20, gameOptions.gameHeight - 8*12, 'jumpman');
        //this.jumpman.body.enable = true;
        this.game.add.existing(this.jumpman);
        
        
        //-------------------- LEVEL ---------------------
        this.beams = this.game.add.group();
        var beamRow = new donkeyKong.beamRow(this.game,'beam', this.beams);
        beamRow.createStraightRow(16, 8, gameOptions.gameHeight - 8*10);
        beamRow.createDiagRow(16, 16*16, gameOptions.gameHeight - 8*10);
        beamRow.createDiagRow(24, 16*25, gameOptions.gameHeight - 8*17, -1 , -1);
        beamRow.createDiagRow(24, 16*5, gameOptions.gameHeight - 8*25);
        beamRow.createDiagRow(24, 16*3, gameOptions.gameHeight - 8*36, 1, 1);
        beamRow.createDiagRow(24, 16*5, gameOptions.gameHeight - 8*41);
        beamRow.createStraightRow(8, 16*2, 63);
        beamRow.createDiagRow(8, 16*10, 63, 1, 1);
        beamRow.createStraightRow(2, 16*7, 8*5);
        beamRow.createStraightRow(4, 16*9, 8*4);
        
        var movingRow = new donkeyKong.beamRow(this.game,'beam', this.beams);
        
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
    
    hitHero:function(){
        this.camera.shake(0.05,500);
        this.camera.flash(0xFF0000,500);
        this.jumpman.body.position.x = 20;
        this.jumpman.body.position.y=gameOptions.gameHeight - 8*12;
        this.jumpman.body.velocity.x =0;
        console.log('pupa');
    },
    update: function () {
        
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
        
        // ---------------- GAMEPLAY -----------------
        this.game.physics.arcade.collide(this.jumpman,this.beams);
        //this.jumpman.update();
        this.jumpman.move(this.cursors);
        this.jumpman.jump(this.jumpButton);
    },
    
    
    render: function () {

        // Input debug info
        //this.game.debug.inputInfo(32, 32);
        //this.game.debug.pointer(this.game.input.activePointer );
        this.game.debug.body(this.jumpman);
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