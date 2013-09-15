#pragma strict

/* control the behaviour of bonus bricks - gives the player
 immunity to life reduction */

var audioBonusBrickCollision : AudioClip;
var Explode : Transform;
var ball : Ball;

// collision between block 
function OnCollisionEnter(collision : Collision){

	AudioSource.PlayClipAtPoint(audioBonusBrickCollision, transform.position);
		
	Instantiate(Explode, transform.position, transform.rotation);
	ball.GodMode();
		
	Destroy(this.gameObject);
		
}
