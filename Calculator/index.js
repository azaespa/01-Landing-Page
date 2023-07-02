const actionTakenTxt = document.getElementById("action-taken-txt");
const resultTxt = document.getElementById("result-txt");
const digitElements = document.getElementsByClassName("digits");
const operatorElements = document.getElementsByClassName("operators");
const equalsBtn = document.getElementById("equals");
const decimalBtn = document.getElementById("decimal");
const clearBtn = document.getElementById("ac-btn");
const backspaceBtn = document.getElementById("bs-btn");
const plusMinusBtn = document.getElementById("pm-btn");

const digits = [...digitElements];
const operators = [...operatorElements];
const MAX_DIGIT = 10;

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
let fontSize = 16 * 4;

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
        
        actionTakenTxt.value = numbers[1] != undefined ? `${numbers[0]} ${op} ${numbers[1]} =` : `${numbers[0]} =`;

        if (resultTxt.value == "BRUH") actionTakenTxt.value = "BRUH";

        return;
    }

    actionTakenTxt.value = `${num} ${op}`;
    
    if (resultTxt.value == "BRUH") actionTakenTxt.value = "BRUH";

}

function updateResultTxt(innerText) {
    if (getResultTxtLength() >= MAX_DIGIT && !isOperatorClicked) return;
    if (resultTxt.value == "Lol") clearAll();

    if (isOperatorClicked) {
        resultTxt.value = "";
        isOperatorClicked = false;
        
        fontSize = 16 * 4;
        resultTxt.style.fontSize = `${fontSize}px`;
    };

    if (Number(resultTxt.value) == 0 && !resultTxt.value.includes(".")) {
        resultTxt.value = "";
    }

    if (innerText == "." && Number(resultTxt.value) == 0) {
        resultTxt.value = "0"

        isEqualsClicked = false;
    }

    resultTxt.value += innerText;
    isDigitClicked = true;

    if (resultTxt.scrollWidth > resultTxt.clientWidth) {
        fontSize -= 8;
        resultTxt.style.fontSize = `${fontSize}px`;
    }
}

function getResultTxtLength() {
    const symbols = [".", "-"]
    return symbols.some(res => resultTxt.value.includes(res)) ? resultTxt.value.length - 1 : resultTxt.value.length;
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
            resultTxt.value = (firstNumber / secondNumber) == Infinity ? "BRUH" : firstNumber / secondNumber;
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
            resultTxt.value = (firstNumber / secondNumber) == Infinity ? "BRUH" : firstNumber / secondNumber;
            break;
    }
    
    numbers[0] = Number(resultTxt.value);
    numbers[1] = isLastActionOperator ? veryLastNum : numbers[1];
    isLastActionOperator = false;

    if (resultTxt.scrollWidth > resultTxt.clientWidth) {
        while (resultTxt.scrollWidth > resultTxt.clientWidth) {
            fontSize -= 8;
            resultTxt.style.fontSize = `${fontSize}px`;
        }
    }
}

function clearAll() {
    resultTxt.value = "0";
    actionTakenTxt.value = "";
    operator = null;
    isOperatorClicked = false;
    isDigitClicked = true;
    isEqualsClicked = false;
    numbers = [];
    counter = 0;
    decimalCounter = 0;
    fontSize = 16 * 4;
    resultTxt.style.fontSize = `${fontSize}px`;
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
            if (resultTxt.value == "BRUH") clearAll();

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
    if (resultTxt.value == "BRUH") clearAll();
    calculate(operator)
    updateActionTakenTxt(equalsBtn)
    isEqualsClicked = true;
}

function handleDecimalBtn() {
    if (isEqualsClicked) clearAll();
    decimalCounter++;
    if (decimalCounter < 2) updateResultTxt(decimalBtn.innerText);
}

function handleBackspaceBtn() {
    if (resultTxt.value.length < 2) return resultTxt.value = "0";

    let temp = resultTxt.value;
    temp = temp.slice(-1 * temp.length, -1);
    resultTxt.value = temp;
}

function handlePlusMinusBtn() {
    let temp = Number(resultTxt.value) * -1;
    resultTxt.value = temp;
}

function init() {
    digitsEventListener();
    operatorsEventListener();
    equalsBtn.addEventListener("click", handleEqualsBtn);
    decimalBtn.addEventListener("click", handleDecimalBtn);
    clearBtn.addEventListener("click", clearAll);
    backspaceBtn.addEventListener("click", handleBackspaceBtn);
    plusMinusBtn.addEventListener("click", handlePlusMinusBtn);
}

init();