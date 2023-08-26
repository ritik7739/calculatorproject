var buttons = document.getElementsByClassName("button");
var display = document.getElementById("display");

var operand1 = 0;
var operand2 = null;
var operator = null;

function isOperator(value) {
    return value == "+" || value == "-" || value == "*" || value == "/";
}

function updateDisplay(value) {
    display.textContent = value;
}

function performCalculation() {
    operand2 = parseFloat(display.textContent);
    if (operator !== null) {
        var result = eval(operand1 + ' ' + operator + ' ' + operand2);
        if (!isNaN(result)) {
            updateDisplay(result);
            operand1 = result;
            operand2 = null;
            operator = null;
        }
    }
}

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        var value = this.getAttribute('data-value');
        var text = display.textContent.trim();

        if (isOperator(value)) {
            operator = value;
            operand1 = parseFloat(text);
            updateDisplay("");
        } else if (value == "ac") {
            operand1 = 0;
            operand2 = null;
            operator = null;
            updateDisplay("");
        } else if (value == "sign") {
            operand1 = parseFloat(text);
            operand1 = -1 * operand1;
            updateDisplay(operand1);
        } else if (value == ".") {
            if (text.length && !text.includes('.')) {
                updateDisplay(text + '.');
            }
        } else if (value == "%") {
            operand1 = parseFloat(text);
            operand1 = operand1 / 100;
            updateDisplay(operand1);
        } else if (value == "=") {
            performCalculation();
        } else {
            updateDisplay(text + value);
        }
    });
}

document.addEventListener('keydown', function (event) {
    var key = event.key;
    if (!isNaN(key) || key === "." || key === "+" || key === "-" || key === "*" || key === "/" || key === "%" || key === "=" || key === "Enter") {
        event.preventDefault(); // Prevent default key behavior
        var keyElement = document.querySelector(`[data-value="${key}"]`);
        if (keyElement) {
            keyElement.click(); // Simulate click event
        }
    }
});

document.addEventListener('keyup', function (event) {
    var key = event.key;
    if (key === "Escape") {
        document.querySelector('[data-value="ac"]').click();
    }
});
