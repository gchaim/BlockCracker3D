#pragma strict

var staticVarsScript : static_vars;

var guiWin : GUIText;

var Explode : Transform;

var audioGoodBrickCollision : AudioClip;

function Start () {
	guiWin.text = "";
}

function OnCollisionEnter(collision : Collision){

	AudioSource.PlayClipAtPoint(audioGoodBrickCollision, transform.position);

	Instantiate(Explode, transform.position, transform.rotation);
	Destroy(this.gameObject);
	
	staticVarsScript.updateScore(10);
		
	staticVarsScript.numOfGoodBricks-=1;
	if(staticVarsScript.numOfGoodBricks==0){
		staticVarsScript.Win();
	}
}

function helper(){
	print("YOU WIN");
	staticVarsScript.GameOver();
}
