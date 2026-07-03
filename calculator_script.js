const output = document.getElementById('output');
const history = document.getElementById('history');
let currentInput = '0';
let resetDisplay = false;

function appendNumber(num) {
    if (currentInput === '0' || resetDisplay) {
        currentInput = num;
        resetDisplay = false;
    } else {
        if (num === '.' && currentInput.includes('.')) return;
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (resetDisplay) resetDisplay = false;
    const lastChar = currentInput.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + op;
    } else {
        currentInput += op;
    }
    updateDisplay();
}

function clearScreen() {
    currentInput = '0';
    history.innerText = '';
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate() {
    try {
        let expression = currentInput;
        history.innerText = expression + ' =';
        let result = eval(expression);
        currentInput = Number(result.toFixed(4)).toString();
        resetDisplay = true;
        updateDisplay();
    } catch (error) {
        output.innerText = 'Error';
        currentInput = '0';
    }
}

function updateDisplay() {
    output.innerText = currentInput.replace(/\*/g, '×').replace(/\//g, '÷');
}

// Keyboard Support (Bonus Feature)
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') appendNumber(e.key);
    if (['+', '-', '*', '/'].includes(e.key)) appendOperator(e.key);
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearScreen();
});