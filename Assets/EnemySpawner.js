#pragma strict

var spawnRate : float;
var enemyPrefab : Transform;
var spawnLocations : Transform[];
var goal : Transform;
var enemyMaxCount : int;

private var clock : float;

function Start ()
{
}

function Update ()
{
	clock += Time.deltaTime;
	if(spawnRate > 0 && clock > (1.0/spawnRate) && transform.childCount < enemyMaxCount)
	{
		clock = 0.0;
		var spawn = Instantiate(enemyPrefab).transform;
		spawn.position = spawnLocations[Mathf.Floor(Random.value * spawnLocations.length)].position;
		spawn.GetComponent.<Enemy>().goal = goal;
		spawn.parent = transform;
		spawn.name = "enemy";
	}
}