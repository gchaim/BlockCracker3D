﻿#pragma strict

function Update () {

	transform.Rotate(0,Time.deltaTime*15,0,Space.World);
}