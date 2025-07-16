const btnPeriod = document.querySelector(".btn-period");
const digits = document.querySelectorAll(".digit");

const del = document.querySelector(".btn-del");
const display = document.querySelector(".display");
const allClear = document.querySelector(".btn-ac");

const btnOperators = document.querySelectorAll(".btn-operator");
const btnEquals = document.querySelector(".btn-equals");

let leftOperand,
  rightOperand,
  operator,
  result,
  multipleOperatorExists = false,
  isFloat = false;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  isFloat = true;
  return a / b;
}

function operate(operator, leftOperand, rightOperand) {
  let ans;

  switch (operator) {
    case "+":
      ans = add(leftOperand, rightOperand);
      break;
    case "-":
      ans = subtract(leftOperand, rightOperand);
      break;
    case "*":
      ans = multiply(leftOperand, rightOperand);
      break;
    case "/":
      if (rightOperand != 0) {
        ans = divide(leftOperand, rightOperand);
      } else {
        alert("You cannot divide with zero!");
        resetValues();
        ans = 0;
      }
  }

  return ans;
}

function sendToDisplay(displayText) {
  if (displayText.length <= 13) {
    display.textContent += displayText;
  } else {
    display.textContent = Number.parseFloat(displayText).toExponential(3);
  }
}

function resetValues() {
  leftOperand = undefined;
  rightOperand = undefined;
  operator = undefined;
  result = undefined;
  isFloat = false;
  multipleOperatorExists = false;
}

function getResult() {
  rightOperand = parseFloat(display.textContent);
  return parseFloat(operate(operator, leftOperand, rightOperand).toFixed(3));
}

function clearDisplay() {
  display.textContent = "";
}

digits.forEach((button) => {
  button.addEventListener("click", () => {
    if (display.textContent === "0" || multipleOperatorExists) {
      clearDisplay();
      multipleOperatorExists = false;
    }

    if (display.textContent.length < 13) {
      sendToDisplay(button.textContent);
    }
  });
});

btnPeriod.addEventListener("click", () => {
  if (!display.textContent.includes(".")) {
    if (display.textContent === "") {
      sendToDisplay("0.");
    } else {
      sendToDisplay(btnPeriod.textContent);
    }
  }
});

allClear.addEventListener("click", () => {
  resetValues();
  clearDisplay();
});

del.addEventListener("click", () => {
  display.textContent = display.textContent.slice(0, -1); //Clear the last number
});

btnOperators.forEach((button) => {
  button.addEventListener("click", () => {
    if (
      leftOperand === undefined &&
      operator === undefined &&
      display.textContent !== ""
    ) {
      leftOperand = parseFloat(display.textContent);
      operator = button.textContent;
      clearDisplay();
    } else if (
      leftOperand !== undefined &&
      operator !== undefined &&
      display.textContent !== "" &&
      !multipleOperatorExists
    ) {
      multipleOperatorExists = true;
      result = getResult();
      clearDisplay();
      sendToDisplay(String(result));
      leftOperand = result;
      operator = button.textContent;
    } else if (
      leftOperand !== undefined &&
      operator !== undefined &&
      (parseFloat(display.textContent) == result || display.textContent === "")
    ) {
      operator = button.textContent;
    }
  });
});

btnEquals.addEventListener("click", () => {
  if (
    leftOperand != undefined &&
    operator != undefined &&
    display.textContent !== ""
  ) {
    result = getResult();
    clearDisplay();
    sendToDisplay(String(result));
    console.log(`${leftOperand} ${operator} ${rightOperand} = ${result}`);
    resetValues();
  }
});

let clickEvent = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
});

window.addEventListener("keydown", function (e) {
    let btn;
    e.preventDefault();
  switch (e.key) {
    case "0":
      btn = document.querySelector(".btn-0");
      break;
    case "1":
      btn = document.querySelector(".btn-1");
      break;
    case "2":
      btn = document.querySelector(".btn-2");
      break;
    case "3":
      btn = document.querySelector(".btn-3");
      break;
    case "4":
      btn = document.querySelector(".btn-4");
      break;
    case "5":
      btn = document.querySelector(".btn-5");
      break;
    case "6":
      btn = document.querySelector(".btn-6");
      break;
    case "7":
      btn = document.querySelector(".btn-7");
      break;
    case "8":
      btn = document.querySelector(".btn-8");
      break;
    case "9":
      btn = document.querySelector(".btn-9");
      break;
    case "+":
      btn = document.querySelector(".btn-add");
      break;
    case "-":
      btn = document.querySelector(".btn-subtract");
      break;
    case "*":
      btn = document.querySelector(".btn-multiply");
      break;
    case "/":
      btn = document.querySelector(".btn-divide");
      break;
    case "Enter":
      btn = document.querySelector(".btn-equals");
      break;
    case "Backspace":
      btn = document.querySelector(".btn-del");
      break;
    case ".":
      btn = document.querySelector(".btn-period");
      break;
    case "Tab":
      btn = document.querySelector(".btn-ac");
      break;
  }
  if (btn) {
    btn.dispatchEvent(clickEvent);
  }
});
