var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, initialx, initialy, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth; 
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
	this.startx = initialx
	this.starty = initialy
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}


Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}
Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}
Animation.prototype.drawSecond = function (tick, ctx, x, y) {
	this.elapsedTime += tick;
	if (this.isDone()) {
		if(this.loop) this.elapsedTime = 0;
	}
	var frame = this.currentFrame
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function () {
};

function MushroomDude(game, spritesheet) {
	this.direction = "right";
    this.downanimation = new Animation(spritesheet, 133, 200, 0, 0, 800, 0.10, 4, true, 1);
	this.rightanimation = new Animation(spritesheet, 133, 200, 200, 200, 800, 0.10, 4, true, 1);
    this.x = 0;
    this.y = 0;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}
 
MushroomDude.prototype.draw = function () {
	if (this.direction === "down") {
		this.downanimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	}
	if (this.direction === "right") {
		this.rightanimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	}
}	

MushroomDude.prototype.update = function () {
    //if (this.animation.elapsedTime < this.animation.totalTime * 2 / 3)
        this.y += this.game.clockTick * this.speed;
    if (this.y > 800) this.y = -230;
}


// inheritance 
function Cheetah(game, spritesheet) {
    this.animation = new Animation(spritesheet, 512, 256, 0, 0, 2, 0.05, 8, true, 0.5);
    this.speed = 350;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 250);
}

Cheetah.prototype = new Entity();
Cheetah.prototype.constructor = Cheetah;

Cheetah.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}

Cheetah.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

// inheritance 
function Guy(game, spritesheet) {
    this.animation = new Animation(spritesheet, 154, 215, 0, 0, 4, 0.15, 4, true, 0.5);
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 450);
}

Guy.prototype = new Entity();
Guy.prototype.constructor = Guy;

Guy.prototype.update = function () {
    this.y += this.game.clockTick * this.speed;
    if (this.y > 800) this.y = -230;
    Entity.prototype.update.call(this);
}

Guy.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
function Braind(game, spriteSheet) {
	this.animation = new Animation2(spriteSheet, 125, 150, 27, 0.15, 4, true, 1);
	this.speed = 100;
	this.ctx = game.ctx;
	Entity.call(this, game, 0, 700);
}
Braind.prototype.update
	


AM.queueDownload("./img/RobotUnicorn.png");
AM.queueDownload("./img/clear82.png");
//AM.queueDownload("./img/guy.jpg");
AM.queueDownload("./img/Charactervector.png");
AM.queueDownload("./img/runningcat.png");
AM.queueDownload("./img/background.jpg");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
	//gameEngine.addEntity(new Clear8(gameEngine, AM.getAsset("./img/clear82.png")));
    //gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.jpg")));
    gameEngine.addEntity(new MushroomDude(gameEngine, AM.getAsset("./img/Charactervector.png")));
    //gameEngine.addEntity(new Cheetah(gameEngine, AM.getAsset("./img/runningcat.png")));
    //gameEngine.addEntity(new Guy(gameEngine, AM.getAsset("./img/guy.jpg")));

    console.log("All Done!");
});