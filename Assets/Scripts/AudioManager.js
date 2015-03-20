#pragma strict

var enemySpawner : Transform;
var gobelins : AudioSource;

function Start ()
{
}

function Update ()
{
	gobelins.volume = (enemySpawner.childCount > 0) ? 1.0 : 0.0;
}