let currentInput = "";
let firstNumber = null;
let secondNumber = null;
let currentOperation = null;
let shouldResetScreen = false;
let lastOperation = null;  
let lastSecondNumber = null;  

// Function to append number input
function appendNumber(number) {
    if (shouldResetScreen) {
        currentInput = "";
        shouldResetScreen = false;
        clearOperatorHighlight();  // Remove highlight when a number is pressed
    }
    currentInput += number;
    updateOutput();
}

// Function to append a decimal point
function appendDecimal() {
    if (!currentInput.includes(".")) {
        currentInput += ".";
        updateOutput();
    }
}

// Function to handle arithmetic operations
function setOperation(operation) {
    if (currentInput === "" && firstNumber === null) return;

    if (firstNumber !== null && !shouldResetScreen) {
        calculateResult();  // Perform previous operation first
    }

    firstNumber = parseFloat(currentInput);
    currentOperation = operation;
    shouldResetScreen = true;
    highlightOperator(operation);
}

// Function to perform calculations
function calculateResult() {
    if (currentOperation === null) {
        // If equals is pressed again, repeat the last operation correctly
        if (lastOperation !== null) {
            firstNumber = parseFloat(currentInput);
            currentOperation = lastOperation;
            secondNumber = lastSecondNumber;
        } else {
            return; // No operation to repeat
        }
    } else {
        secondNumber = parseFloat(currentInput);
        lastOperation = currentOperation; // Store the last used operation
        lastSecondNumber = secondNumber; // Store the last second number
    }

    let result;
    switch (currentOperation) {
        case "+":
            result = firstNumber + secondNumber;
            break;
        case "-":
            result = firstNumber - secondNumber;
            break;
        case "*":
            result = firstNumber * secondNumber;
            break;
        case "/":
            result = secondNumber !== 0 ? firstNumber / secondNumber : "Error";
            break;
        default:
            return;
    }

    currentInput = result.toString();
    firstNumber = result; // Keep the result for next calculation
    currentOperation = null; // Reset operation to allow repeat
    shouldResetScreen = true;
    updateOutput();
    clearOperatorHighlight();  // Remove highlight after calculation
}

// Function to clear the calculator
function clearCalculator() {
    currentInput = "";
    firstNumber = null;
    secondNumber = null;
    currentOperation = null;
    lastOperation = null;
    lastSecondNumber = null;
    shouldResetScreen = false;
    updateOutput();
    clearOperatorHighlight();  // Remove highlight when clearing
}

// Function to update the output field
function updateOutput() {
    document.getElementById("output").value = currentInput;
}

// Function to highlight the selected operator
function highlightOperator(operation) {
    clearOperatorHighlight(); // Remove highlight from all operators

    let operatorButtons = {
        "+": document.querySelector('button[onclick="setOperation(\'+\')"]'),
        "-": document.querySelector('button[onclick="setOperation(\'-\')"]'),
        "*": document.querySelector('button[onclick="setOperation(\'*\')"]'),
        "/": document.querySelector('button[onclick="setOperation(\'/\')"]'),
    };

    if (operatorButtons[operation]) {
        operatorButtons[operation].classList.add("active");
    }
}

// Function to clear any highlighted operator
function clearOperatorHighlight() {
    document.querySelectorAll(".operator").forEach(button => {
        button.classList.remove("active");
    });
}
