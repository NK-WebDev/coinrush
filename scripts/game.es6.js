class LevelData {
    constructor() {
        this.levels = [{
                gapX: 0,
                gapY: 30,
                widthDiff: 0,
                total: 5,
                coinChance: 0.4,
                ememyChance: 0.2
            },
            {
                gapX: 0,
                gapY: 30,
                widthDiff: 10,
                total: 20,
                coinChance: 0.5,
                ememyChance: 0.3
            },
            {
                gapX: 10,
                gapY: 35,
                widthDiff: 15,
                total: 50,
                coinChance: 0.5,
                ememyChance: 0.3
            },
            {
                gapX: 20,
                gapY: 40,
                widthDiff: 20,
                total: 100,
                coinChance: 0.6,
                ememyChance: 0.4
            },
            {
                gapX: 30,
                gapY: 40,
                widthDiff: 25,
                total: 120,
                coinChance: 0.6,
                ememyChance: 0.4
            }
        ];
    }
}

class SoundPlayer {
    constructor(){
        this.soundOn = false;
    }
    playSound(sound,loopCount = 0){
        if(this.soundOn){
            var instance = createjs.Sound.play(sound,{loop:loopCount});
            return instance;
        }
        return false;
    }
}

class SceneManager {
    constructor() {
        this.menuScene = document.querySelector("#menu");
        this.gameScene = document.querySelector("#gameCanvas");
        this.startButton = document.querySelector("#start-game-button");
        this.gameOverScene = document.querySelector("#gameover");
        this.restartButton = document.querySelector("#restart-game-button");
        this.exitButton = document.querySelector("#exit-button");
        this.hud = document.querySelector("#hud");
        this.scoreText = document.querySelector("#score-text");
        this.highscoreText = document.querySelector("#highscore-text");
        this.handlePlayerClick();
        this.setHighScore();
    }

    showGame() {
        this.gameOverScene.classList.remove("active");
        this.menuScene.classList.remove("active");
        this.showHud();
        this.setGameScore(0);
    }

    showHud() {
        this.hud.classList.add("active");
    }

    hideHud() {
        this.hud.classList.remove("active");
    }

    setGameScore(score) {
        this.scoreText.textContent = score;
    }

    setHighScore() {
        if (localStorage.rushHighScore !== undefined) {
            this.highscoreText.textContent = localStorage.rushHighScore;
        } else {
            this.highscoreText.textContent = 0;
        }
    }

    gameOver() {
        this.hideHud();
        this.gameOverScene.classList.add("active");
        this.setHighScore();
    }

    showMenu() {
        this.menuScene.classList.add("active");
        this.gameOverScene.classList.remove("active");
    }

    handlePlayerClick() {
        var manager = this;
        this.startButton.addEventListener("click", function (e) {
            e.preventDefault();
            manager.showGame();
            game.loadGraphics();
            return false;
        });

        this.restartButton.addEventListener("click", function (e) {
            e.preventDefault();
            manager.showGame();
            game.loadGraphics();
            return false;
        });

        this.exitButton.addEventListener("click", function (e) {
            e.preventDefault();
            manager.showMenu();
            return false;
        });
    }
}

class ScoreCalculator {
    constructor() {
        this.score = 0;
    }
    increaseScore(level) {
        this.score += (level + 1) * (level + 1);
    }
}
// game graphic object
class GameObject extends createjs.Container {
    constructor(graphic) {
        super();

        if (graphic !== undefined) {
            this.graphic = graphic;
            this.addChild(graphic);

            let b = this.graphic.nominalBounds;
            this.setBounds(b.x, b.y, b.width, b.height);
        }
    }
}

// class for game objects that need to move
class MovableGameObject extends GameObject {
    constructor(graphic) {
        super(graphic);

        this.velocity = {
            x: 0,
            y: 0
        };
        this.isOnGround = false;
        this.on("tick", this.tick);
    }
    tick() {
        this.y += this.velocity.y;
        this.x += this.velocity.x;
    }
}

// hero object

class Hero extends MovableGameObject {
    constructor() {
        super(new library.HeroGraphic());
    }

    run() {

        if (!this.isOnGround) {
            this.velocity.x = 2;
            this.graphic.gotoAndPlay('run');
            this.isOnGround = true;
        }
    }
    jump() {
        if (this.isOnGround) {
            this.velocity.y = -13;
            soundPlayer.playSound("jump");
            this.graphic.gotoAndPlay("jump");
            this.isOnGround = false;
        }

    }
}

// coin object
class Coin extends GameObject {
    constructor() {
        super(new library.CoinGraphic());
    }
}

// enemy object
class Enemy extends MovableGameObject {
    constructor() {
        super(new library.ObstacleGraphic());

        this.directionX = -1;
        this.speed = 0.5;
        this.offsetX = 0;
        this.maxOffset = 10;

        this.on("tick", this.move);
    }

    move() {
        this.velocity.x = this.speed * this.directionX;
        this.offsetX += this.velocity.x;
        if (Math.abs(this.offsetX) > this.maxOffset) {
            this.directionX *= -1;
        }
    }
}

// platform object
class Platform extends GameObject {
    constructor() {
        super(new library.PlatformGraphic());
    }
    setClippingWidth(width) {
        this.graphic.instance.mask = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, width, this.getBounds().height));
        this.setBounds(this.x, this.y, width, this.getBounds().height);
    }
}

// world object which will contain all the game objects

class World extends createjs.Container {
    constructor() {
        super();
        this.levelData = new LevelData();
        this.scoreCalculator = new ScoreCalculator();
        this.currentLevel = 0;
        this.on("tick", this.tick);
        this.platforms = [];
        this.enemies = [];
        this.coins = [];
        this.generatePlatforms();
        this.generateEnemies();
        this.generateCoins();
        this.addHero();
    }

    tick() {
        this.applyGravity();

        var hitEnemy = this.targetHitTestObjects(this.hero, this.enemies);

        if (hitEnemy !== false) {
            soundPlayer.playSound("fire");
            game.gameOver();
        }

        if (this.hero.y > game.stage.canvas.height) {
            soundPlayer.playSound("fall");
            game.gameOver();
        }

        var hitCoin = this.targetHitTestObjects(this.hero, this.coins);

        if (hitCoin !== false) {
            this.eatCoin(hitCoin);
            soundPlayer.playSound("coin");
            this.scoreCalculator.increaseScore(this.currentLevel);
            sceneManager.setGameScore(this.scoreCalculator.score);
        }

        // focus on the hero
        this.x -= this.hero.velocity.x;
    }

    addHero() {
        var hero = new Hero();
        this.addChild(hero);
        hero.x = hero.y = 100;
        hero.y = 2;
        this.hero = hero;
    }

    generatePlatforms() {
        var nextX = 100;
        var nextY = 200;

        var levelNumber = 0;
        for (let level of this.levelData.levels) {
            for (let i = 0; i < level.total; i++) {
                var platform = new Platform();
                platform.x = nextX;
                platform.y = nextY;

                var width = platform.getBounds().width;
                platform.setClippingWidth(width - Math.random() * level.widthDiff);

                platform.levelNumber = levelNumber;

                this.platforms.push(platform);
                this.addChild(platform);

                nextX = platform.x + platform.getBounds().width + Math.random() * level.gapX;
                nextY = platform.y + (Math.random() - 0.5) * level.gapY;
            }
            levelNumber++;
        }

    }

    // generate enemies and place on platforms
    generateEnemies() {
        // skip first two platforms
        for (let i = 2; i < this.platforms.length; i++) {
            var platform = this.platforms[i];
            var levelNumber = platform.levelNumber;
            var chance = this.levelData.levels[levelNumber].ememyChance;
            if (Math.random() < chance) {
                var enemy = new Enemy();
                enemy.x = platform.x + platform.getBounds().width / 2;
                enemy.y = platform.y - enemy.getBounds().height;
                this.addChild(enemy);
                this.enemies.push(enemy);
            }
        }
    }

    // generate coins 
    generateCoins() {
        for (let platform of this.platforms) {
            var levelNumber = platform.levelNumber;
            var chance = this.levelData.levels[levelNumber].coinChance;
            if (Math.random() < chance) { // 70% chance
                let coin = new Coin();
                coin.x = platform.x + Math.random() * platform.getBounds().width;
                coin.y = platform.y - coin.getBounds().height;
                this.addChild(coin);
                this.coins.push(coin);
            }
        }
    }

    applyGravity() {
        var gravity = 1;
        var terminalVelocity = 5;
        // TODO: loop all movable game objects
        var object = this.hero;

        object.velocity.y += gravity;
        object.velocity.y = Math.min(object.velocity.y, terminalVelocity);

        if (this.willObjectOnGround(object)) {
            object.velocity.y = 1;
        }
        var platform = this.isObjectOnGround(object);
        if (platform !== false && object.velocity.y > 0) {
            this.currentLevel = platform.levelNumber;
            object.velocity.y = 0;
            this.hero.run();
        }
    }

    isObjectOnGround(object) {
        var objectWidth = object.getBounds().width;
        var objectheight = object.getBounds().height;
        var platforms = this.platforms;
        for (let i = 0; i < this.platforms.length; i++) {
            var platformWidth = this.platforms[i].getBounds().width;
            var platformHeight = this.platforms[i].getBounds().height;

            if (object.x >= platforms[i].x &&
                object.x < platforms[i].x + platformWidth &&
                object.y + objectheight >= platforms[i].y &&
                object.y + objectheight <= platforms[i].y + platformHeight
            ) {
                return platforms[i];
            }
        }
        return false;
    }

    willObjectOnGround(object) {
        var objectWidth = object.getBounds().width;
        var objectheight = object.getBounds().height;
        var objectNextY = object.y + objectheight + object.velocity.y;
        var platforms = this.platforms;
        for (let i = 0; i < this.platforms.length; i++) {
            var platformWidth = this.platforms[i].getBounds().width;
            var platformHeight = this.platforms[i].getBounds().height;

            if (object.x >= platforms[i].x &&
                object.x < platforms[i].x + platformWidth &&
                objectNextY >= platforms[i].y &&
                objectNextY <= platforms[i].y + platformHeight
            ) {
                return true;
            }
        }
        return false;
    }

    objectsHitTest(object1, object2) {
        var x1 = object1.x;
        var y1 = object1.y;
        var w1 = object1.getBounds().width;
        var h1 = object1.getBounds().height;

        var x2 = object2.x;
        var y2 = object2.y;
        var w2 = object2.getBounds().width;
        var h2 = object2.getBounds().height;

        return (Math.abs(x1 - x2) * 2 < (w1 + w2) &&
            Math.abs(y1 - y2) * 2 < (h1 + h2)
        );
    }

    targetHitTestObjects(target, objects) {
        for (var object of objects) {
            if (this.objectsHitTest(target, object)) {
                return object;
            }
        }
        return false;
    }

    // remove eaten coin 
    eatCoin(coin) {
        for (let i = 0; i < this.coins.length; i++) {
            if (coin === this.coins[i]) {
                this.coins.splice(i, 1);
            }
        }
        coin.parent.removeChild(coin);
    }
}

// main game logic
class Game {
    constructor() {
        // setup the stage
        this.canvas = document.getElementById("gameCanvas");
        this.stage = new createjs.Stage(this.canvas);
        this.gameLoaded = false;
        // enable touch
        createjs.Touch.enable(this.stage);

        this.loadSounds();

        // set FPS
        createjs.Ticker.framerate = 70;
        // update stage
        createjs.Ticker.addEventListener("tick", this.stage);
    }

    // start the game with initail setuo
    startGame() {
        this.isGameOver = false;
        soundPlayer.soundOn = true;
        this.stage.removeAllChildren(); 
        this.themeMusic = soundPlayer.playSound("theme",-1);
        this.stage.addChild(new library.BackgroundGraphic());
        this.world = new World();
        this.stage.addChild(this.world);
        var hero = this.world.hero;
        this.stage.on("stagemousedown", function () {
            hero.jump();
        });
        window.addEventListener("keydown",function(e){
            if(e.keyCode === 32){
                hero.jump();
            }
        });
    }

    gameOver() {
        if (localStorage.rushHighScore !== undefined) {
            if (localStorage.rushHighScore < this.world.scoreCalculator.score) {
                localStorage.rushHighScore = this.world.scoreCalculator.score;
            }
        } else {
            localStorage.rushHighScore = this.world.scoreCalculator.score;
        }
        soundPlayer.playSound("gameover");
        soundPlayer.soundOn = false;
        this.themeMusic.stop();
        if (!this.isGameOver) {
            sceneManager.gameOver();
            this.isGameOver = true;
        }

    }

    // load the sounds

    loadSounds() {
        var assetPath = "sound/";
        var sounds = [
            {
                src: "theme.ogg",
                id: "theme",
                data: 1,
            },
            {
                src: "coin.ogg",
                id: "coin"
            },
            {
                src: "fall.ogg",
                id: "fall"
            },
            {
                src: "fire.ogg",
                id: "fire"
            },
            {
                src: "gameover.ogg",
                id: "gameover"
            },
            {
                src: "jump.ogg",
                id: "jump"
            },  
        ];
        createjs.Sound.alternateExtensions = ["aac"]; // if the passed extension is not supported, try this extension
        createjs.Sound.registerSounds(sounds, assetPath);
    }

    // load the assets
    loadGraphics() {
        var comp = AdobeAn.getComposition("BEA1C68EC7BC6140BE9E0F69E1D47BF0");
        var lib = comp.getLibrary();
        var loader = new createjs.LoadQueue(false);
        loader.addEventListener("fileload", handleFileLoad);
        loader.addEventListener("complete", handleComplete.bind(this));
        var lib = comp.getLibrary();
        loader.loadManifest(lib.properties.manifest);

        function handleFileLoad(event) {
            var images = comp.getImages();
            if (event && (event.item.type == "image")) {
                images[event.item.id] = event.result;
            }
        }

        function handleComplete(event) {
            //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
            var lib = comp.getLibrary();
            var ss = comp.getSpriteSheet();
            var queue = event.target;
            var ssMetadata = lib.ssMetadata;
            for (let i = 0; i < ssMetadata.length; i++) {
                ss[ssMetadata[i].name] = new createjs.SpriteSheet({
                    "images": [queue.getResult(ssMetadata[i].name)],
                    "frames": ssMetadata[i].frames
                })
            }
            this.startGame();
            this.canvas.classList.add("gameLoaded");
        }
    }

}

var soundPlayer = new SoundPlayer();
var game = new Game();

var sceneManager = new SceneManager();