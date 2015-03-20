#pragma strict

var bulletPrefab : Transform;
private var clock = 0.0;
public var speed = 0.0;
var bulletSpawnLocation : Transform;

function Start()
{
}

function Update()
{
	clock += Time.deltaTime;
	if(clock > 0.25)
	{
		if(Input.GetAxis("Fire") < -0.5)
		{
			clock = 0.0;
			var spawn = Instantiate(bulletPrefab).transform;
			spawn.position = bulletSpawnLocation.position;
			spawn.GetComponent.<Rigidbody>().velocity = transform.forward.normalized * speed;
			spawn.name = "bullet";
		}
	}
}