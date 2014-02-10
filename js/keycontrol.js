/**
 * Class for key controls.
 */

function Keycontrol() {
	this.LEFT = 37;
	this.RIGHT = 39;
	this.SPACE = 32;

	//function when key is down
	this.keydown = function(e) {
		e = e || window.event;
		
		if (e.keyCode == this.LEFT) {
			shipLeft = true;
		} else if (e.keyCode == this.RIGHT) {
			shipRight = true;
		}
		else if (e.keyCode == this.SPACE) {
			shipFire = true;
		}
	}

	//function when key is up
	this.keyup = function(e) {
		e = e || window.event;

		if (e.keyCode == this.LEFT) {
			shipLeft = false;
		} else if (e.keyCode == this.RIGHT) {
			shipRight = false;
		}
		else if (e.keyCode == this.SPACE) {
			shipFire = false;
		}
	}

	//function when ENTER is pressed
	this.enter = function(e) {
		e = e || window.event;
		if (e.keyCode == 13) {
			return true;
		}
	}
}
