#pragma strict

function Start ()
{
	var ray1 : Ray = Camera.main.ViewportPointToRay(Vector3(0,0,0));
	var ray2 : Ray = Camera.main.ViewportPointToRay(Vector3(1,0,0));
	var ray3 : Ray = Camera.main.ViewportPointToRay(Vector3(1,1,0));
	var ray4 : Ray = Camera.main.ViewportPointToRay(Vector3(0,1,0));
	/*
	Debug.DrawRay(ray1.origin, ray1.direction*100, Color.red);
	Debug.DrawRay(ray2.origin, ray2.direction*100, Color.red);
	Debug.DrawRay(ray3.origin, ray3.direction*100, Color.red);
	Debug.DrawRay(ray4.origin, ray4.direction*100, Color.red);
	Debug.Break();
	
	
	var hit1 : RaycastHit;
	var hit2 : RaycastHit;
	var hit3 : RaycastHit;
	var hit4 : RaycastHit;
	
	Physics.Raycast (ray1, hit1, Mathf.Infinity, 1 << 11);
	Physics.Raycast (ray2, hit2, Mathf.Infinity, 1 << 11);
	Physics.Raycast (ray3, hit3, Mathf.Infinity, 1 << 11);
	Physics.Raycast (ray4, hit4, Mathf.Infinity, 1 << 11);
	*/
	
	var hPlane = new Plane(Vector3.up, Vector3.zero);
   	var distance = 0.0;
   	
   	var p1 = new Vector3();
   	var p2 = new Vector3();
   	var p3 = new Vector3();
   	var p4 = new Vector3();
   	if (hPlane.Raycast(ray1, distance))
    	p1 = ray1.GetPoint(distance);
   	if (hPlane.Raycast(ray2, distance))
    	p2 = ray2.GetPoint(distance);
   	if (hPlane.Raycast(ray3, distance))
    	p3 = ray3.GetPoint(distance);
   	if (hPlane.Raycast(ray4, distance))
    	p4 = ray4.GetPoint(distance);
	
	var mesh : Mesh = new Mesh();
	mesh.vertices = [p1, p2, p3, p4];
	print(p1);
	print(p2);
	print(p3);
	print(p4);
	mesh.uv = [new Vector2(0,0),new Vector2(1,0),new Vector2(1,1),new Vector2(0,1)];
	mesh.triangles = [0,2,1,0,3,2];
	GetComponent.<MeshFilter>().mesh = mesh;
}

function Update ()
{
}