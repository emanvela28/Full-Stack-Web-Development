import React, { useState, useEffect } from "react";
import { Button, TextField, Grid, Container, Box } from "@mui/material";

const Calculator = () => {
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [waitingForNewInput, setWaitingForNewInput] = useState(false);
  const [lastOperator, setLastOperator] = useState(null);
  const [lastOperand, setLastOperand] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= "0" && e.key <= "9") {
        handleNumberClick(parseInt(e.key));
      } else if (e.key === ".") {
        handleDecimalClick();
      } else if (["+", "-", "*", "/"].includes(e.key)) {
        handleOperatorClick(e.key);
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleEqual();
      } else if (e.key === "Backspace") {
        handleBackspace();
      } else if (e.key === "Escape") {
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input, operator, previousValue, waitingForNewInput, lastOperator, lastOperand]);

  const handleNumberClick = (num) => {
    if (waitingForNewInput) {
      setInput(num.toString());
      setWaitingForNewInput(false);
    } else {
      setInput((prev) => (prev === "0" ? num.toString() : prev + num));
    }
  };

  const handleDecimalClick = () => {
    if (!input.includes(".")) {
      setInput((prev) => prev + ".");
      setWaitingForNewInput(false);
    }
  };

  const handleOperatorClick = (op) => {
    if (previousValue !== null && !waitingForNewInput) {
      handleEqual(); // Automatically calculate before applying the next operator
    }
    setOperator(op);
    setPreviousValue(input);
    setWaitingForNewInput(true);
  };

  const handleEqual = () => {
    let num1, num2;

    if (operator && previousValue !== null) {
      num1 = parseFloat(previousValue);
      num2 = parseFloat(input);
      setLastOperator(operator);
      setLastOperand(input);
    } else if (lastOperator && lastOperand !== null) {
      num1 = parseFloat(input);
      num2 = parseFloat(lastOperand);
    } else {
      return;
    }

    let result;
    switch (operator || lastOperator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num2 !== 0 ? num1 / num2 : "Error";
        break;
      default:
        return;
    }

    setInput(result.toString());
    setPreviousValue(null);
    setOperator(null); // Reset operator after pressing "="
    setWaitingForNewInput(true);
  };

  const handleBackspace = () => {
    setInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const handleClear = () => {
    setInput("0");
    setOperator(null);
    setPreviousValue(null);
    setLastOperator(null);
    setLastOperand(null);
    setWaitingForNewInput(false);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          textAlign: "center",
          mt: 5,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          backgroundColor: "#B3B3B3", // Background color
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <TextField
            fullWidth
            value={input}
            variant="outlined"
            sx={{ bgcolor: "white" }}
            InputProps={{ readOnly: true }}
          />
          <Button
            variant="contained"
            sx={{
              ml: 1,
              height: 56,
              backgroundColor: "#D0021B", // Red clear button
              color: "white",
              "&:hover": { backgroundColor: "#A00116" },
            }}
            onClick={handleClear}
          >
            C
          </Button>
        </Box>
        <Grid container spacing={1}>
          {[
            { label: "7", color: "#4A90E2" },
            { label: "8", color: "#4A90E2" },
            { label: "9", color: "#4A90E2" },
            { label: "/", color: "#7ED321" },
            { label: "4", color: "#4A90E2" },
            { label: "5", color: "#4A90E2" },
            { label: "6", color: "#4A90E2" },
            { label: "*", color: "#7ED321" },
            { label: "1", color: "#4A90E2" },
            { label: "2", color: "#4A90E2" },
            { label: "3", color: "#4A90E2" },
            { label: "-", color: "#7ED321" },
            { label: "0", color: "#4A90E2" },
            { label: ".", color: "#EAEAEA" },
            { label: "=", color: "#F5A623" },
            { label: "+", color: "#7ED321" },
          ].map((btn, index) => (
            <Grid item xs={3} key={index}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  height: 60,
                  fontSize: 20,
                  backgroundColor:
                    operator === btn.label ? "#5BAF2F" : btn.color, // Highlight selected operator
                  color: "black",
                  "&:hover": {
                    backgroundColor: btn.color,
                    filter: "brightness(90%)",
                  },
                }}
                onClick={() => {
                  if (!isNaN(btn.label)) {
                    handleNumberClick(parseInt(btn.label));
                  } else if (btn.label === ".") {
                    handleDecimalClick();
                  } else if (btn.label === "=") {
                    handleEqual();
                  } else {
                    handleOperatorClick(btn.label);
                  }
                }}
              >
                {btn.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Calculator;
