import React, { useState } from "react";
import {  Container,  Typography,  Paper,  Select,  MenuItem,  Button,  Grid2,} from "@mui/material";

export const MatchingQuestion = ({ questionData ,questionIndex}) => {
  const [answers, setAnswers] = useState(
    Array(questionData.options.length).fill("") // Kezdetben üres válaszok
  );

  const handleSelectChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    alert(`Selected answers: ${JSON.stringify(answers)}`);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h6" gutterBottom>
       {questionIndex}.{questionData.question}
      </Typography>
      <Grid2 container spacing={2}>
        {questionData.options.map((option, index) => (
          <Grid2  xs={6} key={`option-${index}`}>
            <Paper style={{ padding: "10px" }}>
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
                  <MenuItem key={`match-${matchIndex}`} value={matchIndex}>
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
        style={{ marginTop: "20px" }}
      >
        Submit
      </Button>
    </Container>
  );
};


