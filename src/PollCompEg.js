import React, { useState } from "react";

const Poll = ({ poll }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState(poll.options);

  // Handle option selection
  const handleOptionChange = (optionId) => {
    if (poll.isMultiple) {
      // For multiple voting
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
      } else {
        setSelectedOptions([...selectedOptions, optionId]);
      }
    } else {
      // For single voting
      setSelectedOptions([optionId]);
    }
  };

  // Submit vote
  const handleVote = () => {
    const updatedOptions = options.map((option) => {
      if (selectedOptions.includes(option.id)) {
        return { ...option, votes: option.votes + 1 };
      }
      return option;
    });
    setOptions(updatedOptions);
    setSelectedOptions([]); // Reset selections after voting
  };

  // Remove vote
  const handleRemoveVote = () => {
    const updatedOptions = options.map((option) => {
      if (selectedOptions.includes(option.id)) {
        return { ...option, votes: option.votes - 1 };
      }
      return option;
    });
    setOptions(updatedOptions);
    setSelectedOptions([]);
  };

  // Calculate total votes
  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>{poll.question}</h3>
      <div>
        {options.map((option) => (
          <div key={option.id} style={{ marginBottom: "10px" }}>
            <label>
              <input
                type={poll.isMultiple ? "checkbox" : "radio"}
                name="pollOption"
                value={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleOptionChange(option.id)}
              />
              {option.title}
            </label>
            <div
              style={{
                height: "10px",
                background: "#ddd",
                borderRadius: "4px",
                marginTop: "5px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${((option.votes / totalVotes) * 100).toFixed(2)}%`,
                  background: "#4caf50",
                  height: "100%",
                }}
              ></div>
            </div>
            <small>{option.votes} votes ({((option.votes / totalVotes) * 100).toFixed(2)}%)</small>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleVote} disabled={selectedOptions.length === 0} style={{ marginRight: "10px" }}>
          Submit Vote
        </button>
        <button onClick={handleRemoveVote} disabled={selectedOptions.length === 0}>
          Remove Vote
        </button>
      </div>
    </div>
  );
};

export default Poll;

// Poll data structure
const pollData = {
    id: 1,
    question: "Best YT Channel to learn Frontend?",
    isMultiple: false, // Support for single or multiple voting
    options: [
      { id: 1, title: "Roadside Coder", votes: 11 },
      { id: 2, title: "Algo Agarwal", votes: 6 },
      { id: 3, title: "All the Above", votes: 6 },
    ],
  };





  import React from "react";
import Poll from "./Poll";

const App = () => {
  const pollData = {
    id: 1,
    question: "Best YT Channel to learn Frontend?",
    isMultiple: false, // Set to true for multiple selection
    options: [
      { id: 1, title: "Roadside Coder", votes: 11 },
      { id: 2, title: "Algo Agarwal", votes: 6 },
      { id: 3, title: "All the Above", votes: 6 },
    ],
  };

  return (
    <div>
      <Poll poll={pollData} />
    </div>
  );
};

export default App;