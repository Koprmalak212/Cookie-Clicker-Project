<?php 

class Player {
public string $Name;
public int $TotalPoints;
public int $LifetimePoints;
public int $PointsPerClick;

public int $TotalClicksMade;
public int $ClicksThisSession;

public array $AutoClickers;
public array $Upgrades;
public string $LastSaveTime;

};


class Main {
public $PlayerInstance;
public bool $GameRunning;

public $LastSave;
public $AutoSaveInterval;

function StartGame(){
}

function UpdateGame(){
}

function SaveGame(){
}
function LoadGame(){
}

function HandleClick(){
}

function BuyAutoClicker($AutoClickerType){
}

};



?>