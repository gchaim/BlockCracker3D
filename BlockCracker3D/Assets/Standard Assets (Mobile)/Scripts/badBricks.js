#pragma strict

var staticVarsScript : static_vars;
var guiWin : GUIText;
var ball : Ball;
var Explode : Transform;

var audioBadBrickCollision : AudioClip;


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

