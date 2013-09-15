#pragma strict

/* manages the main menu */

private var ray : Ray;
private var hit : RaycastHit;
var highScore : TextMesh;
var mainCamera : Camera;
var audioClick : AudioClip;
var gameScore : GameScore;	

function Awake(){
	// keeps the highscore result between games
	highScore.text = ""+PlayerPrefs.GetInt("highScore");
	gameScore = GameObject.Find("scoreControl").GetComponent("GameScore");
	gameScore.score = 0;
}

function Update () {
	// captures the player choise
	if(Input.GetMouseButtonUp(0)){
		ray = mainCamera.ScreenPointToRay(Input.mousePosition);
		if(Physics.Raycast(ray, hit)){
			
			AudioSource.PlayClipAtPoint(audioClick, transform.position);
			
			if(hit.transform.name == "PlayGameOption"){
				Application.LoadLevel("ChooseLevel");
			}
			if(hit.transform.name == "InstructionsOption"){
				Application.LoadLevel("Instructions1");
			}
			if(hit.transform.name == "QuitOption"){
				Application.Quit();
			}
		}
	}
}
