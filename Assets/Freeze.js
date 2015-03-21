#pragma strict

public var enemies : Transform;
var clock = 0.0;
var freezeCooldown = 5.0;
var particles : Transform;

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
		print("FREEZE");
		for(enemy in enemies)
		{
			var enemyT : Transform = enemy;
			enemyT.GetComponent.<Enemy>().Freeze();
		}
	}
}