#pragma strict

var goal : Transform;
var speed : float;
private var hitClock = 0.0;
var hitDuration	 = 0.0;
var goalOffset = new Vector3(0.0, 0.0, 0.0);
var health = 0;
var ui : Transform;
var color : int;
var model : SkinnedMeshRenderer;
var alive = true;
var dead = 0.0;

function Start()
{
	goalOffset.x = Random.value * 0.25;
	goalOffset.z = Random.value * 0.25;
	
	var healthGauge = Instantiate(ui);
	healthGauge.GetComponent.<UIFollow>().target = transform;
	healthGauge.GetComponent.<HealthGaugeEnemy>().target = GetComponent.<SegmentedHealth>();
	healthGauge.transform.SetParent(gameObject.Find("Canvas").transform);
	
	GameObject.Find("enemyWalk").GetComponent.<AudioSource>().Play();
}

function Update()
{
	if(alive && GetComponent.<SegmentedHealth>().remainingHealth <= 0)
	{
		alive = false;
		Die();
	}
		
	hitClock += Time.deltaTime;
	var direction = (goal.position+goalOffset - transform.position);
	direction.y = 0;
	
	this.GetComponent.<Rigidbody>().velocity = direction.normalized * speed;
	
	transform.LookAt(goal.transform.position);
	
	transform.GetChild(0).GetComponent.<Animator>().SetFloat("random", Random.value);
}

function OnTriggerStay(collider : Collider)
{
	if(collider.CompareTag("hitZone"))
	{
		transform.GetChild(0).GetComponent.<Animator>().SetBool("shooting", true);
		if(hitClock > hitDuration)
		{
			hitClock = 0.0;
			collider.transform.parent.GetComponent.<Health>().health--;
		}
	}
}

function SetColor(color : int)
{
Debug.Log(color);
	this.color = color;
	switch(color)
	{
	case 1: model.material.color = Color.red; break;
	case 2: model.material.color = Color.blue; break;
	case 3: model.material.color = Color.yellow; break;
	}
}

function OnTriggerExit(collider : Collider)
{
	if(collider.CompareTag("hitZone"))
	{
		transform.GetChild(0).GetComponent.<Animator>().SetBool("shooting", false);
	}
}

function OnTriggerEnter(collider : Collider)
{
	if(collider.CompareTag("Bullet") && collider.GetComponent.<Bullet>().color == GetComponent.<SegmentedHealth>().GetCurrentColor())
	{
		GetComponent.<SegmentedHealth>().doDamage(1.0);
		collider.GetComponent.<Bullet>().Die();
		var dead = true;
		
		GameObject.Find("enemyHit").GetComponent.<AudioSource>().Play();
	}
}

function Die()
{
	GetComponent.<Collider>().enabled = false;
	transform.GetChild(0).GetComponent.<Animator>().SetTrigger("Die");
		GameObject.Find("enemyDie").GetComponent.<AudioSource>().Play();
}