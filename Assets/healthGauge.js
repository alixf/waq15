#pragma strict

import UI.Image;

var target : Health;

function Start ()
{
}

function Update ()
{
	var health = target.GetComponent.<Health>().health;
	var maxHealth = target.GetComponent.<Health>().maxHealth;
	for(var i = 0; i < maxHealth; i++)
		transform.GetChild(i).GetComponent.<UI.Image>().color.a = (maxHealth-health) > i ? 0.5 : 1.0;
}