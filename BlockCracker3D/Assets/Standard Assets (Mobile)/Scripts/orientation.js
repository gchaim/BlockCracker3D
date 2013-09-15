#pragma strict
 
/* makes sure the game will be played in landscape orientation */

function Start () {
	Screen.orientation = ScreenOrientation.Landscape;
}
function Awake() {
    DontDestroyOnLoad(this.gameObject);
}
