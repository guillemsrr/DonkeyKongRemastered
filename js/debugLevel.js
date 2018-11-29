var donkeyKong = donkeyKong || {};

donkeyKong.debugLevel= {
    
    init:function(){
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);//NINJA
        this.game.physics.arcade.gravity.y = gameOptions.gravity;
        this.game.world.setBounds(0,0,gameOptions.level1Width, gameOptions.level1Height);
    },
    
    preload: function () {
        // Sprites
        this.load.image('pause_background', 'assets/sprites/pause_background.png');
        this.load.image('menu_selector', 'assets/sprites/menu_selector.png');
        this.load.spritesheet('jumpman', 'assets/sprites/Mario.png', 38, 34);
        this.load.spritesheet('jumpman2', 'assets/sprites/Mario_2.png', 38, 34);
        this.load.spritesheet('barrel', 'assets/sprites/barrel.png', 15, 10);
        this.load.image('beam', 'assets/sprites/beam.png');
        this.load.image('stair', 'assets/sprites/stairs.png');
        this.load.image('finalStair', 'assets/sprites/finalStair.png');
        this.load.spritesheet('pauline', 'assets/sprites/pauline.png', 15, 22);
        this.load.spritesheet('kong', 'assets/sprites/Donkey_Kong.png', 46, 32);
        this.load.spritesheet('fireBall', 'assets/sprites/Fire_Ball.png', 16, 16);
        this.load.spritesheet('oil', 'assets/sprites/oil.png', 16, 24);
        
        // Fonts
        
    },
    
    create: function () {
        // ------------------ GAMEPLAY -------------------
        
        //Stairs
        // Stairs initialized before Jumpman so jumpman sprite is on top of stairs sprite   
        this.stairs = this.game.add.group();
        this.finalStair = this.game.add.group();
        var stair = new donkeyKong.stair(this.game, 'stair', this.stairs, true, 'finalStair', this.finalStair);
        stair.createStair(11, 380, 360);        
        stair.createStair(10, 110, 293);        
        stair.createStair(14, 220, 300);
        stair.createStair(11, 380, 230);
        stair.createStair(15, 240, 237);
        stair.createStair(10, 110, 163);
        stair.createStair(12, 170, 167);
        stair.createStair(10, 260, 111);
        stair.createStair(7, 200, 64);
        
        //Jumpman
        this.jumpman = new donkeyKong.jumpman(this.game, 60, gameOptions.gameHeight - 8*12, 'jumpman');
        this.game.add.existing(this.jumpman);
        this.jumpman2 = new donkeyKong.jumpman(this.game, 75, gameOptions.gameHeight - 8*12, 'jumpman2');
        this.game.add.existing(this.jumpman2);
        
        this.pauline = new donkeyKong.pauline(this.game, 123, 27, 'pauline');
        this.game.add.existing(this.pauline);
        
        this.kong = new donkeyKong.kong(this.game, 70, 45, 'kong');
        this.game.add.existing(this.kong);
        
        this.fireBall = new donkeyKong.fireBall(this.game, 200, gameOptions.gameHeight - 8*11, 'fireBall');
        this.game.add.existing(this.fireBall);
        
        this.oil = new donkeyKong.oil(this.game, 40, gameOptions.gameHeight - 93, 'oil');
        this.game.add.existing(this.oil);
        
        //Barrel
        //donkeyKong.enemy_prefab =      function(_game,_x,_y,_pointA, _pointB,_speed,_direction,_level, _tag)
        this.pointsArray = [16*15, 16*28];
        this.barrel = new donkeyKong.enemy_prefab(this.game, this.kong.x+this.kong.width/2, this.kong.y, this.pointsArray, 75, 1, this, 'barrel');
        this.game.add.existing(this.barrel);
        
        
        //-------------------- LEVEL ---------------------
        
        //Beams
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
                
        // Stairs initialized before Jumpman so jumpman sprite is on top of stairs sprite        
        //create stairs here
        
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
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        // Selector
        this.selectorPressed = false;   
        this.selector = this.game.add.sprite(this.menuVerticalAlignement - this.selectorOffset, this.buttonList[0].y, 'menu_selector');
        
        // Cursor input initialization
        this.player1Input={
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            up: this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
            down: this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
        }
        
        this.player2Input={            
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
            up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
        }
        
        
        
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
        
        //if(this.game.physics.arcade.overlap(this.jumpman,this.stairs))
        
        
        
        //JUMPMAN 1        
        if(!this.jumpman.overlapFinalStair || !this.jumpman.isInStair){            
            this.game.physics.arcade.collide(this.jumpman,this.beams);
        }
        
        this.jumpman.setInputs(this.player1Input.right.isDown,
                               this.player1Input.left.isDown,
                               this.player1Input.up.isDown,
                               this.player1Input.down.isDown, 
                               this.game.physics.arcade.overlap(this.jumpman,this.stairs), 
                               this.game.physics.arcade.overlap(this.jumpman,this.finalStair));
        
        this.jumpman.customUpdate();
        
        //JUMPMAN 2 
        if(!this.jumpman2.overlapFinalStair || !this.jumpman2.isInStair){            
            this.game.physics.arcade.collide(this.jumpman2,this.beams);
        }
        
        this.jumpman2.setInputs(this.player2Input.right.isDown,
                                this.player2Input.left.isDown,
                                this.player2Input.up.isDown,
                                this.player2Input.down.isDown, 
                                this.game.physics.arcade.overlap(this.jumpman2,this.stairs), 
                                this.game.physics.arcade.overlap(this.jumpman2,this.finalStair));
        
        this.jumpman2.customUpdate();
        
        //NPCs
        this.pauline.update();
        
        this.fireBall.move();
        
        this.oil.move();
    },
    
    
    render: function () {

        // Input debug info
        //this.game.debug.inputInfo(32, 32);
        //this.game.debug.pointer(this.game.input.activePointer );
        //this.game.debug.body(this.jumpman);
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