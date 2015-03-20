#pragma strict

var goal : Transform;
var speed : float;
private var hitClock = 0.0;
var hitDuration	 = 0.0;

function Start()
{
}

function Update()
{
	hitClock += Time.deltaTime;
	var direction = (goal.position - transform.position);
	direction.y = 0;
	
	this.GetComponent.<Rigidbody>().velocity = direction.normalized * speed;
}

function OnTriggerStay(collider : Collider)
{
	if(collider.CompareTag("hitZone"))
	{
		if(hitClock > hitDuration)
		{
			hitClock = 0.0;
			collider.transform.parent.GetComponent.<Health>().health--;
			print("ok");
		}
	}
}