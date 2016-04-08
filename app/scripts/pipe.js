window.Pipe = (function() {
	'use strict';
	console.log("PIIIIIIIIIIIIIIIIIIIIIIIIIIIIIPEEEEEEEEEEEEEEEEEEE");

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 2; // * 10 pixels per second


	var Pipe = function(el, game, number) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.number = number;

	};

	Pipe.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;
		if(this.pos.x <= -130){
			this.pos.x = 0;

		}
		

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};


	return Pipe;
})();