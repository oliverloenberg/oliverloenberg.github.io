//alert("Hi, is this alert working?");

//Basic mathematical functions

let add = (a, b) => a + b;

let subtract = (a, b) => a - b;

let multiply = (a, b) => a * b;

let divide = (a, b) => a / b;

let operate = (operator, val1, val2) => {
  let result = 0;
  switch (operator) {
    case "+":
      result = add(val1, val2);
      break;
    case "−":
      result = subtract(val1, val2);
      break;
    case "×":
      result = multiply(val1, val2);
      break;
    case "÷":
      result = divide(val1, val2);
      break;
    default:
      return `Woops something went wrong! 
    Operater is: ${operator}
    val1 is: ${val1}
    val2 is: ${val2}`;
  }
  if (!Number.isInteger(result)) {
    let fixedResult = result.toFixed(2);
    return fixedResult;
  }
  return result;
};

let buttonPressed = "";
let buttonPressedDisplay = "";
let operatorChosen = "";
let historyVals = [];
let historyValsDisplay = "";
let match = "";
let operationResult = 0;

//Grab all the buttons so we can put an event listener on them all
const buttons = document.querySelectorAll("button");
//Store the current input
const inputResult = document.querySelector(".input-result");
const inputHistory = document.querySelector(".input-history");

//Creating a regex to identify operators
let testRegex = /÷|×|−|\+| =/gim;

//Attach an event listener on them all iterating through the buttons array
buttons.forEach((button) => {
  buttonPressed = button.textContent;
  //Save the value attached to the button pressed to an array
  button.addEventListener("click", function saveNum() {
    buttonPressed = button.textContent;
    //if clear is pressed, then empty the array
    if (buttonPressed == "clear") {
      historyVals = [];
    }
    //if delete is pressed then remove the last entered value in the array
    else if (buttonPressed == "delete") {
      historyVals.pop();
    }
    //Test if there has already been pressed an operator and prevent it from being pushed to the array
    else if (
      (buttonPressed == "÷" ||
        buttonPressed == "×" ||
        buttonPressed == "−" ||
        buttonPressed == "+" ||
        buttonPressed == "=") &&
      testRegex.test(inputResult.textContent)
    ) {
      console.log("There is already an operator!");
    } else {
      historyVals.push(buttonPressed);
    }
  });
  //Display the pressed value
  button.addEventListener("click", function displayNum() {
    //buttonPressed = button.textContent;
    //Clear the display
    if (buttonPressed == "clear") {
      console.log(`This is currently ${historyValsDisplay}`);
      inputResult.textContent = "0";
      inputHistory.textContent = "0";
    }
    //Remove the last entry from the display
    else if (buttonPressed == "delete") {
      console.log("Delete is pressed");
      inputResult.textContent = historyVals.join("");
      inputHistory.textContent = historyVals.join("");
    }
    //If the input-result only contains = then just display 0
    else if (buttonPressed == "=") {
      inputHistory.textContent += " =";
    }
    //Add the latest pressed entry to the display
    else {
      inputResult.textContent = historyVals.join("");
      inputHistory.textContent = historyVals.join("");
    }

    //WE ONLY NEED TO SHOW THE HISTORY OF THE OPERATIONS, CHECK CALCULATOR PROGRAM ON WINDOWS
  });

  button.addEventListener("click", function performCalc() {
    //Search the input-result for an operator and save that in a variable
    if (buttonPressed == "=") {
      match = inputResult.textContent.match(/÷|×|−|\+| =/g);
      //console.log(match);
      let operatorToPass = match[0];

      //Find the index where the operator is in the historyVals array
      let locOfOperator = historyVals.indexOf(operatorToPass);
      console.log(`Location of in historyVal array: ${locOfOperator}`);
      //Store all the numbers before the operator in a variable
      let numsBeforeOperator = "";
      for (let i = 0; i <= locOfOperator - 1; i++) {
        numsBeforeOperator += historyVals[i];
      }
      console.log(`NumsBeforeOperator: ${numsBeforeOperator}`);
      //Store all the numbers after the operator in a variable
      let numsAfterOperator = "";
      for (let i = locOfOperator + 1; i <= historyVals.length - 1; i++) {
        numsAfterOperator += historyVals[i];
      }
      console.log(`NumsAfterOperator: ${numsAfterOperator}`);
      //Call the operation and pass everything before the operator as val1 and everything after the operator as val2, and pass the operator
      operationResult = operate(
        operatorToPass,
        Number(numsBeforeOperator),
        Number(numsAfterOperator)
      );
      //Put the result into the historyVals array as a string
      historyVals = [operationResult.toString()];
      //Change the display to show the result of the calc, and make it a string
      if (operationResult == "Infinity") {
        inputResult.textContent = "Dividing by Zero are we?";
        historyVals = [0];
      } else {
        inputResult.textContent = operationResult.toString();
      }

      console.log(match);
      console.log(operatorToPass);
      console.log(operationResult);
      //operate();
    }
  });

  //button.addEventListener("click", function () {});
});

//console.log(divide(6, 2));
//console.log(operate("divide", 6, 3));
