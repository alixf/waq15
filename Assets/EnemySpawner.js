#pragma strict

var spawnRate : float;
var enemyPrefab : Transform;
var particlesSpawn : ParticleSystem;
var spawnLocations : Transform[];
var goal : Transform;
var enemyMaxCount : int;
private var offset = new Vector3(0.1, 0.0, 0.0);

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
		spawn.position = spawnLocations[Mathf.Floor(Random.value * spawnLocations.length)].position + offset;
		offset = -offset;
		Instantiate(particlesSpawn,spawn.position,Quaternion.Euler(-90,0,0));
		spawn.GetComponent.<Enemy>().goal = goal;
		spawn.parent = transform;
		spawn.name = "enemy";
	}
}