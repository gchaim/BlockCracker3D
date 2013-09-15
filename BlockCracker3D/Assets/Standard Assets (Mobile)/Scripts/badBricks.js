#pragma strict

/* Control the behaviour of "bad" blocks in the game */

var staticVarsScript : static_vars;
var guiWin : GUIText;
var ball : Ball;
var Explode : Transform;
var audioBadBrickCollision : AudioClip;

// collision between ball and bad brick
function OnCollisionEnter(collision : Collision){

		AudioSource.PlayClipAtPoint(audioBadBrickCollision, transform.position);
		
		if (!ball.godMode){
			staticVarsScript.damage();
			
			staticVarsScript.updateScore(-10);
			
			staticVarsScript.reduceLife();
		}
		
		Instantiate(Explode, transform.position, transform.rotation);
		Destroy(this.gameObject);
}

