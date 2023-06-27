const drawingBoardContainer = document.querySelector(".drawing-board-container");
const drawingBoard = document.querySelector("#drawing-board");
const gridSizeSlider = document.querySelector("#grid-size");
const gridSizeValue = document.querySelector("#grid-size-value");
const squareCheckBox = document.querySelector("#square-check-pixel");
const blackButton = document.querySelector("#black");
const rainbowButton = document.querySelector("#rainbow");
const borderButton = document.querySelector("#border");

let pixels = null;
let rowSize = 16;
let isRainbow = false;
let isToggling = false;

const black = "black";
const rainbow = () => {
    const red = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${blue}, ${green})`;
};

function brushColor() {
    return isRainbow ? rainbow() : black;
}

function handleBrushColor(event) {
    let button = event.target.id;
    switch(button) {
        case "black":
            isRainbow = false;
            break;
        case "rainbow":
            isRainbow = true;
            break;
    }
}

function handleGridSize() {
    removePixels();
    rowSize = this.value;
    gridSizeValue.innerText = `Grid Size: ${rowSize} x ${rowSize * 2}`;
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
        for (let j = 0; j < (rowSize * 2); j++)
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
    if (!drawingBoard.classList.contains("border")) {
        drawingBoard.classList.add("border");
    } else {
        drawingBoard.classList.remove("border");
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
    borderButton.addEventListener("click", handleBorder);
    drawingBoard.addEventListener("mousedown", enableBrush);
}

init();