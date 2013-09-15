#pragma strict

/* control the behaviour of "good" bricks in the game */

var staticVarsScript : static_vars;

var guiWin : GUIText;

var Explode : Transform;

var audioGoodBrickCollision : AudioClip;

function Start () {
	guiWin.text = "";
}

// collision between the ball and a good brick
function OnCollisionEnter(collision : Collision){

	AudioSource.PlayClipAtPoint(audioGoodBrickCollision, transform.position);

	Instantiate(Explode, transform.position, transform.rotation);
	Destroy(this.gameObject);
	
	staticVarsScript.updateScore(10);
	
	// check if it's the last one and the player wins
	staticVarsScript.numOfGoodBricks-=1;
	if(staticVarsScript.numOfGoodBricks==0){
		staticVarsScript.Win();
	}
}
