import React, { useState } from "react";
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
import { multiple_choice } from "../utils";
import CheckIcon from '@mui/icons-material/Check';

export const MultipleChoiceQuestion = ({ questionData,questionIndex,setHit }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correct,setCorrect]=useState(false)

  const handleCheckboxChange = (optionIndex) => {
    setSelectedAnswers((prevSelected) =>
      prevSelected.includes(optionIndex)
        ? prevSelected.filter((item) => item !== optionIndex)
        : [...prevSelected, optionIndex]
    );
  };

  const handleSubmit = () => {
    if (isSubmitted) return; 
    if(multiple_choice(questionData,selectedAnswers)){
      setHit((prev) => ++prev);
      setCorrect(true)
    } 
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
      <div style={{display:'flex',gap:'5px',justifyContent:'center'}}>
        <Button variant="contained" color="primary" onClick={handleSubmit} 
            disabled={isSubmitted}
            style={{ marginTop: "20px" }}>
          Save
        </Button>
        {correct && <CheckIcon sx={{color:'green',marginTop: "20px"}}/>}
      </div>  
    </Box>
  );
};

