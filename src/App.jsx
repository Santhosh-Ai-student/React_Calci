
import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNumber, setWaitingForNumber] = useState(false);

  const handleNumber = (num) => {
    if (display === "Error") {
      setDisplay(num);
      setFirstNumber(null);
      setOperator(null);
      setWaitingForNumber(false);
      return;
    }

    if (waitingForNumber) {
      setDisplay(num);
      setWaitingForNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForNumber || display === "Error") {
      setDisplay("0.");
      setWaitingForNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = (op) => {
    if (display === "Error") return;

    if (operator && !waitingForNumber) {
      calculate();
    } else {
      setFirstNumber(Number(display));
    }

    setOperator(op);
    setWaitingForNumber(true);
  };

  const calculate = () => {
    if (firstNumber === null || operator === null) return;

    const secondNumber = Number(display);
    let result;

    switch (operator) {
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
        result = secondNumber === 0 ? "Error" : firstNumber / secondNumber;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setFirstNumber(null);
    setOperator(null);
    setWaitingForNumber(true);
  };

  const clear = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setWaitingForNumber(false);
  };

  const deleteLast = () => {
    if (waitingForNumber || display === "Error") return;

    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  return (
    <div className="container">
      <div className="calculator">
        <h2>Calculator</h2>

        <div className="display">{display}</div>

        <div className="buttons">
          <button onClick={clear} className="special">AC</button>
          <button onClick={deleteLast} className="special">DEL</button>
          <button onClick={() => handleOperator("/")} className="operator">÷</button>
          <button onClick={() => handleOperator("*")} className="operator">×</button>

          <button onClick={() => handleNumber("7")}>7</button>
          <button onClick={() => handleNumber("8")}>8</button>
          <button onClick={() => handleNumber("9")}>9</button>
          <button onClick={() => handleOperator("-")} className="operator">−</button>

          <button onClick={() => handleNumber("4")}>4</button>
          <button onClick={() => handleNumber("5")}>5</button>
          <button onClick={() => handleNumber("6")}>6</button>
          <button onClick={() => handleOperator("+")} className="operator">+</button>

          <button onClick={() => handleNumber("1")}>1</button>
          <button onClick={() => handleNumber("2")}>2</button>
          <button onClick={() => handleNumber("3")}>3</button>
          <button onClick={calculate} className="equal">=</button>

          <button onClick={() => handleNumber("0")} className="zero">0</button>
          <button onClick={handleDecimal}>.</button>
        </div>
      </div>
    </div>
  );
}

export default App;
