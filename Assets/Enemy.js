#pragma strict

var goal : Transform;
var speed : float;
private var hitClock = 0.0;
var hitDuration	 = 0.0;
var goalOffset = new Vector3(0.0, 0.0, 0.0);
var health = 0;
var ui : Transform;

function Start()
{
	goalOffset.x = Random.value * 0.25;
	goalOffset.z = Random.value * 0.25;
	
	var healthGauge = Instantiate(ui);
	healthGauge.GetComponent.<UIFollow>().target = transform;
	healthGauge.GetComponent.<HealthGaugeEnemy>().target = GetComponent.<Health>();
	healthGauge.transform.SetParent(gameObject.Find("Canvas").transform);
}

function Update()
{
	hitClock += Time.deltaTime;
	var direction = (goal.position+goalOffset - transform.position);
	direction.y = 0;
	
	this.GetComponent.<Rigidbody>().velocity = direction.normalized * speed;
	
	if(GetComponent.<Health>().health <= 0)
	{
		Destroy(gameObject);
	}
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

function OnTriggerEnter(collider : Collider)
{
	if(collider.CompareTag("Bullet"))
	{
		GetComponent.<Health>().health--;
		collider.GetComponent.<Bullet>().Die();
	}
}