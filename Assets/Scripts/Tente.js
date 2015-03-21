#pragma strict

public var target : Health;

function Start ()
{

}

function Update ()
{
	var h : float = target.health;
	var mh :float = target.maxHealth;
	GetComponent.<Animator>().SetFloat("light", 1-(h/mh));
}