#pragma strict

var listener : AudioListener;

function Start(){
	if (PlayerPrefs.GetInt("mute")==1){
		listener.pause = true;
	}
	Invoke("helper", 5);
}

function helper(){
	Application.LoadLevel("MainMenu");
}

function Awake() {
    DontDestroyOnLoad(this.gameObject);
}