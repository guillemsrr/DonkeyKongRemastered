var donkeyKong = donkeyKong || {};

donkeyKong.level3 = {
    
    init:function(){
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);//NINJA
        this.game.physics.arcade.gravity.y = gameOptions.gravity;
        this.game.world.setBounds(0,0,gameOptions.level1Width, gameOptions.level1Height);
    },
    
    preload: function () {
        // ---- SPRITES ---- \\
        //Characters
        this.load.spritesheet('jumpman', 'assets/sprites/Mario.png', 38, 34);
        this.load.spritesheet('jumpman2', 'assets/sprites/Mario_2.png', 38, 34);
        //NPCs
        this.load.spritesheet('pauline', 'assets/sprites/pauline.png', 15, 22);
        //Enemies
        this.load.spritesheet('kong', 'assets/sprites/Donkey_Kong.png', 46, 32);
        this.load.spritesheet('fireBall', 'assets/sprites/Fire_Ball.png', 16, 16);
        //Barrels
        this.load.spritesheet('staticBarrel', 'assets/sprites/barrel.png', 15, 10);
        this.load.spritesheet('barrel', 'assets/sprites/barrel.png', 15, 10);
        this.load.spritesheet('spiky_barrel', 'assets/sprites/spiky_barrel.png', 15, 15);
        this.load.spritesheet('nuclear_barrel', 'assets/sprites/nuclear_barrel.png', 15, 10);
        
        this.load.spritesheet('destroy_barrel', 'assets/sprites/destroy_barrel.png', 15, 15);
        //Props
        this.load.spritesheet('oil', 'assets/sprites/oil.png', 16, 24);
        this.load.spritesheet('mineBarrel', 'assets/sprites/mineBarrel_2.png', 15, 10);
        this.load.spritesheet('mineExplosion', 'assets/sprites/mineExplosion.png', 128, 128);
        this.load.spritesheet('clockTime', 'assets/sprites/clock.png', 19, 19);
        this.load.spritesheet('starPowerUp', 'assets/sprites/star.png', 25, 25);
        this.load.image('beam', 'assets/sprites/beam.png');
        this.load.image('stair', 'assets/sprites/stairs.png');
        this.load.image('finalStair', 'assets/sprites/finalStair.png');
        this.load.image('hammer', 'assets/sprites/hammer.png');
        //Menu
        this.load.image('pause_background', 'assets/sprites/pause_background.png');
        this.load.image('menu_selector', 'assets/sprites/menu_selector.png');
        
        // Fonts
        
        //Audio
        this.load.audio('death', 'assets/audio/NES - Donkey Kong - Sound Effects/death.wav');
        this.load.audio('kong', 'assets/audio/kong.mp3');
        this.load.audio('itemGet', 'assets/audio/NES - Donkey Kong - Sound Effects/itemget.wav');
        this.load.audio('jump', 'assets/audio/NES - Donkey Kong - Sound Effects/jump.wav');
        this.load.audio('scoreUp', 'assets/audio/NES - Donkey Kong - Sound Effects/scoreUp.wav');
        this.load.audio('allRoundsCleared', 'assets/audio/allRoundsCleared.mp3');
        this.load.audio('hammer', 'assets/audio/hammer.mp3');
        this.load.audio('levelIntro', 'assets/audio/levelIntro.mp3');  
        this.load.audio('pause', 'assets/audio/pause.mp3');
        this.load.audio('roundClear', 'assets/audio/roundClear.mp3');
        this.load.audio('run', 'assets/audio/run_short.mp3');
        this.load.audio('stageTheme', 'assets/audio/stageTheme.mp3');
        this.load.audio('hit', 'assets/audio/hit.mp3');
        
    },
    
    create: function () {
        
        //-----------------------HUD-----------------------
        this.hud = new donkeyKong.hud(this.game, 70, 350, this);
        
        //----------------------AUDIO----------------------
        //level
        this.levelIntro = this.game.add.audio('levelIntro');
        this.levelIntro.play();
        this.start = false;
        this.allRoundsCleared = this.game.add.audio('allRoundsCleared');
        this.pause = this.game.add.audio('pause');
        this.roundClear = this.game.add.audio('roundClear');
        this.stageTheme = this.game.add.audio('stageTheme');
        this.stageTheme.loopFull();
        this.stageTheme.stop();
        //jumpman
        this.run = this.game.add.audio('run');//new Sound(this.game, 'run', 1, false);
        this.jump = this.game.add.audio('jump');
        this.scoreUp = this.game.add.audio('scoreUp');
        this.death = this.game.add.audio('death');
        this.itemGet = this.game.add.audio('itemGet');
        this.hammer = this.game.add.audio('hammer');
        this.hit = this.game.add.audio('hit');
        //kong
        this.kongSound = this.game.add.audio('kong');
        
        // ------------------ GAMEPLAY -------------------
        
        //static barrels
        this.staticBarrel = this.add.sprite(gameOptions.gameWidth/2 + 33, 65, "staticBarrel");
        this.staticBarrel.frame = 4;
        this.staticBarrel.angle = 90;
        
        this.staticBarrel2 = this.add.sprite(gameOptions.gameWidth/2 - 21, 65, "staticBarrel");
        this.staticBarrel2.frame = 4;
        this.staticBarrel2.angle = 90;
        
        this.staticBarrel3 = this.add.sprite(gameOptions.gameWidth/2 + 33, 52, "staticBarrel");
        this.staticBarrel3.frame = 4;
        this.staticBarrel3.angle = 90;
        
        this.staticBarrel4 = this.add.sprite(gameOptions.gameWidth/2 - 21, 52, "staticBarrel");
        this.staticBarrel4.frame = 4;
        this.staticBarrel4.angle = 90;
        
        //Stairs
        // Stairs initialized before Jumpman so jumpman sprite is on top of stairs sprite   
        this.stairs = this.game.add.group();
        this.finalStair = this.game.add.group();
        var stair = new donkeyKong.stair(this.game, 'stair', this.stairs, true, 'finalStair', this.finalStair);
        stair.createStair(28, 16*13.5, gameOptions.gameHeight - 8*5.5);
        stair.createStair(28, 16*19, gameOptions.gameHeight - 8*5.5);
        stair.createStair(40, gameOptions.gameWidth/2 , gameOptions.gameHeight - 8*26);
        stair.createStair(20, 370, 8*15.5);
        
        //Jumpman
        this.jumpmanGroup = this.game.add.group();
        this.jumpman = new donkeyKong.jumpman(this.game, 85, gameOptions.gameHeight - 8*12, 'jumpman', this.run, this.jump, this.scoreUp, this.death, this.itemGet, this.hammer);
        this.game.add.existing(this.jumpman);
        this.jumpmanGroup.add(this.jumpman);
        this.jumpman2 = new donkeyKong.jumpman(this.game, 75, 100, 'jumpman2', this.run, this.jump, this.scoreUp, this.death, this.itemGet, this.hammer);
        this.game.add.existing(this.jumpman2);
        this.jumpmanGroup.add(this.jumpman2);
        
        //PAULINE
        this.pauline = new donkeyKong.pauline(this.game, gameOptions.gameWidth - 16*6, 29, 'pauline');
        this.game.add.existing(this.pauline);
        
        //DONKEY KONG
        this.kong = new donkeyKong.kong(this.game, gameOptions.gameWidth/2 + 2, 64, 'kong', this, this.kongSound);
        this.game.add.existing(this.kong);
        
        
        //Oil Barrel
        this.oil = new donkeyKong.oil(this.game, 40, gameOptions.gameHeight - 52, 'oil');
        this.game.add.existing(this.oil);
        this.game.physics.arcade.enable(this.oil);
        this.oil.body.immovable = true;
        this.oil.body.moves = false;
        this.fireballCounter=0;
        
        //Barrel
        this.barrelTimer = 0;
        this.barrelRightSpawned = false;
        this.barrelLeftSpawned = false;
        this.barrelDownSpawned = false;
        
        this.mines = this.game.add.group();
        
        //-------------------- LEVEL ---------------------
        
        //Beams
        this.beams = this.game.add.group();
        this.beamCollider = this.game.add.group();
        var beamRow = new donkeyKong.beamRow(this.game,'beam', this.beams, 'finalStair', this.beamCollider);
        //base
        beamRow.createStraightRow(30, 16, gameOptions.gameHeight - 8*5);
        //right down
        beamRow.createDiagRow(4, 16*19, gameOptions.gameHeight - 8*20, false, true);
        beamRow.createDiagRow(4, 16*22, gameOptions.gameHeight - 8*22, false, true);
        beamRow.createDiagRow(4, 16*24, gameOptions.gameHeight - 8*24, false, true);
        beamRow.createDiagRow(4, 16*27, gameOptions.gameHeight - 8*26, false, true);
        //left down
        beamRow.createDiagRow(4, 16*13, gameOptions.gameHeight - 8*20, false, true,-1,-1);
        beamRow.createDiagRow(4, 16*10, gameOptions.gameHeight - 8*22, false, true,-1,-1);
        beamRow.createDiagRow(4, 16*7, gameOptions.gameHeight - 8*24, false, true,-1,-1);
        beamRow.createDiagRow(4, 16*4, gameOptions.gameHeight - 8*26, false, true,-1,-1);
        //left up
        beamRow.createDiagRow(4, 16*4, gameOptions.gameHeight - 8*30, false, true);
        beamRow.createDiagRow(4, 16*7, gameOptions.gameHeight - 8*32, false, true);
        beamRow.createDiagRow(4, 16*10, gameOptions.gameHeight - 8*34, false, true);
        //right up
        beamRow.createDiagRow(4, 16*27, gameOptions.gameHeight - 8*30, false, true, -1, -1);
        beamRow.createDiagRow(4, 16*24, gameOptions.gameHeight - 8*32, false, true, -1, -1);
        beamRow.createDiagRow(4, 16*21, gameOptions.gameHeight - 8*34, false, true, -1, -1);
        
        //final row
        beamRow.createStraightRow(4, 16*23, 8*5);
        //kong row
        beamRow.createStraightRow(4, 16*14, 8*10);
        //scape row
        beamRow.createStraightRow(4, 16*20, 8*16);
        beamRow.createStraightRow(1, 16*17, 8*16);
        
        
        var movingRow = new donkeyKong.beamRow(this.game,'beam', this.beams);
        
        this.levelCompleted = false;
                
        // Stairs initialized before Jumpman so jumpman sprite is on top of stairs sprite                
        // ------------------ PAUSE MENU -----------------
        
        // Settings
        this.menuVerticalAlignement = 191;
        this.selectorOffset = 25;
        
        //this.isPaused = false; TODO:: no hauria de ser false?¿ sinó fa la musiqueta al principi
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
        
        // Power up stoping time
        this.timeStopped = false;      
        this.timeStoppedCounter = 0;
        this.timeStoppedTime = 3;
        
        
        // This is called once so all Pause grafics and logic are hidden.
        this.PausePressed();
        
        
        //----- BARRELS GROUP -----
        this.barrels = this.game.add.group();
    },
    
    hitJumpman:function(_jumpman){        
        _jumpman.body.position.x = 60;
        _jumpman.body.position.y=gameOptions.gameHeight - 8*12;
        _jumpman.body.velocity.x = 0;
        this.hit.play();
    },
    
    SpawnFireBall:function(){
        this.fireballCounter++;
        if(this.fireballCounter<5){
            if(this.fireballCounter%2 == 0){
                this.fireBall = new donkeyKong.fireBall(this.game, this.oil.x + 15, this.oil.y, 30, 1, this.jumpman, this, 'fireBall');
                this.game.add.existing(this.fireBall);
            }
            else{
                this.fireBall = new donkeyKong.fireBall(this.game, this.oil.x + 15, this.oil.y, 30, 1, this.jumpman2, this, 'fireBall');
                this.game.add.existing(this.fireBall);
            }
        }
        if(!this.oil.fired)
            this.oil.fired = true;
    },
    
    NuclearBarrel:function(_game){
        _game = this.game;
        this.barrels.forEach(function(item) {
            _game.add.existing(new donkeyKong.destroy_barrel(_game, item.x,item.y, 'destroy_barrel'));
            item.kill();
        });
        this.barrels = this.game.add.group();
    },
    
    DestroyBarrel:function(_x, _y){
        this.destroy_barrel = new donkeyKong.destroy_barrel(this.game, _x, _y, 'destroy_barrel');
        this.game.add.existing(this.destroy_barrel);
    },

    update: function () {
        
        // ---------------- PAUSE LOGIC --------------------
        // Pause input
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
            this.PausePressed();
        }
        else if(this.pauseButtonPressed ){
            this.pauseButtonPressed = false;
            //console.log("2");
        }

        // Selector Input
        if(this.isPaused){
            this.SelectorLogic();
            //console.log("3");
        }
        
        
        // ---------------- GAMEPLAY -----------------
        //JumpmanCollisions
        if(!this.jumpman.overlapFinalStair || !this.jumpman.isInStair){
            this.game.physics.arcade.collide(this.jumpman,this.beams);
        }
        
        //JUMPMAN 2 
        if(!this.jumpman2.overlapFinalStair || !this.jumpman2.isInStair){            
            this.game.physics.arcade.collide(this.jumpman2,this.beams);
        }
        //All customUpdates inside
        if(!this.levelIntro.isPlaying && !this.levelCompleted && !this.isPaused){
            if(this.start){//the game starts when the sound is finished
                if(!this.stageTheme.isPlaying)
                    this.stageTheme.play();
                //JUMPMAN 1        
                this.jumpman.setInputs(this.player1Input.right.isDown,
                                       this.player1Input.left.isDown,
                                       this.player1Input.up.isDown,
                                       this.player1Input.down.isDown, 
                                       this.game.physics.arcade.overlap(this.jumpman,this.stairs), 
                                       this.game.physics.arcade.overlap(this.jumpman,this.finalStair));

                this.jumpman.customUpdate();


                //JUMPMAN 2 
                this.jumpman2.setInputs(this.player2Input.right.isDown,
                                        this.player2Input.left.isDown,
                                        this.player2Input.up.isDown,
                                        this.player2Input.down.isDown, 
                                        this.game.physics.arcade.overlap(this.jumpman2,this.stairs), 
                                        this.game.physics.arcade.overlap(this.jumpman2,this.finalStair));

                this.jumpman2.customUpdate();


                // Death debug
                if(this.game.input.keyboard.addKey(Phaser.Keyboard.F).isDown){
                    this.jumpman.die();
                    this.jumpman2.die();
                }

                //NPCs
                this.kong.customUpdate();
                this.pauline.customUpdate();
                this.oil.customUpdate();


                //Barrels
                if(this.barrelRightSpawned){
                    this.barrelTimer+=this.game.time.physicsElapsed;
                    if(this.barrelTimer > 0.7){
                        this.SpawnBarrelRight();
                        this.barrelRightSpawned = false;
                        this.barrelTimer = 0;
                    }
                }
                if(this.barrelDownSpawned){
                    this.barrelTimer+=this.game.time.physicsElapsed;
                    if(this.barrelTimer > 0.4){
                        this.SpawnBarrelDown();
                        this.barrelDownSpawned = false;
                        this.barrelTimer = 0;
                    }
                }
                if(this.barrelLeftSpawned){
                    this.barrelTimer+=this.game.time.physicsElapsed;
                    if(this.barrelTimer > 0.7){
                        this.SpawnBarrelLeft();
                        this.barrelLeftSpawned = false;
                        this.barrelTimer = 0;
                    }
                }
                
                // Hammer power ups collisions
                this.game.physics.arcade.overlap(this.jumpmanGroup, this.hammerPowerUpGroup, this.HammerPowerUp, null, this);
                
                // Time stop power up logic
                this.TimeStopped();

                //mineExplosions:
                for(var i = 0; i< this.mines.length; i++){
                    this.mines.children[i].checkExplosion();
                }
                /*this.game.mines.forEach(function(mine)){
                    mine.checkExplosion();   
                    console.log("mine group");
                }*/
            }
            this.start = true;
        }
        //levelCompletion
        if(!this.levelCompleted && (this.jumpman.body.position.y <= 20 || this.jumpman2.body.position.y <= 20)){
            this.levelCompleted = true;
            this.roundClear.play();
        }
        else if(this.levelCompleted && !this.roundClear.isPlaying){
            //load next level
            this.LoadNextLevel(this.game.state.getCurrentState().key);
        }
        
    },
    
    render: function () {

        // Input debug info
        //this.game.debug.inputInfo(32, 32);
        //this.game.debug.pointer(this.game.input.activePointer );
        //this.game.debug.body(this.jumpman);
    },
    
    
    // -------------- FUNCTIONS ----------------
    
    TimeStopped: function (){
        if(this.timeStopped){
            if(this.timeStoppedCounter < this.timeStoppedTime){
                this.timeStoppedCounter += this.game.time.physicsElapsed;
            }
            else{
                this.timeStopped = false;
                this.timeStoppedCounter = 0;
            }            
        }
    },
    
    HammerPowerUp: function (_jumpman, _hammer){
            _jumpman.grabHammer();
            _hammer.destroy();        
    },
    
    PausePressed: function (){       
        
        
        if(this.pauseButtonPressed) return;
        
        this.isPaused = !this.isPaused;
        
        this.pauseBackground.visible = this.isPaused;
        this.selector.visible = this.isPaused;
        for(var i = 0; i < this.buttonList.length; i++){
            this.buttonList[i].visible = this.isPaused;
        }
        
        this.pauseButtonPressed = true;
        this.pause.play();
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
    },
    
    SpawnBarrel: function(distX, dir){
        this.randomNumber = Math.floor(Math.random() * 100);
        if(this.randomNumber < 40){
            this.barrel = new donkeyKong.barrel(this.game, this.kong.x+distX, this.kong.y + 10, 75, dir, false, this, 'barrel');
            this.barrels.add(this.barrel);
        }
        else if (this.randomNumber <  60){
            this.spiky_barrel = new donkeyKong.spiky_barrel(this.game, this.kong.x+distX, this.kong.y + 10, 75, dir, this, 'spiky_barrel');
            this.barrels.add(this.spiky_barrel);
        }
        else if(this.randomNumber < 80){
            this.nuclear_barrel = new donkeyKong.nuclear_barrel(this.game, this.kong.x+distX, this.kong.y + 10, 75, dir, false, this, 'nuclear_barrel');            
            this.barrels.add(this.nuclear_barrel);
        }
        else if(this.randomNumber < 100){    
            var mine = new donkeyKong.mineBarrel(this.game, this.kong.x+distX, this.kong.y + 10, 75, dir, false, this, "mineBarrel");
            this.barrels.add(mine);
        }
    },
    SpawnBarrelRight: function(){
        this.SpawnBarrel(this.kong.width/2, 1)
    },
    SpawnBarrelLeft: function(){
        this.SpawnBarrel(this.kong.width/2, -1)
    },
    
    SpawnBarrelDown: function(){
        this.barrel = new donkeyKong.barrel(this.game, this.kong.x, this.kong.y, 75, 1, true, this, 'barrel');
        //this.barrel.scale = 1.1;
        this.barrels.add(this.barrel);
    },
    
    SpawnClockSprite: function(_jumpman){        
        this.newClock = new donkeyKong.clockTimeStop(this.game, 'clockTime', _jumpman);
        this.game.add.existing(this.newClock);
    },
    
    SpawnStarSprite: function(_jumpman){        
        this.newStar = new donkeyKong.starPowerUp(this.game, 'starPowerUp', _jumpman);
        this.game.add.existing(this.newStar);
    },
    
    LoadNextLevel: function (_key){
        this.game.sound.stopAll();
        if(_key=="level1"){
            this.game.state.start('level2');
        }
        else if(_key=="level2")
            this.game.state.start('level3');
        else if(_key=="level3")
            this.game.state.start('level4');
        else if(_key=="level4")
            this.game.state.start('level5');
        else if(_key=="level5")
            this.game.state.start('level1');
    }
};