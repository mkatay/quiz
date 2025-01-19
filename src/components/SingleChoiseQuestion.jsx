import React, { useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { single_choice } from "../utils";
import CheckIcon from '@mui/icons-material/Check';

export const SingleChoiceQuestion = ({ questionData,questionIndex,setHit}) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // Új állapot a gomb letiltásához
  const [correct,setCorrect]=useState(false)

  useEffect(() => {
    // Kérdés váltásakor alaphelyzetbe állítjuk az állapotot
    setSelectedAnswer("");
    setIsSubmitted(false); 
  }, [questionData]);

  console.log('single_choice komponensben');
  const handleRadioChange = (event) => {
    if(isSubmitted) return
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (isSubmitted) return; 
    if(single_choice(questionData,selectedAnswer)){
      setHit((prev) => ++prev);
      setCorrect(true)
    } 
    setIsSubmitted(true);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography variant="h6" gutterBottom>
        {questionIndex}.{questionData.question}
      </Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Válaszlehetőségek</FormLabel>
        <RadioGroup value={selectedAnswer} onChange={handleRadioChange}  >
          {questionData.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={String(index)} // Az indexet stringként tároljuk a könnyebb azonosításért
              control={<Radio />}
              label={<span style={{ whiteSpace: "pre-line" }}>{option}</span>} // A megfelelő HTML megjelenítéséhez
            />
          ))}
        </RadioGroup>
      </FormControl>
      <div style={{display:'flex',gap:'5px',alignItems:'center'}}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: "20px",display:'block' }}
        disabled={isSubmitted || selectedAnswer === ""} // A gomb letiltása, ha már egyszer kattintottak
      >
        save
      </Button>
      {correct && <CheckIcon sx={{color:'green',marginTop: "20px"}}/>}
      </div>
    </Container>
  );
};
