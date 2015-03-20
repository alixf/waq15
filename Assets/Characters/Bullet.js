#pragma strict

var distanceSpan = 1.0;
var particlesDie : ParticleSystem;
private var distance = 0.0;

function Start ()
{
}

function Update ()
{
	distance += GetComponent.<Rigidbody>().velocity.magnitude * Time.deltaTime;
	if(distance > distanceSpan)
		Die();
}

function OnTriggerEnter(c : Collider)
{
	Die();
}

function Die()
{
	Instantiate(particlesDie,transform.position,Quaternion.Euler(-90,0,0));
	Destroy(this.gameObject);
}