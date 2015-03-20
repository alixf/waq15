#pragma strict

var target : Transform;
var offset : Vector2;

function Start()
{
	
}

function Update()
{
	if(target != null)
		transform.position = Camera.main.WorldToScreenPoint(target.position)+offset;
}