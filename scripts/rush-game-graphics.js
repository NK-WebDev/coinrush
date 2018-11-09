var library = {};
(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"rush_game_graphics_atlas_", frames: [[48,336,10,10],[72,336,10,10],[60,336,10,10],[122,322,20,10],[144,322,20,10],[0,322,120,12],[32,336,14,14],[0,336,14,14],[16,336,14,14],[166,322,14,14],[0,0,600,320]]}
];


// symbols:



(lib.coinspixels_1 = function() {
	this.spriteSheet = ss["rush_game_graphics_atlas_"];
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.coinspixels_2 = function() {
	this.spriteSheet = ss["rush_game_graphics_atlas_"];
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.coinspixels_3 = function() {
	this.spriteSheet = ss["rush_game_graphics_atlas_"];
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.obstaclepixels_Layer1 = function() {
	this.spriteSheet = ss["rush_game_graphics_atlas_"];
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.obstaclepixels_Layer2 = function() {
	this.spriteSheet = ss["rush_game_graphics_atlas_"];
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.platform = function() {
	this.spriteSheet = ss["rush_game_graphics_atlas_"];
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.runningpixels_f1 = function() {
	this.spriteSheet = ss["rush_game_graphics_atlas_"];
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.runningpixels_f2 = function() {
	this.spriteSheet = ss["rush_game_graphics_atlas_"];
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.runningpixels_f3 = function() {
	this.spriteSheet = ss["rush_game_graphics_atlas_"];
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.runningpixels_f4 = function() {
	this.spriteSheet = ss["rush_game_graphics_atlas_"];
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.trees = function() {
	this.spriteSheet = ss["rush_game_graphics_atlas_"];
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.PlatformGraphic = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.platform();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.PlatformGraphic, new cjs.Rectangle(0,0,120,12), null);


(lib.ObstacleGraphic = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.obstaclepixels_Layer1();
	this.instance.parent = this;

	this.instance_1 = new lib.obstaclepixels_Layer2();
	this.instance_1.parent = this;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,20,10);


(lib.HeroGraphic = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{run:0,jump:12});

	// timeline functions:
	this.frame_11 = function() {
		this.gotoAndPlay("run");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(11).call(this.frame_11).wait(3));

	// Layer 1
	this.instance = new lib.runningpixels_f1();
	this.instance.parent = this;

	this.instance_1 = new lib.runningpixels_f2();
	this.instance_1.parent = this;

	this.instance_2 = new lib.runningpixels_f3();
	this.instance_2.parent = this;

	this.instance_3 = new lib.runningpixels_f4();
	this.instance_3.parent = this;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance}]},3).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,14,14);


(lib.CoinGraphic = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.coinspixels_1();
	this.instance.parent = this;

	this.instance_1 = new lib.coinspixels_2();
	this.instance_1.parent = this;

	this.instance_2 = new lib.coinspixels_3();
	this.instance_2.parent = this;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_1}]},2).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,10,10);


(lib.BackgroundGraphic = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.trees();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.BackgroundGraphic, new cjs.Rectangle(0,0,600,320), null);


// stage content:
(lib.Untitled1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.ObstacleGraphic();
	this.instance.parent = this;
	this.instance.setTransform(222.1,157.1,1,1,0,0,0,10,5);

	this.instance_1 = new lib.CoinGraphic();
	this.instance_1.parent = this;
	this.instance_1.setTransform(187,152.1,1,1,0,0,0,5,5);

	this.instance_2 = new lib.HeroGraphic();
	this.instance_2.parent = this;
	this.instance_2.setTransform(137.1,150.1,1,1,0,0,0,7,7);

	this.instance_3 = new lib.PlatformGraphic();
	this.instance_3.parent = this;
	this.instance_3.setTransform(172.1,168.1,1,1,0,0,0,60,6);

	this.instance_4 = new lib.BackgroundGraphic();
	this.instance_4.parent = this;
	this.instance_4.setTransform(249,160,1,1,0,0,0,300,160);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(189,160,600,320);
// library properties:
lib.properties = {
	id: 'BEA1C68EC7BC6140BE9E0F69E1D47BF0',
	width: 480,
	height: 320,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/rush_game_graphics_atlas_.png", id:"rush_game_graphics_atlas_"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['BEA1C68EC7BC6140BE9E0F69E1D47BF0'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

library = lib;

})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;