#pragma strict

var enemySpawner : Transform;
var gobelins : AudioSource;

function Start ()
{
	startIntro();
}

function startIntro()
{
	var arena_intro : AudioSource = transform.Find("arena_intro").GetComponent.<AudioSource>();
	var arena_loop : AudioSource = transform.Find("arena_loop").GetComponent.<AudioSource>();
	arena_intro.Play();
	yield WaitForSeconds(arena_intro.clip.length-0.5);
	arena_loop.Play();
}

function Update ()
{
	gobelins.volume = (enemySpawner.childCount > 0) ? 1.0 : 0.0;
}