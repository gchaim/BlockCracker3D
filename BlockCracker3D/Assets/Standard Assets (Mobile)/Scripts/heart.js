#pragma strict

/* rotates the hearts that represents the lives */

function Update () {

	transform.Rotate(0,Time.deltaTime*20,0,Space.World);
}
