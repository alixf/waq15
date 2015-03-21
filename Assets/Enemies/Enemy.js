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
var dead = false;
var dieParticles : Transform;
var freeze = false;

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
	
	this.GetComponent.<Rigidbody>().velocity = (alive && !freeze) ? direction.normalized * speed : Vector3.zero;
	
	transform.LookAt(goal.transform.position);
	
	transform.GetChild(0).GetComponent.<Animator>().SetFloat("random", Random.value);
	
	if(!alive && !dead)
	{
		Die();
	}
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
	this.color = color;
	var trueColor : Color;
	switch(color)
	{
	case 1: trueColor = Color.red; break;
	case 2: trueColor = Color.blue; break;
	case 3: trueColor = Color.yellow; break;
	}
	for(var i = 0; i < model.materials.Length; i++)
	{
		model.materials[i].SetColor("MainColor", trueColor);
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
		
		GameObject.Find("enemyHit").GetComponent.<AudioSource>().Play();
	}
	if(collider.CompareTag("Freeze") && collider.transform.parent.GetComponent.<Fairy>().color != color)
		Freeze();
}

function Freeze()
{
	FreezeCoroutine();
}

function FreezeCoroutine()
{
	freeze = true;
	transform.Find("animator").GetComponent.<Animator>().enabled = false;
	yield WaitForSeconds(3.0);
	freeze = false;
	transform.Find("animator").GetComponent.<Animator>().enabled = true;
}

function Die()
{
	GetComponent.<Collider>().enabled = false;
	transform.Find("animator").GetComponent.<Animator>().SetTrigger("Die");
	GameObject.Find("enemyDie").GetComponent.<AudioSource>().Play();
	dead = true;
}

function AfterDie()
{
	Instantiate(dieParticles, transform.position, Quaternion.identity);
}