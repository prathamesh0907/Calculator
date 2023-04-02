const calculator = {
  previousOperand: '',
  currentOperand: '',
  operation: undefined,
};

function clear() {
  calculator.currentOperand = '';
  calculator.previousOperand = '';
  calculator.operation = undefined;
}

function deleteNumber() {
  calculator.currentOperand = calculator.currentOperand.toString().slice(0, -1);
}

function appendNumber(number) {
  if (number === '.' && calculator.currentOperand.includes('.')) return;
  calculator.currentOperand = calculator.currentOperand.toString() + number.toString();
}

function chooseOperation(operation) {
  if (calculator.currentOperand === '') return;
  if (calculator.previousOperand !== '') {
    calculate();
  }
  calculator.operation = operation;
  calculator.previousOperand = calculator.currentOperand;
  calculator.currentOperand = '';
}

function calculate() {
  let result;
  const prev = parseFloat(calculator.previousOperand);
  const current = parseFloat(calculator.currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (calculator.operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '÷':
      result = prev / current;
      break;
    default:
      return;
  }
  calculator.currentOperand = result;
  calculator.operation = undefined;
  calculator.previousOperand = '';
}

function updateDisplay() {
  const currentOperandElement = document.querySelector('[data-current-operand]');
  const previousOperandElement = document.querySelector('[data-previous-operand]');
  currentOperandElement.innerText = calculator.currentOperand;
  if (calculator.operation != null) {
    previousOperandElement.innerText = `${calculator.previousOperand} ${calculator.operation}`;
  } else {
    previousOperandElement.innerText = '';
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

const operationButtons = document.querySelectorAll('[data-operation]');
operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    chooseOperation(button.innerText);
    updateDisplay();
  });
});

const equalsButton = document.querySelector('[data-equals]');
equalsButton.addEventListener('click', () => {
  calculate();
  updateDisplay();
});

const clearButton = document.querySelector('[data-all-clear]');
clearButton.addEventListener('click', () => {
  clear();
  updateDisplay();
});

const deleteButton = document.querySelector('[data-delete]');
deleteButton.addEventListener('click', () => {
  deleteNumber();
  updateDisplay();
});
