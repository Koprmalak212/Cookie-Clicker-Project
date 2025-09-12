const canvas = document.getElementById("DuckCanvas");
const context = canvas.getContext("2d");

const img = new Image();
img.src = "images/emre.png";
img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
};

function click() {
    context.shadowColor = "rgba(0,0,0,0.5)";
    context.shadowBlur = 20;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0);

    setTimeout(() => {
        context.shadowColor = "transparent";
        context.shadowBlur = 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
    }, 150);
}

canvas.addEventListener("mousemove", function (e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pixel = context.getImageData(x, y, 1, 1).data;
    if (pixel[3] > 0) {
        canvas.style.cursor = "pointer";
    } else {
        canvas.style.cursor = "default";
    }
});


canvas.addEventListener("click", function (e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pixel = context.getImageData(x, y, 1, 1).data;
    if (pixel[3] > 0) {
        click();
    }
});
