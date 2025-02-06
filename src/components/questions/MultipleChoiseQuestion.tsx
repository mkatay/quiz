import React, { useState } from "react";
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { DBQuestion } from "../../lib/appwrite";

export const MultipleChoiceQuestion = ({question}: {question: DBQuestion}) => {
  // const [selectedAnswers, setSelectedAnswers] = useState([]);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [correct,setCorrect]=useState(false)

  return (
    <FormGroup sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
      {question.options.map((option, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              // checked={selectedAnswers.includes(index)}
              // onChange={() => (index)}
            />
          }
          label={option}
        />
      ))}
    </FormGroup>
  );
};

