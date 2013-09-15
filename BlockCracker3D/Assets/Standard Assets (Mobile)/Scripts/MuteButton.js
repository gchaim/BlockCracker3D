#pragma strict

/* behaviour of mute button in the game */

var textures : Texture[];
var skin : GUISkin;
var listener : AudioListener;

function OnGUI(){
	var isMute : int;
	GUI.skin = skin;
	// mute button
	if(GUI.Button(Rect(5,5, 50,50), "")){
		isMute = Mathf.Abs(PlayerPrefs.GetInt("mute")-1);
		PlayerPrefs.SetInt("mute", isMute);
		setTexture(isMute);	
		listener.pause = !listener.pause;
	}
}
// change the texture of the button according to the sound state
function setTexture(isMute : int){
	skin.button.normal.background = textures[isMute];	
	skin.button.hover.background = textures[isMute];
	skin.button.active.background = textures[isMute];
}

function Awake () {
	// remember the user choise from previous games
	listener = GameObject.Find("musicManager").GetComponent("AudioListener");
	setTexture(PlayerPrefs.GetInt("mute"));
}

function Start(){
	DontDestroyOnLoad(this.gameObject);
}