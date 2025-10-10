const duck = document.getElementById("Duck");
const score = document.getElementById("score");
const qpsDisplay = document.getElementById("qps");
const gameArea = document.querySelector(".game-area");

class Player {
  Name;
  TotalPoints = 0;
  LifetimePoints = 0;
  PointsPerClick = 1;
  CurrentPoints = 0;
  TotalClicksMade = 0;
  ClicksThisSession = 0;

  Upgrades = 0;
  LastSaveTime = 0;
  AutoClickers = [];

  constructor(Name, AutoClickers) {
    this.Name = Name;
    this.AutoClickers = AutoClickers;
  }

  click(Value) {
    this.TotalClicksMade++;
    this.CurrentPoints += Value;
    this.ClicksThisSession++;

    score.textContent



  }
}

class CustomAutoclicker {
  Name = "";
  Total = 0;
  ValuePerClicker = 0;

  constructor(Name, Value) {
    this.Name = Name;
    this.ValuePerClicker = Value;
  }

  AddClickers(Amount) {
    this.Total += Amount;
    console.log("Remove  money for buying");
  }

  SellClickers(Amount) {
    if (this.Total - Amount > 0) {
      this.Total -= Amount;
      console.log("Add money for selling");
    }
  }
}

let Clicker1 = new CustomAutoclicker("Click", 1);
Clicker1.ValuePerClicker = 1;

class AutoclickerMain {}

class MainGame {
  PlayerInstance;
  GameRunning;

  LastSave;
  AutoSaveInterval;

  StartGame() {}

  UpdateGame() {}

  SaveGame() {}

  LoadGame() {}

  HandleClick() {}

  BuyAutoClicker($AutoClickerType) {}
}

let Constant = MainGame.new();
Constant.StartGame();
