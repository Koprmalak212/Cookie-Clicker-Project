

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
        console.log(this.CurrentPoints);



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

let Constant = new MainGame()
Constant.StartGame();



let Clicker1 = new CustomAutoclicker("Click", 1);
Clicker1.ValuePerClicker = 1;
let Player1 = new Player("Player1", []);


document.addEventListener("DOMContentLoaded", ()=>{
    const duck = document.getElementById("duck");
    const score = document.getElementById("quacks");
    const qpsDisplay = document.getElementById("qps");
    const gameArea = document.querySelector(".game-area");


    duck.addEventListener("click",() =>{
        Player1.click(Player1.PointsPerClick);
        score.textContent = Player1.CurrentPoints;
    });
    setInterval(()=>{

        Player1.ClicksThisSession = 0;
    })
})

