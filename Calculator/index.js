const actionTakenTxt = document.getElementById("action-taken-txt");
const resultTxt = document.getElementById("result-txt");
const digitElements = document.getElementsByClassName("digits");
const operatorElements = document.getElementsByClassName("operators");
const equalsBtn = document.getElementById("equals");

const digits = [...digitElements];
const operators = [...operatorElements];

let isOperatorClicked = false;
let isDigitClicked = true;

let numbers = [];
let addend = null;
let operator = null;

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

    if (Number(resultTxt.value) == 0) {
        resultTxt.value = "";
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
    } 
}

function calculate(operatorId) {

    if (numbers.length == 1) numbers.push(Number(resultTxt.value));

    let firstNumber = numbers[0];
    let secondNumber = numbers[1];

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

    console.log(numbers)

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
            if (isDigitClicked) {
                numbers.push(Number(resultTxt.value));
                
                if (numbers.length > 2) numbers.shift();
                
                operate(operator);
            }

            isOperatorClicked = true;
            isDigitClicked = false;
            operator = element.id;
            updateActionTakenTxt(element);
        }))
}

function handleEqualsBtn() {
    calculate(operator)
    updateActionTakenTxt(equalsBtn)
}

function init() {
    digitsEventListener();
    operatorsEventListener();
    equalsBtn.addEventListener("click", handleEqualsBtn);
}

init();