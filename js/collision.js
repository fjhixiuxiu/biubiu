/**
 * Class for collisions.
 */

function Collision() {

	//check out the collision between two objects.
	this.encounter = function(a, b) {
		if ((a.posx() + a.width) < b.posx()) {
			return false;
		} else if (a.posx() > (b.posx() + b.width)){
			return false;
		} else if ((a.posy() + a.height) < b.posy) {
			return false;
		} else if (a.posy() > (b.posy() + b.height)) {
			return false;
		}
		return true;
	}
}
