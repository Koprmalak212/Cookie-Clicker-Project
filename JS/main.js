const upgrades = [
    // slave workd Upgrades
    {id: 'beak', name: 'Bigger Beak', emoji: '💪', baseCost: 25, type: 'perClick', val: 1},
    {id: 'rubber', name: 'Rubber Duck', emoji: '🦆', baseCost: 50, type: 'perClick', val: 2},
    {id: 'feather', name: 'Golden Feather', emoji: '✨', baseCost: 250, type: 'perClickMult', val: 2},
    {id: 'hat', name: 'Fancy Hat', emoji: '🎩', baseCost: 300, type: 'perClickMult', val: 2},

    // make ducks do slave labor for yoy
    {id: 'auto', name: 'Auto Clicker', emoji: '🕒', baseCost: 10, type: 'perSec', val: 1},
    {id: 'farm', name: 'Duck Farm', emoji: '🏡', baseCost: 100, type: 'perSec', val: 5},
    {id: 'pond', name: 'Pond', emoji: '🌊', baseCost: 150, type: 'perSec', val: 10},
    {id: 'factory', name: 'Duck Factory', emoji: '🏭', baseCost: 500, type: 'perSec', val: 50},
    {id: 'mine', name: 'Duck Mine', emoji: '⛏️', baseCost: 2000, type: 'perSec', val: 200},
    {id: 'spaceship', name: 'Duck Spaceship', emoji: '🚀', baseCost: 10000, type: 'perSec', val: 1000},
    {id: 'portal', name: 'Duck Portal', emoji: '🌀', baseCost: 50000, type: 'perSec', val: 5000},
    {id: 'timemachine', name: 'Time Machine', emoji: '⏰', baseCost: 200000, type: 'perSec', val: 20000},

    {id: 'farmboost', name: 'Fertilizer', emoji: '🌱', baseCost: 500, type: 'multiplier', target: 'farm', val: 2},
    {id: 'pondboost', name: 'Water Filter', emoji: '💧', baseCost: 1000, type: 'multiplier', target: 'pond', val: 2},
    {
        id: 'factoryboost',
        name: 'Assembly Line',
        emoji: '⚙️',
        baseCost: 2500,
        type: 'multiplier',
        target: 'factory',
        val: 2
    },
    {id: 'mineboost', name: 'Whipped Ducks', emoji: '🔨', baseCost: 10000, type: 'multiplier', target: 'mine', val: 2},
    {id: 'globalboost', name: 'SmarterDucks', emoji: '📊', baseCost: 5000, type: 'globalMult', val: 1.1},
];

const duck = document.getElementById('duck');
const count = document.getElementById('count');
const upgradeList = document.getElementById('upgradeList');
const shopButtons = document.getElementById('shopButtons');
const clearBtn = document.getElementById('clearSession');
const perSecDisplay = document.getElementById('perSecDisplay');


class GameState {
    constructor() {

        this.Ducks = 0;
        this.PerClick = 1;
        this.PerClickMultiplier = 1;
        this.PerSecond = 0;
        this.Bought = {};
        this.Multipliers = {};
    }

    // Load first, else make new.
    Load() {
        const SavedData = localStorage.getItem('DuckState');
        if (SavedData) {
            try {
                const Data = JSON.parse(SavedData);
                this.Ducks = Data.Ducks || 0;
                this.PerClick = Data.PerClick || 1;
                this.PerClickMultiplier = Data.PerClickMultiplier || 1;
                this.PerSecond = Data.PerSecond || 0;
                this.Bought = Data.Bought || {};
                this.Multipliers = Data.Multipliers || {};
                console.log('Game loaded successfully');
            } catch (error) {
                console.error('Failed to load game state:', error);
            }
        }
    }

    // save the cash
    Save() {
        const Data = {
            Ducks: this.Ducks,
            PerClick: this.PerClick,
            PerClickMultiplier: this.PerClickMultiplier,
            PerSecond: this.PerSecond,
            Bought: this.Bought,
            Multipliers: this.Multipliers
        };
        localStorage.setItem('DuckState', JSON.stringify(Data));
    }

    // add ducks, then save game.
    AddDucks(Amount) {
        this.Ducks += Amount;
        this.Save();
    }

    // Check if brokie
    CanAfford(Cost) {
        return this.Ducks >= Cost;
    }

    // spend cash
    Spend(Cost) {
        if (this.CanAfford(Cost)) {
            this.Ducks -= Cost;
            this.Save();
            return true;
        }
        return false;
    }

    //calculate the dubloons a player makes
    GetClickValue() {
        return this.PerClick * this.PerClickMultiplier;
    }

    // slave labor
    Click() {
        this.AddDucks(this.GetClickValue());
    }

    // count
    GetBoughtCount(UpgradeId) {
        return this.Bought[UpgradeId] || 0;
    }

    // mark as bought
    AddBought(UpgradeId) {
        this.Bought[UpgradeId] = (this.Bought[UpgradeId] || 0) + 1;
        this.Save();
    }

    // Calculate for inflation.
    GetUpgradeCost(Upgrade) {
        const TimesBought = this.GetBoughtCount(Upgrade.id);
        let Multiplier = 1.5;

        if (Upgrade.type === 'perSec') Multiplier = 1.7;
        if (Upgrade.type === 'perClickMult') Multiplier = 2;
        if (Upgrade.type === 'multiplier') Multiplier = 2.5;
        if (Upgrade.type === 'globalMult') Multiplier = 3;

        return Math.ceil(Upgrade.baseCost * Math.pow(Multiplier, TimesBought));
    }

    //effects
    ApplyUpgrade(Upgrade) {
        switch (Upgrade.type) {
            case 'perClick':
                this.PerClick += Upgrade.val;
                break;

            case 'perClickMult':
                this.PerClickMultiplier *= Upgrade.val;
                break;

            case 'perSec':
                this.PerSecond += Upgrade.val;
                break;

            case 'multiplier':
                // Track multiplier for specific autoclicker
                if (!this.Multipliers[Upgrade.target]) {
                    this.Multipliers[Upgrade.target] = 1;
                }
                this.Multipliers[Upgrade.target] *= Upgrade.val;
                this.RecalculateProduction();
                break;

            case 'globalMult':
                // Apply to all production
                this.PerSecond *= Upgrade.val;
                break;
        }
        this.Save();
    }

    // money
    RecalculateProduction() {
        let TotalProduction = 0;

        upgrades.forEach(upgrade => {
            if (upgrade.type === 'perSec') {
                const Owned = this.GetBoughtCount(upgrade.id);
                const Multiplier = this.Multipliers[upgrade.id] || 1;
                TotalProduction += upgrade.val * Owned * Multiplier;
            }
        });

        this.PerSecond = TotalProduction;
    }

    // buy stuff
    BuyUpgrade(Upgrade) {
        const Cost = this.GetUpgradeCost(Upgrade);

        if (this.Spend(Cost)) {
            this.AddBought(Upgrade.id);
            this.ApplyUpgrade(Upgrade);
            return true;
        }
        return false;
    }

    // update display
    UpdateDisplay() {
        count.textContent = Math.floor(this.Ducks);
        perSecDisplay.textContent = `+${Math.floor(this.PerSecond)}/sec`;
        this.UpdateUpgradeList();
    }

    // Update owned upgrades list
    UpdateUpgradeList() {
        upgradeList.innerHTML = '';

        Object.keys(this.Bought).forEach(id => {
            const Upgrade = upgrades.find(u => u.id === id);
            if (!Upgrade) return;

            const Times = this.GetBoughtCount(id);
            let Effect = '';

            switch (Upgrade.type) {
                case 'perClick':
                    Effect = `+${Upgrade.val}/click`;
                    break;
                case 'perClickMult':
                    Effect = `×${Upgrade.val}/click`;
                    break;
                case 'perSec':
                    const Multiplier = this.Multipliers[id] || 1;
                    Effect = `+${Upgrade.val * Multiplier}/sec`;
                    break;
                case 'multiplier':
                    Effect = `${Upgrade.target} ×${Upgrade.val}`;
                    break;
                case 'globalMult':
                    Effect = `All ×${Upgrade.val}`;
                    break;
            }

            upgradeList.innerHTML += `
                <div class="bg-white/50 rounded-xl p-3 shadow-md border border-white/30">
                    <span class="font-bold">${Upgrade.name}</span> ×${Times} — <span class="font-semibold">${Effect}</span>
                </div>
            `;
        });
    }

    // Render shop
    RenderShop() {
        shopButtons.innerHTML = '';

        // Sort by cost
        const SortedUpgrades = [...upgrades].sort((a, b) =>
            this.GetUpgradeCost(a) - this.GetUpgradeCost(b)
        );

        SortedUpgrades.forEach(upgrade => {
            const btn = document.createElement('button');
            btn.id = upgrade.id;
            const Cost = this.GetUpgradeCost(upgrade);

            btn.innerHTML = `
                <div class="flex items-center justify-between">
                    <span class="text-2xl mr-2">${upgrade.emoji}</span>
                    <span class="font-semibold">${upgrade.name}</span>
                    <span class="font-bold ml-2">${Cost}</span>
                </div>
            `;

            btn.className = `
                w-full bg-gradient-to-r from-yellow-400 to-yellow-300
                hover:scale-105 hover:shadow-xl transition transform py-3 px-4 rounded-2xl
                font-bold shadow-md text-black flex items-center justify-between
            `;

            btn.disabled = !this.CanAfford(Cost);
            btn.addEventListener('click', () => {
                if (this.BuyUpgrade(upgrade)) {
                    this.UpdateDisplay();
                    this.RenderShop();
                }
            });

            shopButtons.appendChild(btn);
        });
    }
}


const State = new GameState();
State.Load();


duck.addEventListener('click', () => {
    State.Click();
    duck.classList.add('pop');
    setTimeout(() => duck.classList.remove('pop'), 150);
    State.UpdateDisplay();
    State.RenderShop();
});

clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset your game?')) {
        console.log('Reached')
        localStorage.clear();
        Object.assign(State, new GameState());
        location.reload();

    }
});


setInterval(() => {
    State.AddDucks(State.PerSecond);
    State.UpdateDisplay();
    State.RenderShop();
}, 1000);

State.UpdateDisplay();
State.RenderShop();

console.log('Denis can code.');