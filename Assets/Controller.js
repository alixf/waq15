#pragma strict

public var speed = 1.0;

function Start()
{
}

function FixedUpdate()
{
	var stick1 = new Vector2(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"));
	var stick2 = new Vector2(Input.GetAxis("Horizontal2"), Input.GetAxis("Vertical2"));
	
	if(stick2.magnitude > 0.0)
		transform.eulerAngles.y = Mathf.Atan2(stick2.x, stick2.y) * Mathf.Rad2Deg;
	if(stick1.magnitude > 0.0)
	{
		var direction = new Vector3(stick1.x, 0.0, stick1.y);
		GetComponent.<Rigidbody>().velocity = direction.normalized * speed;
	}
	else
		GetComponent.<Rigidbody>().velocity = Vector3.zero;
}