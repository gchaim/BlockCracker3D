#pragma strict

final var EPSILON: float = 1; 

var regTexture : Material;
var godModeTexture : Material;

var bonusCounter : int = 0;
var godMode : boolean = false;

private var ray : Ray;
private var hit : RaycastHit;

var mySkin1 : GUISkin; 

var staticVarsScript : static_vars;

var mouseX : float = 0f;
var mouseY : float = 0f;
var mouseDown : boolean = false;

var touchDeltaPosition:Vector2;

var mainCamera : Camera;

var arrow : GameObject;
var ball : GameObject;


function Start () {
	arrow = ball.transform.GetChild(0).gameObject;
	bonusCounter = 0;
	godMode = false;
}

function OnGUI() {

	GUI.skin = mySkin1;
	
	var marginWidth = (Screen.width-Screen.height)/2;
		
	if (GUI.Button(Rect(marginWidth/4,Screen.height/6, marginWidth/2, marginWidth/2),"")){
		if(!staticVarsScript.levelEnded){
			rigidbody.velocity = ball.transform.up*5;
		}
	}
	
}

function Update(){
	
	if(staticVarsScript.levelEnded){
		rigidbody.velocity = Vector3(0,0,0);
	}

	if(staticVarsScript.inputControl.mouseMode){
		MouseUpdate();
	}
	else{
		TouchUpdate();
	}

}

// mouse update
function MouseUpdate () {

	if(!staticVarsScript.cameraMode){
	
		HandleMouseRotation();
	
		mouseX = Input.mousePosition.x;
		mouseY = Input.mousePosition.y;
	
		if(rigidbody.velocity.magnitude < EPSILON){
			arrow.active = true;
		}
		else{
			arrow.active = false;
		}
	}
}

function HandleMouseRotation(){
	var easeFactor = 15f;
	
	if(Input.GetMouseButtonDown(0)){
		mouseDown = true;
	}
	else if(Input.GetMouseButtonUp(0)){
		mouseDown = false;
	}
	
	if(mouseDown){
		if(Input.mousePosition.x != mouseX){
			var ballRotationY = (Input.mousePosition.x - mouseX) * easeFactor * Time.deltaTime;
			transform.Rotate(-mainCamera.transform.up, ballRotationY, Space.World);
		}	
		if(Input.mousePosition.y != mouseY){
			var ballRotationX = (mouseY - Input.mousePosition.y) * easeFactor * Time.deltaTime;
			transform.Rotate(-mainCamera.transform.right, ballRotationX, Space.World);
		}
	}
	
}


// touch update
function TouchUpdate () {

	if(Input.touchCount == 1){ // one finger touch
	
		if(Input.GetTouch(0).phase == TouchPhase.Moved) {
	
			HandleTouchRotation();
		}
	
		if(rigidbody.velocity.magnitude < EPSILON){
			arrow.SetActive(true);
		}
		else{
			arrow.SetActive(false);
		}
		
	}

}

function HandleTouchRotation(){
	var easeFactor = 25f;
	
	var ballRotationY = Input.GetTouch(0).deltaPosition.x * easeFactor * Time.deltaTime;
	transform.Rotate(-mainCamera.transform.up, ballRotationY, Space.World);
			
	var ballRotationX = Input.GetTouch(0).deltaPosition.y * easeFactor * Time.deltaTime;
	transform.Rotate(mainCamera.transform.right, ballRotationX, Space.World);
				
}


function GodMode(){
	bonusCounter++;
	godMode = true;
	ball.gameObject.renderer.material = godModeTexture;
	Invoke("EndGodMode",30);
}

function EndGodMode(){
	bonusCounter--;
	if (bonusCounter==0){
		ball.gameObject.renderer.material = regTexture;
		godMode = false;
	}
}