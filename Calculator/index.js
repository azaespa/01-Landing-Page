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

    if (resultTxt.scrollWidth > resultTxt.clientWidth) {
        while (resultTxt.scrollWidth > resultTxt.clientWidth) {
            fontSize -= 8;
            resultTxt.style.fontSize = `${fontSize}px`;
        }
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
            handleDigits(element);
        }));
}

function handleDigits(element) {
    if (isEqualsClicked) clearAll();
    updateResultTxt(element.innerText);
}

function operatorsEventListener() {
    operators.map(element => 
        element.addEventListener("click", () => {
            handleOperators(element);
        }))
}

function handleOperators(element) {
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

    if (fontSize < (16 * 4)) {
        fontSize += 8;
        resultTxt.style.fontSize = `${fontSize}px`;
    }
}

function handlePlusMinusBtn() {
    let temp = Number(resultTxt.value) * -1;
    resultTxt.value = temp;
}

function handleKeyboard(e) {
    const key = e.keyCode;

    if (!e.shiftKey) {
        switch(key) {
            // ESC
            case 27:
                clearAll();
                break;
            // BACKSPACE
            case 8:
                handleBackspaceBtn();
                break;
            // 1
            case 49:
            case 97:
                handleDigits(document.getElementById("one-btn"));
                break;
            // 2
            case 50:
            case 98:
                handleDigits(document.getElementById("two-btn"));
                break;
            // 3
            case 51:
            case 99:
                handleDigits(document.getElementById("three-btn"));
                break;
            // 4
            case 52:
            case 100:
                handleDigits(document.getElementById("four-btn"));
                break;
            // 5
            case 53:
            case 101:
                handleDigits(document.getElementById("five-btn"));
                break;
            // 6
            case 54:
            case 102:
                handleDigits(document.getElementById("six-btn"));
                break;    
            // 7
            case 55:
            case 103:
                handleDigits(document.getElementById("seven-btn"));
                break;
            // 8
            case 56:
            case 104:
                handleDigits(document.getElementById("eight-btn"));
                break;
            // 9
            case 57:
            case 105:
                handleDigits(document.getElementById("nine-btn"));
                break;
            // *
            case 106:
                handleOperators(document.getElementById("mul")); 
                break;
            // +
            case 107:
                handleOperators(document.getElementById("add"));
                break;    
            // -
            case 109:
            case 189:
                handleOperators(document.getElementById("sub")); 
                break;
            // /
            case 111:
            case 191:
                handleOperators(document.getElementById("mul")); 
                break;

            // =
            case 13:
            case 187:
                handleEqualsBtn(); 
                break;
        }
    } else if (e.shiftKey) {
        switch(key) {
            // Shift +
            case 187:
                handleOperators(document.getElementById("add"));
                break;
            // Shift *
            case 56:
                handleOperators(document.getElementById("mul")); 
                break;
        }
    }
}

function init() {
    digitsEventListener();
    operatorsEventListener();
    equalsBtn.addEventListener("click", handleEqualsBtn);
    decimalBtn.addEventListener("click", handleDecimalBtn);
    clearBtn.addEventListener("click", clearAll);
    backspaceBtn.addEventListener("click", handleBackspaceBtn);
    plusMinusBtn.addEventListener("click", handlePlusMinusBtn);
    document.addEventListener("keydown", handleKeyboard);
}

init();