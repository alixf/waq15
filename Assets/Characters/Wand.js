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
		var cid = GetComponent.<Fairy>().controllerId;
		var color = GetComponent.<Fairy>().color;
		
		var stick2 = new Vector2(Input.GetAxisRaw("P"+cid+" A4"), Input.GetAxisRaw("P"+cid+" A5"));
		if(stick2.magnitude > 0.0)
		{
			clock = 0.0;
			var bullet = Instantiate(bulletPrefab).transform;
			bullet.position = bulletSpawnLocation.position;
			bullet.rotation = bulletPrefab.rotation;
			bullet.GetComponent.<Bullet>().SetColor(color);
			bullet.GetComponent.<Rigidbody>().velocity = transform.forward.normalized * speed;
			bullet.name = "bullet";
			GameObject.Find("wandSound").GetComponent.<AudioSource>().Play();
		}
	}
}