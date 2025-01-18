import React, { useState } from "react";
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";

export const MultipleChoiceQuestion = ({ questionData,questionIndex }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleCheckboxChange = (optionIndex) => {
    setSelectedAnswers((prevSelected) =>
      prevSelected.includes(optionIndex)
        ? prevSelected.filter((item) => item !== optionIndex)
        : [...prevSelected, optionIndex]
    );
  };

  const handleSubmit = () => {
    alert(`Selected answers: ${JSON.stringify(selectedAnswers)}`);
  };

  return (
    <Box  >
      <Typography variant="h6" gutterBottom>
        {questionIndex}.{questionData.question}
      </Typography>
      <FormGroup>
        {questionData.options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selectedAnswers.includes(index)}
                onChange={() => handleCheckboxChange(index)}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: "20px" }}>
        Submit
      </Button>
    </Box>
  );
};

