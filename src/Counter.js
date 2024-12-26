import React, { useState, useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      // Start the timer
      timer = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);
    }

    // Cleanup timer on stop or unmount
    return () => {
      clearInterval(timer);
    };
  }, [isRunning]); // Depend on `isRunning` to start/stop the timer

  const handleStartStop = () => {
    setIsRunning((prev) => !prev); // Toggle timer state
  };

  const handleReset = () => {
    setCount(0); // Reset the counter
    setIsRunning(false); // Stop the timer
  };

  return (
    <div style={styles.container}>
      <h1>Counter: {count}</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleStartStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button style={styles.button} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    gap: "16px",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Counter;