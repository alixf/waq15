#pragma strict

class Wave extends System.Object
{
	var delay : float;
	var count : float;
	var type : int;
}

var spawnRate : float;
var enemyPrefabs : Transform[];
var particlesSpawn : ParticleSystem;
var spawnLocations : Transform[];
var goal : Transform;
private var offset = new Vector3(0.1, 0.0, 0.0);

public var waves : Wave[];
private var currentWaveIndex = 0;

private var clock = 0.0;

function Start ()
{
}

function Update ()
{
	clock += Time.deltaTime;
	if(currentWaveIndex < waves.Length && clock >= waves[currentWaveIndex].delay)
	{
		spawnRandom(waves[currentWaveIndex]);
		currentWaveIndex++;
	}
}

function spawnRandom(wave : Wave)
{
	var waveType = (wave.type) == 0 ? Mathf.Floor(Random.value * enemyPrefabs.Length) : wave.type-1;
	var spawn = Instantiate(enemyPrefabs[waveType]).transform;
	spawn.position = spawnLocations[Mathf.Floor(Random.value * spawnLocations.length)].position + offset;
	offset = -offset;
	Instantiate(particlesSpawn,spawn.position,Quaternion.Euler(-90,0,0));
	spawn.GetComponent.<Enemy>().goal = goal;
	spawn.parent = transform;
	spawn.name = "enemy";
}

function IsFinished()
{
	return currentWaveIndex == waves.Length && transform.childCount == 0;
}