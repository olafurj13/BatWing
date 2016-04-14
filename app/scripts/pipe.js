window.Pipe = (function() {
	'use strict';
	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 20; // * 10 pixels per second
	var count = 0;
	var tempY = 0;
	var counter = 0;
	var WIDTH = 16;
	var Pipe = function(el, game, number) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.number = number;
	};

	Pipe.prototype.reset = function(){
		this.pos.x = this.game.WORLD_WIDTH;
		this.pos.y = 0;
	};


	Pipe.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;
		if(this.pos.x < -3.5){
			counter++;
			//console.log('TempY: ', tempY);
			if(counter % 2 !== 0){
				//console.log('fer inní if');
				this.pos.x = this.game.WORLD_WIDTH;
				this.pos.y = Math.floor(Math.random() * 25) - 10;
				tempY = this.pos.y;
			} else {
				//console.log('fer inní else');
				this.pos.x = this.game.WORLD_WIDTH;
				this.pos.y = tempY;
			}
			//console.log('counter: ', counter);
			//console.log('this.pos.x: ', this.pos.x, ' this.pos.y: ', this.pos.y);
			//console.log('this.pos.y: ',this.pos.y);
		}
		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};
	return Pipe;
})();