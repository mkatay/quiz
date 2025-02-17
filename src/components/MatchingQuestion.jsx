import React, { useState } from "react";
import {  Container,  Typography,  Paper,  Select,  MenuItem,  Button,  Grid2,} from "@mui/material";
import { matching } from "../utils";
import CheckIcon from '@mui/icons-material/Check';
import { useEffect } from "react";

export const MatchingQuestion = ({ questionData ,questionIndex,setHit}) => {
  const [answers, setAnswers] = useState(
    Array(questionData.options.length).fill("") // Kezdetben üres válaszok
  );
  const [correct,setCorrect]=useState(false)
 const [isSubmitted, setIsSubmitted] = useState(false);

 useEffect(()=>{
  setCorrect(false)
  setIsSubmitted(false)
  setAnswers(Array(questionData.options.length).fill(""))
 },[questionData])

  const handleSelectChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };
console.log(answers);

  const handleSubmit = () => {
    if (isSubmitted) return; 
    if(matching(questionData,answers)){
      setHit((prev) => ++prev);
      setCorrect(true)
    }
      setIsSubmitted(true);
  };

  return (
    <>
    <Container style={{ maxWidth: "800px", marginTop: "20px", overflow: "hidden",padding:'5px' }}>
  <Typography variant="h6" gutterBottom>
    {questionIndex}.{questionData.question}
  </Typography>
  <Grid2 container spacing={2} sx={{ display: "flex", flexWrap: "wrap",justifyContent:'center' }}>
    {questionData.options.map((option, index) => (
      <Grid2
        xs={12}
        sm={6}
        key={`option-${index}`}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Paper style={{ padding: "10px", flexGrow: 1 }} sx={{display:'flex',flexDirection:'column',maxWidth:'270px'}}>
          <Typography variant="body1">{option}</Typography>
          <Select
            fullWidth
            value={answers[index]}
            onChange={(e) => handleSelectChange(index, e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Válassz egyet
            </MenuItem>
            {questionData.matches.map((match, matchIndex) => (
              <MenuItem key={`match-${matchIndex}`} value={matchIndex}  
              sx={{
                borderBottom: '1px solid lightgray',
                maxWidth: '300px',
                display: 'block',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }} >
                {match}
              </MenuItem>
            ))}
          </Select>
        </Paper>
      </Grid2>
    ))}
  </Grid2>
  <div style={{display:'flex',justifyContent:'center',gap:'5px'}}>
    <Button variant="contained" color="primary"  sx={{ marginTop: "20px" }}
      onClick={handleSubmit}
      disabled={isSubmitted}>
    Save
    </Button>
    {correct && <CheckIcon sx={{color:'green',marginTop: "20px"}}/>}
  </div>
  
</Container>
</>
  );
};


