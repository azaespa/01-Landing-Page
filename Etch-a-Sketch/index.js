const container = document.querySelector(".container");

for (let i = 0; i < 16; i++)
{
    let row = document.createElement("div");
    row.classList.add(`row`);
    for (let j = 0; j < 16; j++)
    {
        let column = document.createElement("div");
        column.classList.add(`col`);
        row.appendChild(column);
    }
    container.appendChild(row);
}

const boxes = container.querySelectorAll(".col");

function handleHover() {
    if (!this.classList.contains("hovered")) {
        this.classList.add("hovered");
    }
}

function init() {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("mouseover", handleHover);
    }
}

init();