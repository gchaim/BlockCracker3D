#pragma strict

var cameraController : GameObject;
var mainCamera : GameObject;

var walls : GameObject[];

private var startTouch : Vector2;
private var endTouch : Vector2;

var minSwipe : float = 10;

private var ray : Ray;
private var hit : RaycastHit;

var staticVarsScript : static_vars;

var mouseX : float = 0f;
var mouseY : float = 0f;
var mouseDown : boolean = false;

var verticalRotationMin : float = 0f;
var verticalRotationMax : float = 65f;

var easeFactor = 10f;

var arrow : GameObject;


function Update(){
	if(staticVarsScript.inputControl.mouseMode){
		MouseUpdate();
	}
	else{
		TouchUpdate();
	}
}


// mouse update
function MouseUpdate () {
	if(staticVarsScript.cameraMode){
	
		for (var wall : GameObject in walls){
			wall.renderer.enabled = true;
		}
	
		HandleMouseRotation();
	
		mouseX = Input.mousePosition.x;
		mouseY = Input.mousePosition.y;
	
		ray = new Ray (mainCamera.transform.position,mainCamera.transform.forward);  
     	if (Physics.Raycast (ray, hit, 100)) { 
     		hit.transform.renderer.enabled = false;
     	}
	}
}


function HandleMouseRotation(){
	var easeFactor = 10f;

	if(Input.GetMouseButtonDown(0)){
		mouseDown = true;
	}
	else if(Input.GetMouseButtonUp(0)){
		mouseDown = false;
	}
	
	if(mouseDown){
		if(Input.mousePosition.x != mouseX){
			var cameraRotationY = (Input.mousePosition.x - mouseX) * easeFactor * Time.deltaTime;
			cameraController.transform.Rotate(0, cameraRotationY, 0, Space.World); 
		}	
	}
}

// touch update
function TouchUpdate () {
	
	if (Input.touchCount == 2) { // 2 fingers touch
	
		if(Input.GetTouch(0).phase == TouchPhase.Moved) {
		
			// display all walls
			for (var wall : GameObject in walls){
				wall.renderer.enabled = true;
			}
		
			// rotate camera according to fingers movement
  			var cameraRotationY = Input.GetTouch(0).deltaPosition.x * easeFactor * Time.deltaTime;
			cameraController.transform.Rotate(0, cameraRotationY, 0, Space.World);
			
			// make front wall invisible
			ray = new Ray (mainCamera.transform.position,mainCamera.transform.forward);  
     		if (Physics.Raycast (ray, hit, 100)) { 
     		hit.transform.renderer.enabled = false;
     		}
		}
	}		
}
