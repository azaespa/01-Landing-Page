const drawingBoard = document.querySelector("#drawing-board");
const gridSizeSlider = document.querySelector("#grid-size");
const gridSizeValue = document.querySelector("#grid-size-value");
const blackButton = document.querySelector("#black");
const rainbowButton = document.querySelector("#rainbow");
const borderButton = document.querySelector("#border");

let boxes = null;
let rowSize = 16;
let isRainbow = false;

const black = "black";
const rainbow = () => {
    const red = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${blue}, ${green})`;
}

function brushColor() {
    return isRainbow ? rainbow(): black;
}

function handleBlackButton() {
    isRainbow = false;
}

function handleRainbowButton() {
    isRainbow = true;
}

function handleGridSize() {
    removeBoxes();
    rowSize = this.value;
    gridSizeValue.innerText = `Grid Size: ${rowSize} x ${rowSize * 2}`;
    generateBoxes();
}

function removeBoxes() {
    while(drawingBoard.hasChildNodes()) {
        drawingBoard.removeChild(drawingBoard.firstChild);
    }
}

function generateBoxes() {
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
    boxes = drawingBoard.querySelectorAll(".col");
    boxAddEventListener();
}

let mouseDown = 0;

function handleHover() {
    this.onmousedown = () => {
        mouseDown = 1;
        this.style.backgroundColor = brushColor();
    };
    this.onmouseup = () => {
        mouseDown = 0;
    }
    if (mouseDown == 1) {
        this.style.backgroundColor = brushColor();
    }
}

function boxAddEventListener() {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("mouseover", handleHover);
    }
}

function handleBorder() {
    if (!drawingBoard.classList.contains("border")) {
        drawingBoard.classList.add("border");
    } else {
        drawingBoard.classList.remove("border");
    }
}

function init() {
    generateBoxes();
    gridSizeSlider.addEventListener("input", handleGridSize);
    blackButton.addEventListener("click", handleBlackButton);
    rainbowButton.addEventListener("click", handleRainbowButton);
    borderButton.addEventListener("click", handleBorder);
}

init();