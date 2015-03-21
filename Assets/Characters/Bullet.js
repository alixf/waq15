#pragma strict

var distanceSpan = 1.0;
var particlesDie : ParticleSystem[];
private var distance = 0.0;
var color = 1;

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
}

function OnTriggerEnter(c : Collider)
{
	Die();
}

function Die()
{
	Instantiate(particlesDie[color-1],transform.position,Quaternion.Euler(-90,0,0));
	Destroy(this.gameObject);
}

function SetColor () {
	if (color == 1){
		GetComponent.<SpriteRenderer>().color = Color.yellow;
	}
	if (color == 2){
		GetComponent.<SpriteRenderer>().color = Color.blue;
	}
	if (color == 3){
		GetComponent.<SpriteRenderer>().color = Color.red;
	}
}