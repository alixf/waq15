#pragma strict

public var enemies : Transform;
var clock = 50000.0;
var freezeCooldown = 0.0;
var particles : Transform;
var range = 500;
var used = true;

function Start()
{
	enemies = GameObject.Find("EnemySpawner").transform;
}

function Update()
{
	clock += Time.deltaTime;

	var cid = GetComponent.<Fairy>().controllerId;
	var trigger = Input.GetAxisRaw("P"+cid+" A3");
	if(Mathf.Abs(trigger) > 0.5 && clock > freezeCooldown)
	{
		clock = 0.0;
		Instantiate(particles, transform.position, transform.rotation);
		transform.Find("freeze").gameObject.SetActive(true);
	}
	else
	{
		transform.Find("freeze").gameObject.SetActive(false);
	}
}