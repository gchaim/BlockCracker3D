#pragma strict

function Start () {
	Screen.orientation = ScreenOrientation.Landscape;
}
function Awake() {
    DontDestroyOnLoad(this.gameObject);
}
