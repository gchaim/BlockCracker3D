#pragma strict

/* for debugging we wanted to control the game also with mouse */

var mouseMode : boolean = false;

function Awake() {
    DontDestroyOnLoad(this.gameObject);
}