// Litle bit of help from http://www.codevinsky.com/phaser-2-0-tutorial-flappy-bird-part-1/ 

window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.ground = new window.Ground(this.el.find('.Ground'), this);
		this.cloud = new window.Cloud(this.el.find('.Cloud'), this);
		this.pipeTop = new window.Pipe(this.el.find('.PipeTop'), this, 1);
		this.pipeBottom = new window.Pipe(this.el.find('.PipeBottom'), this, 2);
		this.pipeTop2 = new window.Pipe(this.el.find('.PipeTop'), this, 1);
		this.pipeBottom2 = new window.Pipe(this.el.find('.PipeBottom'), this, 2);
		//console.log('PipeTop: ', this.pipeTop);
		//console.log('PipeBottom: ',this.pipeBottom);

		//this.pipe = new window.Pipe(this.el.find('Pipe'), this, 1);
		this.isPlaying = false;

		this.gameStarted = false;

		//var fontSize = Math.min(
		//	window.innerWidth / 102.4,
		//	window.innerHeight / 57.6
		//	);
		//el.css('fontSize', fontSize + 'px');

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		if(Controls.keys.up || Controls.keys.space){
			this.gameStarted = true;
		}

		// Update game entities.
		this.player.onFrame(delta, this.gameStarted);
		this.ground.onFrame(delta);
		this.cloud.onFrame(delta);
		this.pipeTop.onFrame(delta, this.gameStarted);
		this.pipeBottom.onFrame(delta, this.gameStarted);
		//this.pipeTop2.onFrame(delta-0.2);
		//this.pipeBottom2.onFrame(delta-0.2);
		//this.pipe.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.gameStarted = false;
		this.player.reset();
		this.pipeTop.reset();
		this.pipeBottom.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();


