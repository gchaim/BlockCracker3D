#pragma strict

/* makes sure that the score will stay through all scenes */

var score : int = 0;

function Awake(){
	DontDestroyOnLoad(this.gameObject);
}