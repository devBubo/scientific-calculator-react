import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DigitButton from "./components/DigitButton";
import OperatorButton from "./components/OperatorButton";
import { tan, cos, sin, pi, pow, log, abs, evaluate } from "mathjs";

function App() {
  let [inputtedValue, setInputtedValue] = useState("0");
  const [result, setResult] = useState("0");
  const [isOperatorSet, setIsOperatorSet] = useState(false);

  function onDigit(digit: string) {
    const newValue =
      inputtedValue.length < 15
        ? inputtedValue[0] === "0" && !inputtedValue.includes(".")
          ? digit
          : `${inputtedValue}${digit}`
        : inputtedValue;
    setInputtedValue(newValue);
  }

  function onDelete() {
    setInputtedValue(
      inputtedValue.length === 1
        ? "0"
        : inputtedValue.substring(0, inputtedValue.length - 1)
    );
  }

  function onReverseSign() {
    setInputtedValue(
      inputtedValue[0] === "-"
        ? inputtedValue.substring(1)
        : inputtedValue[0] !== "0"
        ? `-${inputtedValue}`
        : inputtedValue
    );
  }

  function onPeriod() {
    setInputtedValue(
      inputtedValue.includes(".") ? inputtedValue : `${inputtedValue}.`
    );
  }

  function onOperator(operator: string) {
    setIsOperatorSet(true);
    setInputtedValue(
      `${inputtedValue !== "0" ? inputtedValue : ""}${operator}`
    );
  }

  function onEquals() {
    if (!isOperatorSet) return;
    const expression = inputtedValue;
    const result = evaluate(normalizeMathExpression(expression));
    const shouldOutputZero = (num: number) => {
      return abs(num) < 0.0000000000001;
    };
    try {
      setResult(shouldOutputZero(result) ? 0 : result.toString());
    } catch {
      setResult("Error");
    }
    setIsOperatorSet(false);
  }

  function onClear() {
    setInputtedValue("0");
    setResult("0");
    setIsOperatorSet(false);
  }

  function normalizeMathExpression(expression: string) {
    expression = expression.replace(/π/g, "(pi)"); // Replaces pi symbol to pi, so that you can do calculations
    return expression;
  }

  return (
    <>
      <div
        key="calculator"
        className="container-fluid border border-5 rounded pt-3 pb-3"
      >
        <h1>
          React scientific calculator{" "}
          <img
            src="/src/assets/react-logo.svg"
            style={{ width: "10%" }}
            className="mb-2"
          ></img>
        </h1>

        <div key="calc-display" className="row">
          <p
            key="result"
            className="bg-secondary text-light text-end rounded pt-2 pb-2 h5"
          >
            {inputtedValue.substring(inputtedValue.length - 50)}
            <br></br>
            {result}
          </p>
        </div>

        <div className="row">
          <div className="col">
            <OperatorButton key="sin-btn" onClick={() => onOperator("sin(")}>
              sin
            </OperatorButton>
          </div>
          <div className="col">
            <OperatorButton key="cos-btn" onClick={() => onOperator("cos(")}>
              cos
            </OperatorButton>
          </div>
          <div className="col">
            <OperatorButton key="tan-btn" onClick={() => onOperator("tan(")}>
              tan
            </OperatorButton>
          </div>
          <div className="col">
            <OperatorButton key="pi-btn" onClick={() => onOperator("π")}>
              π
            </OperatorButton>
          </div>
          <div className="col">
            <OperatorButton
              className="btn-danger"
              key="clear-button"
              onClick={onClear}
            >
              C
            </OperatorButton>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <OperatorButton key="^-button" onClick={() => onOperator("^")}>
              ^
            </OperatorButton>
          </div>
          <div className="col">
            <OperatorButton key="ln-btn" onClick={() => onOperator("log(")}>
              log
            </OperatorButton>
          </div>
          <div className="col">
            <OperatorButton key="e-btn" onClick={() => onOperator("e")}>
              e
            </OperatorButton>
          </div>
          <div className="col">
            <OperatorButton key="factorial-btn" onClick={() => onOperator("!")}>
              n!
            </OperatorButton>
          </div>
          <div className="col">
            <OperatorButton
              key="factorial-btn"
              onClick={() => onOperator("abs(")}
            >
              |x|
            </OperatorButton>
          </div>
        </div>

        <div className="row">
          {["7", "8", "9"].map((digit) => (
            <div className="col">
              <DigitButton
                key={`${digit}-digit`}
                onClick={() => onDigit(digit)}
              >
                {digit}
              </DigitButton>
            </div>
          ))}

          <div className="col">
            <OperatorButton key="(-button" onClick={() => onOperator("(")}>
              (
            </OperatorButton>
          </div>
          <div className="col">
            <OperatorButton key=")-button" onClick={() => onOperator(")")}>
              )
            </OperatorButton>
          </div>
        </div>

        <div className="row">
          {["4", "5", "6"].map((digit) => (
            <div className="col">
              <DigitButton
                key={`${digit}-digit`}
                onClick={() => onDigit(digit)}
              >
                {digit}
              </DigitButton>
            </div>
          ))}
          <div className="col">
            <OperatorButton key="times-btn" onClick={() => onOperator("*")}>
              ×
            </OperatorButton>
          </div>
          <div className="col">
            <OperatorButton key="div-btn" onClick={() => onOperator("/")}>
              ÷
            </OperatorButton>
          </div>
        </div>

        <div className="row">
          {["1", "2", "3"].map((digit) => (
            <div className="col">
              <DigitButton
                key={`${digit}-digit`}
                onClick={() => onDigit(digit)}
              >
                {digit}
              </DigitButton>
            </div>
          ))}
          <div className="col">
            <OperatorButton key="plus-btn" onClick={() => onOperator("+")}>
              +
            </OperatorButton>
          </div>
          <div className="col">
            <OperatorButton key="minus-btn" onClick={() => onOperator("-")}>
              -
            </OperatorButton>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <DigitButton key="0-digit" onClick={() => onDigit("0")}>
              0
            </DigitButton>
          </div>
          <div className="col">
            <DigitButton key="point" onClick={onPeriod}>
              .
            </DigitButton>
          </div>
          <div className="col">
            <OperatorButton key="changeSign-btn" onClick={onReverseSign}>
              ±
            </OperatorButton>
          </div>
          <div className="col">
            <OperatorButton
              key="del-btn"
              onClick={onDelete}
              className="btn-warning"
            >
              DEL
            </OperatorButton>
          </div>
          <div className="col">
            <OperatorButton
              key="equals-btn"
              onClick={onEquals}
              className="btn-primary"
            >
              =
            </OperatorButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
