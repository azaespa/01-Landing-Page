const drawingBoardContainer = document.querySelector(".drawing-board-container");
const drawingBoard = document.querySelector("#drawing-board");
const gridSizeSlider = document.querySelector("#grid-size");
const gridSizeValue = document.querySelector("#grid-size-value");
const squareCheckBox = document.querySelector("#square-check-pixel");
const blackButton = document.querySelector("#black-btn");
const rainbowButton = document.querySelector("#rainbow-btn");
const eraserButton = document.querySelector("#eraser-btn");
const borderButton = document.querySelector("#border");

let pixels = null;
let rowSize = 16;
let isRainbow = false;
let isToggling = false;
let colorBtn = null;

const eraser = "white";
const black = "black";
const rainbow = () => {
    const red = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${blue}, ${green})`;
};

function brushColor() {
    switch(colorBtn) {
        case "black-btn":
            return black;
        case "rainbow-btn":
            return rainbow();
        case "eraser-btn":
            return eraser;
        default:
            return black;
    }
}

function handleBrushColor(event) {
    let button = event.target;
    colorBtn = button.id;
}

function handleGridSize() {
    removePixels();
    rowSize = gridSizeSlider.value;
    gridSizeValue.innerText = `Grid Size: ${rowSize} x ${rowSize}`;
    generatePixels();
}

function removePixels() {
    while(drawingBoard.hasChildNodes()) {
        drawingBoard.removeChild(drawingBoard.firstChild);
    }
}

function generatePixels() {
    for (let i = 0; i < rowSize; i++)
    {
        let row = document.createElement("div");
        row.classList.add(`row`);
        for (let j = 0; j < rowSize; j++)
        {
            let column = document.createElement("div");
            column.classList.add(`col`);
            row.appendChild(column);
        }
        drawingBoard.appendChild(row);
    }
    pixels = drawingBoard.querySelectorAll(".col");
}

function handleBorder() {
    if (!drawingBoard.classList.contains("pixels-border")) {
        drawingBoard.classList.add("pixels-border");
    } else {
        drawingBoard.classList.remove("pixels-border");
    }
}

function enableBrush(event) {
    let pixel = event.target;
    isToggling = true;

    if (pixel.className != "col") {
        return;
    }

    for (let i = 0; i < pixels.length; i++) {
        pixels[i].onmouseenter = brush;
    }

    pixel.style.backgroundColor = brushColor();
    pixel.onmouseup = disableBrush;
}

function brush(event) {
    let pixel = event.target;
    if (isToggling != true) {
        return;
    }
    pixel.style.backgroundColor = brushColor();
    pixel.onmouseup = disableBrush;
}

function disableBrush() {
    isToggling = false;
}

function init() {
    generatePixels();
    gridSizeSlider.addEventListener("input", handleGridSize);
    blackButton.addEventListener("click", handleBrushColor);
    rainbowButton.addEventListener("click", handleBrushColor);
    eraserButton.addEventListener("click", handleBrushColor);
    borderButton.addEventListener("click", handleBorder);
    drawingBoard.addEventListener("mousedown", enableBrush);
}

init();