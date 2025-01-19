import React, { useState } from "react";
import {  Container,  Typography,  Paper,  Select,  MenuItem,  Button,  Grid2,} from "@mui/material";
import { matching } from "../utils";

export const MatchingQuestion = ({ questionData ,questionIndex,setHit}) => {
  const [answers, setAnswers] = useState(
    Array(questionData.options.length).fill("") // Kezdetben üres válaszok
  );
 const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };
console.log(answers);

  const handleSubmit = () => {
    if (isSubmitted) return; 
      matching(questionData,answers) && setHit((prev) => ++prev);
      setIsSubmitted(true);

        /* const updateAnswer=answers.find(obj=>obj.o==index)
    if(updateAnswer) setAnswers(prev=>prev.forEach(obj=>{if(obj.o==index) obj.q=value}))
    else setAnswers(prev=>[...prev,{o:index,q:value}]);*/
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
  <Button
    variant="contained"
    color="primary"
    onClick={handleSubmit}
    sx={{ marginTop: "20px" }}
    disabled={isSubmitted}
  >
    Save
  </Button>
</Container>
</>
  );
};


