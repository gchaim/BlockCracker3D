#pragma strict

/* manages the second instruction scene */

var previousLevel : String = "Instructions1";
var nextLevel : String = "Instructions3";
var skin : GUISkin;
var audioClick : AudioClip;

function OnGUI() {
		
		var buttonWidth = Screen.width/5;
		var buttonHeight = Screen.height/6;

		var rightButtonCornerX = Screen.width/2-1.25*buttonWidth;
		var leftButtonCornerX = Screen.width/2+0.25*buttonWidth;
		var buttonsCornerY = Screen.height-buttonHeight-Screen.height/10;
		
		skin.button.fontSize = buttonWidth/4;
		GUI.skin = skin;

		// back button
		if (GUI.Button(Rect(rightButtonCornerX , buttonsCornerY, buttonWidth, buttonHeight),"Back")){
			AudioSource.PlayClipAtPoint(audioClick, transform.position);
			Application.LoadLevel(previousLevel);
		}
		// next button
		if (GUI.Button(Rect(leftButtonCornerX , buttonsCornerY, buttonWidth, buttonHeight),"Next")){
			AudioSource.PlayClipAtPoint(audioClick, transform.position);
			Application.LoadLevel(nextLevel);
		}
}