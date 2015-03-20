#pragma strict

var goal : Health;
var gameOverOverlay : Transform;
var winOverlay : Transform;
var pauseOverlay : Transform;
var enemySpawner : EnemySpawner;
private var pauseOpened = false;

function Start ()
{
}

function Update ()
{
	if(goal.health <= 0) // Game Over
	{
		gameOverOverlay.gameObject.SetActive(true);
	}
	if(Input.GetKeyDown(KeyCode.Escape)) // Pause
	{
		pauseOverlay.gameObject.SetActive(!pauseOpened);
		pauseOpened = !pauseOpened;
		Time.timeScale = pauseOpened ? 0.0 : 1.0;
	}
	if(enemySpawner.leftToKill == 0) // Win
	{
		winOverlay.gameObject.SetActive(true);
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