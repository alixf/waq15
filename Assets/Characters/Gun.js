#pragma strict

var bulletPrefab : Transform;
private var clock = 0.0;
public var speed = 0.0;
var bulletSpawnLocation : Transform;
public var controllerId = 0;

function Start()
{
}

function Update()
{
	clock += Time.deltaTime;
	if(clock > 0.25)
	{
		var stick2 = new Vector2(Input.GetAxis("P"+controllerId+" A4"), Input.GetAxis("P"+controllerId+" A5"));
		if(stick2.magnitude > 0.0)
		{
			clock = 0.0;
			var spawn = Instantiate(bulletPrefab).transform;
			spawn.position = bulletSpawnLocation.position;
			spawn.rotation = Quaternion.Euler(40.2,15.8,11.4);
			spawn.GetComponent.<Bullet>().color = controllerId + 1;
			spawn.GetComponent.<Bullet>().SetColor();
			spawn.GetComponent.<Rigidbody>().velocity = transform.forward.normalized * speed;
			spawn.name = "bullet";
			GameObject.Find("wandSound").GetComponent.<AudioSource>().Play();
		}
	}
}