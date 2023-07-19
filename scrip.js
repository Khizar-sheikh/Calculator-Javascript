let firstExpr = '';
let secondExpr = '';
let currentOperation = null;
let shouldResetScreen = false;

const expression = document.querySelector("#expression");
const result = document.querySelector("#result");
const clearBtn = document.querySelector("#clearBtn");
const dltBtn = document.querySelector("#dltBtn");
const numberBTns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const pointBtn = document.querySelector("#pointBtn");
const equalBtn = document.querySelector("#equalBtn");

window.addEventListener('keydown', handleKeyboardInput);
equalBtn.addEventListener('click', calculate);
clearBtn.addEventListener('click', clear);
dltBtn.addEventListener('click', deleteNumber);
pointBtn.addEventListener('click', appendPoint);

operatorBtns.forEach(function(button) {
    button.addEventListener('click', function() {
        let operator = button.textContent;
        setOperator(operator);
    });
});

numberBTns.forEach(function(button) {
    button.addEventListener('click', function() {
        let number = button.textContent;
        appendNumber(number);
    });
});

function handleKeyboardInput(e) {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendPoint();
    if (e.key === '=' || e.key === 'Enter') calculate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clear();

    if (e.key === '+') setOperator('+');
    if (e.key === '-') setOperator('-');
    if (e.key === '/') setOperator('÷');
    if (e.key === '*') setOperator('*');
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
}

function deleteNumber() {
    result.textContent = result.textContent
        .toString()
        .slice(0, -1);
}

function clear() {
    result.textContent = '0';
    expression.textContent = '';
    firstExpr = '';
    secondExpr = '0';
    currentOperation = null;
}

function appendNumber(number) {
    if (result.textContent === '0' || shouldResetScreen) {
        resetScreen();
    }
    result.textContent += number;
}

function appendPoint() {
    if (shouldResetScreen) resetScreen();
    if (result.textContent === '') result.textContent = '0';
    if (result.textContent.includes('.')) return;
    result.textContent += '.';
}

function setOperator(operator) {
    if (currentOperation) {
        // An operator is already set, evaluate the previous expression
        calculate();
    }
    // Set the new operator and update the expression
    firstExpr = result.textContent;
    currentOperation = operator;
    expression.textContent = `${firstExpr} ${currentOperation}`;
    shouldResetScreen = true;
}

function calculate() {
    if (currentOperation === null || shouldResetScreen) {
        return;
    }
    if (currentOperation === '÷' && result.textContent === '0') {
        alert("You can't divide by 0!");
        return;
    }
    secondExpr = result.textContent;
    result.textContent = roundResult(
        operate(currentOperation, firstExpr, secondExpr)
    );
    expression.textContent = `${firstExpr} ${currentOperation} ${secondExpr} =`;
    currentOperation = null;
}

function resetScreen() {
    result.textContent = '';
    shouldResetScreen = false;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case '*':
            return multiply(a, b);
        case '÷':
            if (b === 0) return null;
            else return divide(a, b);
        default:
            return null;
    }
}
