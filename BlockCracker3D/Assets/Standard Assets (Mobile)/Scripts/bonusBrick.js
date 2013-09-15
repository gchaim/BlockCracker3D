#pragma strict

var audioBonusBrickCollision : AudioClip;
var Explode : Transform;
var ball : Ball;

function OnCollisionEnter(collision : Collision){

	AudioSource.PlayClipAtPoint(audioBonusBrickCollision, transform.position);
		
	Instantiate(Explode, transform.position, transform.rotation);
	print(collision.collider.name);
	ball.GodMode();
		
	Destroy(this.gameObject);
		
}
