#pragma strict

private var ray : Ray;
private var hit : RaycastHit;

var mainCamera : Camera;
var audioClick : AudioClip;
var x : GameObject[];
var maxLevelReached : int;

function Awake(){
	maxLevelReached = PlayerPrefs.GetInt("maxLevelReached");
	
	if(maxLevelReached == 0){
	
		maxLevelReached = 1;
		PlayerPrefs.SetInt("maxLevelReached",1);
	}
}

function Update(){

	openUnlockedLevels();
	
	if(Input.GetMouseButtonUp(0)){
		ray = mainCamera.ScreenPointToRay(Input.mousePosition);
		if(Physics.Raycast(ray, hit)){
			
			AudioSource.PlayClipAtPoint(audioClick, transform.position);
			
			if(hit.transform.name == "level1"){
				Application.LoadLevel("Level1");
			}
			if((hit.transform.name == "level2") && maxLevelReached>=2 ){
				print("Amit Rephael");
				Application.LoadLevel("Level2");
			}
			if(hit.transform.name == "Cube"){
				Application.LoadLevel("MainMenu");
			}
		}
	}
}

function openUnlockedLevels(){

	for (var i:int=0 ; i<maxLevelReached-1 && i<x.length; i++){
		x[i].gameObject.active = false;
		x[i].transform.GetChild(0).gameObject.active = false;
	}
}