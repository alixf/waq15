#pragma strict

function DieForReal()
{
	transform.parent.GetComponent.<Enemy>().AfterDie();
	Destroy(transform.parent.gameObject);
}