#pragma strict

import UI.Image;

var target : SegmentedHealth;

private var layout : RectTransform;
var segment : Transform;

function Start ()
{
	layout = transform.Find("layout");
	
	if(target != null)
		SetTarget(target);
}

function SetTarget(target : SegmentedHealth)
{
	for(var i = target.segments.Length-1; i >= 0; i--)
	{
		var s = target.segments[i];
		var fill = Instantiate(segment);
		fill.transform.SetParent(layout);
		fill.name = "segment"+i;
		fill.GetComponent.<UI.Image>().color = target.segments[i].color == 1 ? Color.red : Color.blue;
		fill.transform.localScale = new Vector3(1.0,1.0,1.0);
	}
}

function Update ()
{
	if(target == null)
	{
		Destroy(gameObject);
		return;
	}

	var segmentedHealth = target.GetComponent.<SegmentedHealth>();
	var maxHealth : float = segmentedHealth.segments[segmentedHealth.currentSegment].maxHealth;
	var health : float = segmentedHealth.segments[segmentedHealth.currentSegment].health;
	
	for(var i = 0; i < segmentedHealth.currentSegment; i++)
		layout.GetChild(segmentedHealth.segments.Length-1-i).GetComponent.<UI.Image>().fillAmount = 0;
	
	layout.GetChild(segmentedHealth.segments.Length-1-segmentedHealth.currentSegment).GetComponent.<UI.Image>().fillAmount = health/maxHealth;
	
	for(i = segmentedHealth.currentSegment+1; i < segmentedHealth.segments.Length; i++)
		layout.GetChild(segmentedHealth.segments.Length-1-i).GetComponent.<UI.Image>().fillAmount = 1;
}