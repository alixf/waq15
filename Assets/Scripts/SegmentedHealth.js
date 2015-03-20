#pragma strict

class Segment extends System.Object
{
	var color : int;
	var health : float;
	@HideInInspector
	var maxHealth : float;
}

var segments : Segment[];
var currentSegment = 0;
var maxHealth = 0;
var remainingHealth = 8;

function Start()
{
	maxHealth = 0;
	for(var i = 0; i < segments.Length; i++)
	{
		segments[i].maxHealth = segments[i].health;
		maxHealth += segments[i].health;
	}
	remainingHealth = maxHealth;
}

function doDamage(value : float)
{
	remainingHealth--;
	segments[currentSegment].health = Mathf.Max(segments[currentSegment].health - value, 0.0);
	if(segments[currentSegment].health <= 0.0)
		if(currentSegment < segments.Length-1)
			currentSegment++;
}

function GetCurrentColor()
{
	return segments[currentSegment].color;
}