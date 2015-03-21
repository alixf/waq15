#pragma strict

function Start () {

}

function Update () {
	transform.LookAt(Camera.main.transform.position);
	transform.RotateAround(Vector3.left, 90);
}