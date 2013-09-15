#pragma strict

private var ray : Ray;
private var hit : RaycastHit;
var highScore : TextMesh;
var mainCamera : Camera;
var audioClick : AudioClip;
var gameScore : GameScore;	
//var inputControl : InputControl;

function Awake(){
	highScore.text = ""+PlayerPrefs.GetInt("highScore");
	gameScore = GameObject.Find("scoreControl").GetComponent("GameScore");
	gameScore.score = 0;
	
	//inputControl = GameObject.Find("InputController").GetComponent("InputControl");
}

/*function Update(){
	if(inputControl.mouseMode){
		MouseUpdate();
	}
	else{
		TouchUpdate();
	}
}*/

function Update () {
	
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

/*
//touch screen update
function TouchUpdate () {

	for (var i = 0; i < Input.touchCount; ++i) {
		if (Input.GetTouch(i).phase == TouchPhase.Began) {
			
			// Construct a ray from the current touch coordinates
			ray = mainCamera.ScreenPointToRay (Input.GetTouch(i).position);
			
			if (Physics.Raycast (ray, hit)) {
			
				AudioSource.PlayClipAtPoint(audioClick, transform.position);
				
				if(hit.transform.name == "PlayGameOption"){
					Application.LoadLevel("BrickCracker");
				}
				if(hit.transform.name == "InstructionsOption"){
				
				}
				if(hit.transform.name == "QuitOption"){
					Application.Quit();
				}
			}
		}
	}
}*/