const actionTakenTxt = document.getElementById("action-taken-txt");
const resultTxt = document.getElementById("result-txt");
const digitElements = document.getElementsByClassName("digits");
const operatorElements = document.getElementsByClassName("operators");
const equalsBtn = document.getElementById("equals");
const decimal = document.getElementById("decimal");
const clearBtn = document.getElementById("ac-btn");

const digits = [...digitElements];
const operators = [...operatorElements];

let isOperatorClicked = false;
let isDigitClicked = true;
let isEqualsClicked = false;
let isLastActionOperator = false;

let numbers = [];
let addend = null;
let operator = null;
let veryLastNum = null;
let counter = 0;
let decimalCounter = 0;

function updateActionTakenTxt(element) {
    let op = element.innerText;
    const num = numbers.length < 2 ? numbers[0] : numbers[1];
    
    if (element.id == "equals") {
        switch(operator) {
            case "add":
                op = "+";
                break;
            case "sub":
                op = "-";
                break;
            case "mul":
                op = "x";
                break;
            case "div":
                op = "÷";
                break;
        }
        actionTakenTxt.value = `${numbers[0]} ${op} ${numbers[1]} =`;
        return;
    }

    actionTakenTxt.value = `${num} ${op}`;
}

function updateResultTxt(innerText) {
    if (isOperatorClicked) {
        resultTxt.value = "";
        isOperatorClicked = false;
    };

    if (Number(resultTxt.value) == 0 && !resultTxt.value.includes(".")) {
        resultTxt.value = "";
    }

    if (innerText == "." && Number(resultTxt.value) == 0) {
        resultTxt.value = "0"
    }

    resultTxt.value += innerText;
    isDigitClicked = true;
}

function operate(operatorId) {

    const firstNumber = numbers[0];
    let secondNumber = Number(resultTxt.value);

    switch(operatorId) {
        case "add":
            resultTxt.value = firstNumber + secondNumber;
            break;
        case "sub":
            resultTxt.value = firstNumber - secondNumber;
            break;
        case "mul":
            resultTxt.value = firstNumber * secondNumber;
            break;
        case "div":
            resultTxt.value = firstNumber / secondNumber;
            break;
    }

    if (numbers.length > 1) {
        numbers.push(Number(resultTxt.value));
        numbers.shift();
        isLastActionOperator = true;
    } 
}

function calculate(operatorId) {
    if (counter < 1) {
        veryLastNum = Number(resultTxt.value);
        counter++;
    }

    if (numbers.length == 1) numbers.push(Number(resultTxt.value));

    let firstNumber = isLastActionOperator ? numbers[1] : numbers[0];
    let secondNumber = veryLastNum;

    switch(operatorId) {
        case "add":
            resultTxt.value = firstNumber + secondNumber;
            break;
        case "sub":
            resultTxt.value = firstNumber - secondNumber;
            break;
        case "mul":
            resultTxt.value = firstNumber * secondNumber;
            break;
        case "div":
            resultTxt.value = firstNumber / secondNumber;
            break;
    }
    
    numbers[0] = Number(resultTxt.value);
    numbers[1] = isLastActionOperator ? veryLastNum : numbers[1];
    isLastActionOperator = false;
}

function clearAll() {
    resultTxt.value = "0";
    actionTakenTxt.value = "";
    operator = null;
    isOperatorClicked = false;
    isDigitClicked = true;
    isEqualsClicked = false;
    counter = 0;
    decimalCounter = 0;
}

function digitsEventListener(){
    digits.map(element => 
        element.addEventListener("click", () => {
            if (isEqualsClicked) clearAll();
            updateResultTxt(element.innerText);
        }));
}

function operatorsEventListener() {
    operators.map(element => 
        element.addEventListener("click", () => {
            if (isDigitClicked) {
                numbers.push(Number(resultTxt.value));
                
                if (numbers.length > 2) numbers.shift();
                
                operate(operator);
            }

            isOperatorClicked = true;
            isDigitClicked = false;
            decimalCounter = 0;
            operator = element.id;
            updateActionTakenTxt(element);
        }))
}

function handleEqualsBtn() {
    calculate(operator)
    updateActionTakenTxt(equalsBtn)
    isEqualsClicked = true;
}

function handleDecimalBtn(event) {
    decimalCounter++;
    if (decimalCounter < 2) updateResultTxt(decimal.innerText);
}

function init() {
    digitsEventListener();
    operatorsEventListener();
    equalsBtn.addEventListener("click", handleEqualsBtn);
    decimal.addEventListener("click", handleDecimalBtn);
    clearBtn.addEventListener("click", clearAll);
}

init();