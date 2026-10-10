const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let currentInput = "";
let previousInput = "";
let operator = null;
let shouldResetDisplay = false;



function updateDisplay() {

    if (currentInput === "") {
        display.value = "0";
    } else {
        display.value = currentInput;
    }

}



function addNumber(number) {

    if (shouldResetDisplay) {
        currentInput = "";
        shouldResetDisplay = false;
    }

    if (number === "." && currentInput.includes(".")) {
        return;
    }

    if (currentInput === "0" && number !== ".") {
        currentInput = number;
    } else {
        currentInput += number;
    }

    updateDisplay();
}



function chooseOperator(selectedOperator) {

    if (currentInput === "" && previousInput === "") {
        return;
    }

    if (previousInput !== "" && currentInput !== "") {
        calculate();
    }

    operator = selectedOperator;
    previousInput = currentInput;
    currentInput = "";

}



function calculate() {

    if (
        previousInput === "" ||
        currentInput === "" ||
        operator === null
    ) {
        return;
    }

    const previous = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    let result;

    switch (operator) {

        case "+":
            result = previous + current;
            break;

        case "-":
            result = previous - current;
            break;

        case "*":
            result = previous * current;
            break;

        case "/":

            if (current === 0) {
                display.value = "Cannot divide by 0";

                currentInput = "";
                previousInput = "";
                operator = null;

                return;
            }

            result = previous / current;
            break;
    }

    currentInput = String(
        Math.round(result * 100000000) / 100000000
    );

    previousInput = "";
    operator = null;
    shouldResetDisplay = true;

    updateDisplay();
}



function clearCalculator() {

    currentInput = "";
    previousInput = "";
    operator = null;
    shouldResetDisplay = false;

    updateDisplay();
}



function backspace() {

    if (shouldResetDisplay) {
        return;
    }

    currentInput = currentInput.slice(0, -1);

    updateDisplay();
}



function percentage() {

    if (currentInput === "") {
        return;
    }

    currentInput = String(parseFloat(currentInput) / 100);

    updateDisplay();
}



buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.dataset.value;

        if (!isNaN(value)) {
            addNumber(value);
        }

        else if (value === ".") {
            addNumber(value);
        }

        else if (
            value === "+" ||
            value === "-" ||
            value === "*" ||
            value === "/"
        ) {
            chooseOperator(value);
        }

        else if (value === "=") {
            calculate();
        }

        else if (value === "C") {
            clearCalculator();
        }

        else if (value === "backspace") {
            backspace();
        }

        else if (value === "%") {
            percentage();
        }

    });

});



document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (!isNaN(key)) {
        addNumber(key);
    }

    else if (key === ".") {
        addNumber(".");
    }

    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {
        chooseOperator(key);
    }

    else if (key === "Enter" || key === "=") {
        calculate();
    }

    else if (key === "Escape") {
        clearCalculator();
    }

    else if (key === "Backspace") {
        backspace();
    }

    else if (key === "%") {
        percentage();
    }

});