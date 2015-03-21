#pragma strict

var goal : Health;
var gameOverOverlay : Transform;
var winOverlay : Transform;
var pauseOverlay : Transform;
var enemySpawner : EnemySpawner;
private var pauseOpened = false;

static var playersCount = 0;
var fairyPrefab : Transform;
var controllerMap = [false, false, false];

function Start ()
{
}

function Update ()
{
	if(goal.health <= 0) // Game Over
	{
		gameOverOverlay.gameObject.SetActive(true);
	}
	if(Input.GetButtonDown("P1 Start") || Input.GetButtonDown("P2 Start") || Input.GetButtonDown("P3 Start")) // Pause
	{
		pauseOverlay.gameObject.SetActive(!pauseOpened);
		pauseOpened = !pauseOpened;
		Time.timeScale = pauseOpened ? 0.0 : 1.0;
	}
	if(enemySpawner.IsFinished()) // Win
	{
		winOverlay.gameObject.SetActive(true);
	}
	
	for(var i = 0; i < 3; i++)
	{
		if(controllerMap[i] == false)
		{
			if (Input.GetAxis("P"+(i+1)+" A1") != 0.0f ||
				Input.GetAxis("P"+(i+1)+" A2") != 0.0f ||
				Input.GetAxis("P"+(i+1)+" A3") != 0.0f ||
				Input.GetAxis("P"+(i+1)+" A4") != 0.0f ||
				Input.GetAxis("P"+(i+1)+" A5") != 0.0f ||
				Input.GetButtonDown("P"+(i+1)+" Start"))
			{
				print("OK");
				var fairy = Instantiate(fairyPrefab);
				fairy.GetComponent.<FairyController>().SetColor(++playersCount);
				fairy.GetComponent.<FairyController>().controllerId = (i+1);
				controllerMap[i] = true;
			}
		}
	}
}

public function Restart()
{
	Application.LoadLevel(Application.loadedLevel);
}

public function Quit()
{
	Application.Quit();
}