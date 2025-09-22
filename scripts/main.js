document.addEventListener("DOMContentLoaded", () => {
    let quacks = 0;
    let lastQuacks = 0;

    const duck = document.getElementById("duck");
    const score = document.getElementById("score");
    const qpsDisplay = document.getElementById("qps");
    const gameArea = document.querySelector(".game-area");

    // Duck click handler
    duck.addEventListener("click", () => {
        quacks++;
        score.textContent = `Quacks: ${quacks}`;

        // Floating "+1 Quack" text
        const floatText = document.createElement("div");
        floatText.className = "floating-text";
        floatText.textContent = "+1 Quack";

        const rect = duck.getBoundingClientRect();
        const areaRect = gameArea.getBoundingClientRect();
        floatText.style.left = `${rect.left - areaRect.left + rect.width/2}px`;
        floatText.style.top = `${rect.top - areaRect.top + rect.height*0.05}px`;

        gameArea.appendChild(floatText);
        setTimeout(() => floatText.remove(), 1000);
    });

    // QPS updater
    setInterval(() => {
        qpsDisplay.textContent = `Quacks per second: ${quacks - lastQuacks}`;
        lastQuacks = quacks;
    }, 1000);
});
