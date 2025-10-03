


class Player {
     Name;
     TotalPoints = 0;
     LifetimePoints = 0;
     PointsPerClick = 0;

     TotalClicksMade = 0;
     ClicksThisSession = 0;

     AutoClickers = 0;
     Upgrades = 0;
     LastSaveTime = 0;
     AutoClickers = []

     constructor(Name,AutoClickers){
          this.Name = Name,
          this.AutoClickers = AutoClickers
     }
};

class Enemy extends Player{
     EnemyHealth = 100;

     constructor(EnemyHealth){
          super(this.Name,this.AutoClickers)
          this.EnemyHealth = EnemyHealth
     }
}

class NPC extends Player{
     AI;

     constructor(AI){
          super(this.Name,this.AutoClickers)
          this.AI = {}
     }
}

let Plr1 = Enemy('Eletro',{},100)
let NPC1 = NPC('NPC',{},{})

console.log(Plr1)


class CustomAutoclicker {
     Name = '';
     Total = 0;
     ValuePerClicker = 0;
     constructor(Name,Value){
          this.Name = Name
          this.ValuePerClicker = Value
     }

     AddClickers(Amount){
         this.Total +=Amount
         console.log('Remove  money for buying')
     };

     SellClickers(Amount){
          if (this.Total-Amount > 0){
               this.Total-=Amount
               console.log("Add money for selling")
          }
     };
}

class AutoclickerMain{
     
}

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


document.addEventListener("DOMContentLoaded")



class Vehicle{
     Name;
     Wheels;
     Brand;
     Passengers

     constructor(Name,Wheels,Brand,Passengers){
          this.Name = Name
          this.Wheels = Wheels
          this.Brand = Brand
          this.Passengers = Passengers;
     }
}

class Bike extends Vehicle{
     BikeType;
     constructor(Name,Wheels,Brand,Passengers,BikeType){
          super(Name,Wheels,Brand,Passengers)
         this.BikeType = BikeType
     }
}

class Car extends Vehicle{
     Make;
     constructor(Name,Wheels,Brand,Passengers,Make){
          super(Name,Wheels,Brand,Passengers)
         this.Make = Make
     }
}
