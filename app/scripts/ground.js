window.Ground = (function() {
	'use strict';
	console.log("GROUND");

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 10; // * 10 pixels per second

	var Ground = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		console.log("GROUND2");
	};

	Ground.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;
		console.log("GROUND3");
		if(this.pos.x <= -10){
			this.pos.x = 0;
			console.log("GROUND4");
		}
		

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};


	return Ground;

})();