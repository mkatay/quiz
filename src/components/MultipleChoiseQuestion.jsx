import React, { useState } from "react";
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
import { multiple_choice } from "../utils";

export const MultipleChoiceQuestion = ({ questionData,questionIndex,setHit }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCheckboxChange = (optionIndex) => {
    setSelectedAnswers((prevSelected) =>
      prevSelected.includes(optionIndex)
        ? prevSelected.filter((item) => item !== optionIndex)
        : [...prevSelected, optionIndex]
    );
  };

  const handleSubmit = () => {
    if (isSubmitted) return; 
        multiple_choice(questionData,selectedAnswers) && setHit((prev) => ++prev);
        setIsSubmitted(true);
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
      <Button variant="contained" color="primary" onClick={handleSubmit} 
          disabled={isSubmitted}
          style={{ marginTop: "20px" }}>
        Save
      </Button>
    </Box>
  );
};

