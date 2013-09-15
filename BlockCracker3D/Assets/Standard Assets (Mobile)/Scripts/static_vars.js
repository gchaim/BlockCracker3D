#pragma strict

/* handles all static data and functions of the game */

var guiScore : GUIText;
var cameraMode : boolean = false;
var numOfLives : int = 3;
var lives : GameObject[];
var audioClick : AudioClip;
var numOfGoodBricks : int;
var lastLevel : boolean;
var pointLight : Light;
var guiWin : GUIText;

var inputControl : InputControl;

var buttonSkin : GUISkin;

var endLevelMenuWindow : Rect;

var levelEnded : boolean = false;
var displayEndLevelMenu : boolean = false;

var currentLevel : int;

var gameScore : GameScore;

var sign1 : GameObject;
var sign2 : GameObject;
var tempPlane : GameObject;

var gameWon : boolean = false;


function Awake () {
	
	endLevelMenuWindow = new Rect(Screen.width / 2 - 200 , Screen.height / 2 - 200, 400 , 312);

	gameScore = GameObject.Find("scoreControl").GetComponent("GameScore");
	guiScore.text = "Score: " + gameScore.score;
	
	inputControl = GameObject.Find("InputController").GetComponent("InputControl");

}

function Start(){
	Invoke("destroyHelpSigns",10);
}

// removes the helper messages that appear in the beggining of each level
function destroyHelpSigns(){
	Destroy(sign1);
	Destroy(sign2);
	Destroy(tempPlane);
}

function OnGUI() {
	// switch button for debbuging
	if(inputControl.mouseMode){
		if (GUI.Button(Rect(160,10,170,80),"switch")){	
			cameraMode = !cameraMode;
		}
	}
	
	if(displayEndLevelMenu){
		endLevelMenuWindow = GUI.Window(0, endLevelMenuWindow, endLevelMenuFunc, "");
	}
}

// end level menu options
function endLevelMenuFunc(id : int){

	var buttonHeight = 88;
	
	GUI.skin = buttonSkin;
		
	if (!lastLevel && gameWon){
		if(GUILayout.Button("Next Level", GUILayout.Height(buttonHeight))){
			AudioSource.PlayClipAtPoint(audioClick, transform.position);
			gameWon = false;
			Application.LoadLevel("Level2");
		}
	}
	
	if(GUILayout.Button("Restart Level",GUILayout.Height(buttonHeight))){
		
		AudioSource.PlayClipAtPoint(audioClick, transform.position);
		
		gameScore = GameObject.Find("scoreControl").GetComponent("GameScore");
		gameScore.score = 0;
		
		gameWon = false;
		
		Application.LoadLevel(Application.loadedLevel);
	}
	
	if(GUILayout.Button("Main Menu",GUILayout.Height(buttonHeight))){
		AudioSource.PlayClipAtPoint(audioClick, transform.position);
		
		gameWon = false;
		
		Application.LoadLevel("MainMenu");
	}
}

// check if highscore should be updated
function saveHighScore(){

	if(gameScore.score > PlayerPrefs.GetInt("highScore")){
		PlayerPrefs.SetInt("highScore", gameScore.score);
	}
}

// updates the variable which saves the highest
// level reached by the user, if needed
function UpdateMaxLevelReached(){
	
	var oldMaxLevelReached = PlayerPrefs.GetInt("maxLevelReached");

	if(oldMaxLevelReached == currentLevel){
		
		PlayerPrefs.SetInt("maxLevelReached", oldMaxLevelReached + 1);
	}
}

// handles winning the game
function Win(){

	UpdateMaxLevelReached();
	
	saveHighScore();
	
	guiWin.text = "YOU WIN";
	guiWin.fontSize = Screen.width/6;
	
	levelEnded = true;
	gameWon = true;
	
	Invoke("EndLevel", 3);
}

// ends the level
function EndLevel(){
	displayEndLevelMenu = true;
}

// handles game lose
function loose(looseMessage : String){

	saveHighScore();
	
	guiWin.text = looseMessage;
	guiWin.fontSize = Screen.width/7;
	
	guiWin.color = Color.red;
	
	levelEnded = true;
	
	Invoke("EndLevel", 3);

}

// sets the light back to its normal state
function backToNormalLight(){
	
	pointLight.color = Color.white;
	pointLight.intensity = pointLight.intensity/2;

}

// displays red light to indicate ball hit a "bad brick"
function damage(){
	
	pointLight.intensity = pointLight.intensity*2;
	pointLight.color = Color.red;

	Invoke("backToNormalLight", 0.3f);
}

// updates the game score
function updateScore(diff : int){

	gameScore.score +=diff;
	guiScore.text = "Score: " + gameScore.score;
}

// reduces a life and checks if the player is dead
function reduceLife(){
	
	numOfLives-=1;
		
	Destroy(lives[numOfLives]);
	
	if(numOfLives==0){
		loose("YOU LOOSE");
	}
}

