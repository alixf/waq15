#pragma strict

import UI.Image;

var target : Health;
private var fill : UI.Image;

function Start ()
{
	fill = transform.Find("fill").GetComponent.<UI.Image>();
}

function Update ()
{
	if(target == null)
	{
		Destroy(gameObject);
		return;
	}
	
	var health : float = target.GetComponent.<Health>().health;
	var maxHealth : float = target.GetComponent.<Health>().maxHealth;
	fill.fillAmount = health/maxHealth;
}