#pragma strict

private var startTime : float;
var textTime : String;
private var restSeconds : int;
var timerSkin : GUISkin ; 
var countDownSeconds : int = 240;

var timeOut : boolean = false; 

var staticVarsScript : static_vars;

function Awake() {
 
   startTime = Time.time;
 
}
 
function OnGUI () {
 
	//makes sure that the time is based on when this script was first called
   //instead of when the game started
   var guiTime = Time.time - startTime;
   GUI.skin = timerSkin;
  
   if(!timeOut && !staticVarsScript.levelEnded){
   		 restSeconds = countDownSeconds - (guiTime);
    }
   
   if (restSeconds == 0) {
   		staticVarsScript.loose("TIME'S UP");
   		timeOut = true;
    }
 
   var minutes : int = restSeconds / 60;
   var seconds : int = restSeconds % 60;
 
   textTime = String.Format ("{0:00}:{1:00}", minutes, seconds);
   
   var marginWidth = (Screen.width-Screen.height)/2;
   var labelX = Screen.height+1.12*marginWidth;
   var labelY = 5/6.0*Screen.height;
   
   GUI.Label (Rect (labelX, labelY, (2/3.0)*marginWidth, (2/3.0)*marginWidth), textTime); 
 
}