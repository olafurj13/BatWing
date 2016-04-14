window.Pipe = (function() {
	'use strict';
	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 20; // * 10 pixels per second
	var count = 0;
	var tempY = 0;
	var counter = 0;
	var WIDTH = 16;
	var counter2 = 0;
	var Pipe = function(el, game, number) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.number = number;
		this.player = game.player;
		this.points = 0;
		this.PlayerPassedPipe = false;
	};

	Pipe.prototype.reset = function(){
		this.pos.x = this.game.WORLD_WIDTH;
		this.pos.y = 0;
		this.points = 0;
		counter2 = 0;
	};

	Pipe.prototype.checkCollision = function(pos){
		//console.log('Player pos y: ', this.player.pos.y);
		//console.log('Pipe   pos y: ', pos.y);
		if(this.player.pos.x+12 > pos.x && pos.x > 25){
			//	console.log('game over');
			counter2 = 0;
			
			//Sér um hvort það sé collision við efri pípu
			if(this.player.pos.y - 23 > pos.y - 5.5){
				//Sér um hvort það sé collision við neðri pípu	
				if(this.player.pos.y < pos.y + 32){

				} else {
					// console.log('this.player.y: ', this.player.pos.y);
					// console.log('this.pos.y   : ', pos.y + 32);
					// console.log('dey i seinni');
					this.game.gameover();
					console.log('Points 1: ', this.points-1);
				}
			} else {
				// console.log('this.player.y: ', this.player.pos.y - 23);
				// console.log('this.pos.y   : ', pos.y - 5.5);
				// console.log('dey i fyrstu');
				this.game.gameover();
				console.log('Points 2: ', this.points-1);
			}
			//this.game.gameover();
		} else {
			counter2++;
			if(counter2 === 1){
				this.points++;
			}
		}
	}

	Pipe.prototype.score = function(delta) {
		this.points++;
	}

	Pipe.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;
		//console.log(this.pos.x);
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
		this.checkCollision(this.pos);
		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};
	return Pipe;
})();	