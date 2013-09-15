#pragma strict

var windowRect : Rect;
var paused : boolean = false;
var pauseSkin : GUISkin; 
var button : GUISkin;
var wall : GameObject;
var sign1 : GameObject;
var sign2 : GameObject;
var tempPlane : GameObject;
var audioClick : AudioClip;
var gameScore : GameScore;


function Start () {
	windowRect = new Rect(Screen.width / 2 - 200 , Screen.height / 2 - 200, 400 , 312);
	
}

function OnGUI(){
	
	GUI.skin = pauseSkin;
	
	var marginWidth = (Screen.width-Screen.height)/2;
	
	if (GUI.Button(Rect(Screen.height+1.25*marginWidth,Screen.height/6, marginWidth/2, marginWidth/2),"")){
		paused=true;
		Time.timeScale = 0;
	}

	if (paused){
		windowRect= GUI.Window(0,windowRect, windowFunc, "");
	}
}


function windowFunc(id : int){

	GUI.skin = button;

	if(GUILayout.Button("Resume", GUILayout.Height(88))){
		Resume();
		AudioSource.PlayClipAtPoint(audioClick, transform.position);
	}
	if(GUILayout.Button("Restart Level",GUILayout.Height(88))){
		gameScore = GameObject.Find("scoreControl").GetComponent("GameScore");
		gameScore.score = 0;
		Resume();
		AudioSource.PlayClipAtPoint(audioClick, transform.position);
		Application.LoadLevel(Application.loadedLevel);
	}
	if(GUILayout.Button("Main Menu",GUILayout.Height(88))){
		Resume();
		AudioSource.PlayClipAtPoint(audioClick, transform.position);
		Application.LoadLevel("MainMenu");
	}
}

function Resume(){

	paused = false;
	Time.timeScale = 1;

}