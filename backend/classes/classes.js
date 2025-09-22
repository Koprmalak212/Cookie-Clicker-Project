


class Player {
     Name;
     TotalPoints;
     LifetimePoints;
     PointsPerClick;

     TotalClicksMade;
     ClicksThisSession;

     AutoClickers;
     Upgrades;
     LastSaveTime;

};


class MainGame {
     PlayerInstance;
     GameRunning;

     LastSave;
     AutoSaveInterval;

     StartGame(){
     };

     UpdateGame(){
     };

     SaveGame(){
     };
      LoadGame(){
     };

     HandleClick(){
     };

     BuyAutoClicker($AutoClickerType){
     };

};


let Constant = MainGame.new()
Constant.StartGame()
