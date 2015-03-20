#pragma strict

function Start()
{
	print(Mathf.Atan2(-1, 0));
	print(Mathf.Atan2(1, 0));
	print(Mathf.Atan2(0, -1));
	print(Mathf.Atan2(0, 1));
}

function Update()
{
	var direction = new Vector2(Input.GetAxisRaw("Horizontal2"), Input.GetAxisRaw("Vertical2"));
	if(direction.magnitude > 0.0)
	{
		transform.rotation.y = Mathf.Atan2(direction.normalized.y, direction.normalized.x);
		print(transform.rotation.y);
	}
}