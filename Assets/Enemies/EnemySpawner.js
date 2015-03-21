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

var waves : Transform[];
var wavesTiming : float[];

private var currentWaveIndex = 0;

private var clock = 0.0;

function Start ()
{
}

function Update ()
{
	if(currentWaveIndex < waves.Length && currentWaveIndex < wavesTiming.Length)
	{
		clock += Time.deltaTime;
		var delay : float = wavesTiming[currentWaveIndex];
		if(currentWaveIndex < waves.Length && clock >= delay)
		{
			spawnWave(waves[currentWaveIndex]);
			currentWaveIndex++;
		}
	}
}

function spawnWave(enemy : Transform)
{
	var spawn : Transform = null;
	if(enemy == null)
	{
		var toSpawn = Mathf.Floor(Random.value * Mathf.Min(GameManager.playersCount, enemyPrefabs.Length));
		spawn = Instantiate(enemyPrefabs[toSpawn]).transform;
	}
	else
		spawn = Instantiate(enemy).transform;
		
	
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