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
		var cid = GetComponent.<FairyController>().controllerId;
		var color = GetComponent.<FairyController>().color;
		var stick2 = new Vector2(Input.GetAxisRaw("P"+cid+" A4"), Input.GetAxisRaw("P"+cid+" A5"));
		if(stick2.magnitude > 0.0)
		{
			clock = 0.0;
			var spawn = Instantiate(bulletPrefab).transform;
			spawn.position = bulletSpawnLocation.position;
			spawn.rotation = bulletPrefab.rotation;
			spawn.GetComponent.<Bullet>().SetColor(color);
			spawn.GetComponent.<Rigidbody>().velocity = transform.forward.normalized * speed;
			spawn.name = "bullet";
			GameObject.Find("wandSound").GetComponent.<AudioSource>().Play();
		}
	}
}