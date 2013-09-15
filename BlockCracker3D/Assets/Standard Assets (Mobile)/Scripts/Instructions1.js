#pragma strict

var skin : GUISkin;
var audioClick : AudioClip;

function OnGUI() {

		var buttonWidth = Screen.width/5;
		var buttonHeight = Screen.height/10;

		var rightButtonCornerX = Screen.width/2-1.5*buttonWidth;
		var leftButtonCornerX = Screen.width/2;
		var buttonsCornerY = Screen.height-buttonHeight-Screen.height/20;
		
		skin.button.fontSize = buttonWidth/6;
		GUI.skin = skin;

		if (GUI.Button(Rect(rightButtonCornerX , buttonsCornerY, buttonWidth, buttonHeight),"Back")){
			AudioSource.PlayClipAtPoint(audioClick, transform.position);
			Application.LoadLevel("MainMenu");
		}
		
		if (GUI.Button(Rect(leftButtonCornerX , buttonsCornerY, buttonWidth*1.6, buttonHeight),"Detailed  Instructions")){	
			AudioSource.PlayClipAtPoint(audioClick, transform.position);
			Application.LoadLevel("Instructions2");
		}
}