let quacks = 0;
let lastQuacks = 0;
let qps = 0;

// Elements
const duck = document.getElementById("duck");
const score = document.getElementById("score");
const qpsDisplay = document.getElementById("qps");

// Duck click increases quacks
duck.addEventListener("click", () => {
    quacks++;
    score.textContent = `Quacks: ${quacks}`;
});

// Update QPS every second
setInterval(() => {
    qps = quacks - lastQuacks;
    lastQuacks = quacks;
    qpsDisplay.textContent = `Quacks per second: ${qps}`;
}, 1000);
