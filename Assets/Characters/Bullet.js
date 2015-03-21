#pragma strict

var distanceSpan = 1.0;
var particlesDie : ParticleSystem[];
private var distance = 0.0;
var color = 0;

function Start ()
{
}

function Update ()
{
	distance += GetComponent.<Rigidbody>().velocity.magnitude * Time.deltaTime;
	if(distance > distanceSpan)
		Die();
}

function SetColor(color : int)
{
	this.color = color;
	switch(color)
	{
	case 1 : GetComponent.<SpriteRenderer>().color = Color.red; break;
	case 2 : GetComponent.<SpriteRenderer>().color = Color.blue; break;
	case 3 : GetComponent.<SpriteRenderer>().color = Color.yellow; break;
	}
}

function OnTriggerEnter(c : Collider)
{
	Die();
}

function Die()
{
	Instantiate(particlesDie[color-1], transform.position, Quaternion.Euler(-90,0,0));
	Destroy(this.gameObject);
}