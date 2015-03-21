#pragma strict

public var speed = 1.0;
public var color = 0;
@HideInInspector public var controllerId = 0;

function Start()
{
}

function FixedUpdate()
{
	var stick1 = new Vector2(Input.GetAxis("P"+controllerId+" A1"), Input.GetAxis("P"+controllerId+" A2"));
	var stick2 = new Vector2(Input.GetAxisRaw("P"+controllerId+" A4"), Input.GetAxisRaw("P"+controllerId+" A5"));
	
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

function SetColor(color : int)
{
	/*
	switch(color)
	{
	case 1: GetComponent.<Material>().color = Color.red; break;
	case 2: GetComponent.<Material>().color = Color.blue; break;
	case 3: GetComponent.<Material>().color = Color.yellow; break;
	}
	*/
}