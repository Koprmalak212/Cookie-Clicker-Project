

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



  click(Value,score,duck,gameArea) {
    this.TotalClicksMade++;
    this.CurrentPoints += Value;
    this.ClicksThisSession++;

    score.textContent = `Quacks: ${this.CurrentPoints}`;
    // Floating "+1 Quack" text
    const floatText = document.createElement("div");
    floatText.className = "floating-text";
    floatText.textContent = "+1 Quack";

    const rect = duck.getBoundingClientRect();
    const areaRect = gameArea.getBoundingClientRect();
    floatText.style.left = `${rect.left - areaRect.left + rect.width / 2}px`;
    floatText.style.top = `${rect.top - areaRect.top + rect.height * 0.05}px`;

    gameArea.appendChild(floatText);
    setTimeout(() => floatText.remove(), 1000);


  }
}

class AutoClickerMaker {
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

let Clicker1 = new AutoClickerMaker("Breat Feeder", 1);
Clicker1.ValuePerClicker = 1;

class UseAutoClicker {
  Name = "";
  Total = 0;
  ValuePerClicker = 0;

  
}

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

let Player1 = new Player("Player1", [Clicker1]);

// QPS updater

document.addEventListener("DOMContentLoaded", () => {

  let quacks = 0;
  let lastQuacks = 0;

  const duck = document.getElementById("duck");
  const score = document.getElementById("score");
  const qpsDisplay = document.getElementById("qps");
  const gameArea = document.querySelector(".game-area");

  // Duck click handler
  duck.addEventListener('click', () => {
    quacks++;
    Player1.click(1, score, duck, gameArea);
  })

  // QPS updater
  setInterval(() => {
    qpsDisplay.textContent = `Quacks per second: ${quacks - lastQuacks}`;
    lastQuacks = quacks;
  }, 1000);
});

