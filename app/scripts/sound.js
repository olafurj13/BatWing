'use strict';

var muted = true;

function mute() {
	var backgroundMusic = document.getElementById('backgroundMusic');
	var muter = document.getElementById('muter');
	if (muted == true){
		backgroundMusic.muted = false;
		muter.src = 'images/unmute.png';
		muted = false;
	}
	else {
	    backgroundMusic.muted = true;
	    muter.src = 'images/mute2.png';
	    muted = true;
	}
}
mute();