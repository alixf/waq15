#pragma strict

var distanceSpan = 1.0;
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

function Die()
{
	GetComponent.<Collider>().enabled = false;
	GetComponent.<MeshRenderer>().enabled = false;
	//GetComponent.<Rigidbody>().enabled = false;
}