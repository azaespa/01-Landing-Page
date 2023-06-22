const container = document.querySelector(".container");
const gridButton = document.querySelector("button");

let boxes = null;

let n = 16;

function handleClick() {
    let temp = Number(prompt("Set grid size. Max 100"));
    if (temp < 101) {
        removeBoxes();
        n = temp;
        generateBoxes();
    } else {
        handleClick();
    }
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



function handleHover() {
    if (!this.classList.contains("hovered")) {
        this.classList.add("hovered");
    }
}

function boxAddEventListener(){
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("mouseover", handleHover);
    }
}

function init() {
    generateBoxes();
    gridButton.addEventListener("click", handleClick);
}

init();