const resultTxt = document.getElementById("result-txt");
const digitElements = document.getElementsByClassName("digits");
const operatorElements = document.getElementsByClassName("operators");

const digits = [...digitElements];
const operators = [...operatorElements];

let isOperatorClicked = false;

let numbers = [0,0];
let operator = null;

function updateResultTxt(innerText) {
    if (isOperatorClicked) {
        resultTxt.value = "";
        isOperatorClicked = false;
    };

    resultTxt.value += innerText
}

function digitsEventListener(){
    digits.map(element => 
        element.addEventListener("click", () => {
            updateResultTxt(element.innerText);
        }));
}

function operatorsEventListener() {
    operators.map(element => 
        element.addEventListener("click", () => {
            isOperatorClicked = true;
            numbers.push(Number(resultTxt.value));
            numbers.shift();

            console.log(numbers);
        }))
}

function init() {
    digitsEventListener();
    operatorsEventListener();
}

init();