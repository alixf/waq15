#pragma strict

var goal : Transform;
var speed : float;
private var hitClock = 0.0;
var hitDuration	 = 0.0;
var goalOffset = new Vector3(0.0, 0.0, 0.0);

function Start()
{
	goalOffset.x = Random.value * 0.25;
	goalOffset.z = Random.value * 0.25;
}

function Update()
{
	hitClock += Time.deltaTime;
	var direction = (goal.position+goalOffset - transform.position);
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
		}
	}
}