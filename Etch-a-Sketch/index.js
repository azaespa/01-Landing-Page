const drawingBoard = document.getElementById("drawing-board");

const gridSizeSlider = document.getElementById("grid-size-slider");
const gridSizeTxt = document.getElementById("grid-size-text");

const blackBtn = document.getElementById("black-btn");
const rainbowBtn = document.getElementById("rainbow-btn");
const eraserBtn = document.getElementById("eraser-btn");
const pixelsBorderBtn = document.getElementById("pixels-border-btn");

const ERASER = "white";
const BLACK = "black";

let pixels = null;
let rowSize = 16;
let isBrushing = false;
let colorBtnId = null;

function rainbow() {
    const red = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${blue}, ${green})`;
};

function brushColor() {
    switch(colorBtnId) {
        case "black-btn":
            return BLACK;

        case "rainbow-btn":
            return rainbow();

        case "eraser-btn":
            return ERASER;

        default:
            return BLACK;
    }
}

function destroyPixels() {
    while(drawingBoard.hasChildNodes()) {
        drawingBoard.removeChild(drawingBoard.firstChild);
    }
}

function generatePixels() {
    for (let i = 0; i < rowSize; i++)
    {
        let row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < rowSize; j++)
        {
            let pixel = document.createElement("div");
            pixel.classList.add("pixel");
            row.appendChild(pixel);
        }

        drawingBoard.appendChild(row);
    }

    pixels = drawingBoard.querySelectorAll(".pixel");
}

function continueBrushing(event) {
    let pixel = event.target;

    if (isBrushing != true) {
        return;
    }

    pixel.style.backgroundColor = brushColor();
    pixel.onmouseup = stopBrushing;
}

function stopBrushing() {
    isBrushing = false;
}

function handleGridSize() {
    destroyPixels();
    rowSize = gridSizeSlider.value;
    gridSizeTxt.innerText = `Grid Size: ${rowSize} x ${rowSize}`;
    generatePixels();
}

function handleBrushColor(event) {
    let button = event.target;
    colorBtnId = button.id;
}

function handlePixelsBorder() {
    if (!drawingBoard.classList.contains("pixels-border")) {
        drawingBoard.classList.add("pixels-border");
    } else {
        drawingBoard.classList.remove("pixels-border");
    }
}

function handleBrushState(event) {
    const pixel = event.target;
    isBrushing = true;

    if (pixel.className != "pixel") {
        return;
    }
    
    pixel.style.backgroundColor = brushColor();

    for (let i = 0; i < pixels.length; i++) {
        pixels[i].onmouseenter = continueBrushing;
    }

    pixel.onmouseup = stopBrushing;
}

function init() {
    generatePixels();

    gridSizeSlider.addEventListener("input", handleGridSize);
    blackBtn.addEventListener("click", handleBrushColor);
    rainbowBtn.addEventListener("click", handleBrushColor);
    eraserBtn.addEventListener("click", handleBrushColor);
    pixelsBorderBtn.addEventListener("click", handlePixelsBorder);
    drawingBoard.addEventListener("mousedown", handleBrushState);
}

init();