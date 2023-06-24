const container = document.querySelector(".container");
const gridSizeButton = document.querySelector("#grid-size");
const blackButton = document.querySelector("#black");
const rainbowButton = document.querySelector("#rainbow");

let boxes = null;
let n = 16;
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
    n = this.value;
    generateBoxes();
}

function removeBoxes() {
    while(container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
}

function generateBoxes() {
    for (let i = 0; i < n; i++)
    {
        let row = document.createElement("div");
        row.classList.add(`row`);
        for (let j = 0; j < n; j++)
        {
            let column = document.createElement("div");
            column.classList.add(`col`);
            row.appendChild(column);
        }
        container.appendChild(row);
    }
    boxes = container.querySelectorAll(".col");
    boxAddEventListener();
}


let mouseDown = 0;

function handleHover() {
    this.onmousedown = () => {
        mouseDown = 1;
    };
    this.onmouseup = () => {
        mouseDown = 0;
    }

    if (mouseDown == 1) {
        this.style.backgroundColor = brushColor();
    }
}

function handleMouseDown() {
    this.style.backgroundColor = brushColor();
}

function boxAddEventListener(){
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("mouseenter", handleHover);
        boxes[i].addEventListener("mousedown", handleMouseDown);
    }
}

function init() {
    generateBoxes();
    gridSizeButton.addEventListener("input", handleGridSize);
    blackButton.addEventListener("click", handleBlackButton);
    rainbowButton.addEventListener("click", handleRainbowButton);
}

init();