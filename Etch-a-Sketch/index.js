const drawingBoard = document.getElementById("drawing-board");

const gridLinesCheckbox = document.getElementById("grid-lines-checkbox");
const gridSizeSlider = document.getElementById("grid-size-slider");
const gridSizeTxt = document.getElementById("grid-size-text");

const colorPicker = document.getElementById("color-picker");
const leftBucket = document.getElementById("left-bucket");
const rightBucket = document.getElementById("right-bucket");
const blackBtn = document.getElementById("black-btn");
const rainbowBtn = document.getElementById("rainbow-btn");
const eraserBtn = document.getElementById("eraser-btn");
const clearBtn = document.getElementById("clear-btn");
const buttons = document.querySelectorAll(".btn");

const ERASER = "white";
const BLACK = "black";

let pixels = null;
let colorBtnId = null;
let rowSize = 16;
let isBrushing = false;


function rainbow() {
    const red = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${blue}, ${green})`;
};

function brushColor() {
    switch(colorBtnId) {
        case "rainbow-btn":
            return rainbow();

        case "eraser-btn":
            return ERASER;

        case "color-picker":
            return colorPicker.value;

        case "left-bucket":
            return leftBucket.value;

        case "right-bucket":
            return rightBucket.value;

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

//------------------//
//  EVENT HANDLERS  //
//------------------//

function handleGridSize() {
    destroyPixels();
    rowSize = gridSizeSlider.value;
    gridSizeTxt.innerText = `${rowSize} x ${rowSize}`;
    generatePixels();
}

function handleBrushColor(event) {
    let clickedBtn = event.target;
    colorBtnId = clickedBtn.id;
}

function handleBucketColor() {
    let activeBucket = document.querySelector("input[type='color'].active");

    activeBucket.value = colorPicker.value;
}

function handleButtonStyle(event) {
    let clickedBtn = event.target;
    
    for (let button of buttons) {
        button.classList.remove("active");
    }
    
    clickedBtn.classList.toggle("active");
}

function handlePixelsBorder() {
    if (gridLinesCheckbox.checked) {
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

function handleClickCounter(event) {
    let clickCounter = event.detail;

    if (clickCounter !== 2) {
        event.preventDefault();
    }
}

//-----------------------------//
//  INITIALIZE EVENT LISTENERS //
//-----------------------------//

function init() {
    generatePixels();

    colorPicker.addEventListener("input", handleBrushColor);
    colorPicker.addEventListener("input", handleBucketColor);
    gridLinesCheckbox.addEventListener("input", handlePixelsBorder)
    gridSizeSlider.addEventListener("input", handleGridSize);
    leftBucket.addEventListener("input", handleBrushColor);
    rightBucket.addEventListener("input", handleBrushColor);

    clearBtn.addEventListener("click", handleGridSize)
    colorPicker.addEventListener("click", handleBrushColor);
    eraserBtn.addEventListener("click", handleBrushColor);
    leftBucket.addEventListener("click", handleBrushColor);
    leftBucket.addEventListener("click", handleClickCounter);
    rainbowBtn.addEventListener("click", handleBrushColor);
    rightBucket.addEventListener("click", handleBrushColor);
    rightBucket.addEventListener("click", handleClickCounter);

    drawingBoard.addEventListener("mousedown", handleBrushState);

    // STYLE
    eraserBtn.addEventListener("click", handleButtonStyle);
    leftBucket.addEventListener("click", handleButtonStyle);
    rainbowBtn.addEventListener("click", handleButtonStyle);
    rightBucket.addEventListener("click", handleButtonStyle);

}

init();