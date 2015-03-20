#pragma strict

var goal : Transform;
var speed : float;

function Start()
{
}

function Update()
{
	var direction = (goal.position - transform.position);
	direction.y = 0;
	
	this.GetComponent.<Rigidbody>().velocity = direction.normalized * speed;	
	print(GetComponent.<Rigidbody>().velocity);
}