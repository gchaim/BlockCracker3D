#pragma strict

/* manage the scene of choosing the level to play */

private var ray : Ray;
private var hit : RaycastHit;

var mainCamera : Camera;
var audioClick : AudioClip;
var x : GameObject[];
var maxLevelReached : int;

function Awake(){
	// remembers the highest level reached by the player in order to
	// let the player choose only the levels he opened
	maxLevelReached = PlayerPrefs.GetInt("maxLevelReached");
	
	if(maxLevelReached == 0){
	
		maxLevelReached = 1;
		PlayerPrefs.SetInt("maxLevelReached",1);
	}
}

function Update(){

	openUnlockedLevels();
	
	// captures the player choise 
	if(Input.GetMouseButtonUp(0)){
		ray = mainCamera.ScreenPointToRay(Input.mousePosition);
		if(Physics.Raycast(ray, hit)){
			
			AudioSource.PlayClipAtPoint(audioClick, transform.position);
			
			if(hit.transform.name == "level1"){
				Application.LoadLevel("Level1");
			}
			if((hit.transform.name == "level2") && maxLevelReached>=2 ){
				Application.LoadLevel("Level2");
			}
			if(hit.transform.name == "Cube"){
				Application.LoadLevel("MainMenu");
			}
		}
	}
}

// check if new levels need to be opened
function openUnlockedLevels(){

	for (var i:int=0 ; i<maxLevelReached-1 && i<x.length; i++){
		x[i].gameObject.active = false;
		x[i].transform.GetChild(0).gameObject.active = false;
	}
}