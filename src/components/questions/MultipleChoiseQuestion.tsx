import React from "react";
import { FormGroup, FormControlLabel, Checkbox, Paper } from "@mui/material";
import { DBQuestion } from "../../lib/appwrite";

export default function MultipleChoiceQuestion({question}: {question: DBQuestion}) {

  return (
    <FormGroup sx={{ gap: 1, flexDirection: 'row' }}>
      {question.options.map((option, index) => (
        <Paper key={index} sx={{ display: 'flex', minWidth: '49%', flexGrow: 1 }}>
          <FormControlLabel
            sx={{ flex: 1, margin: 0, padding: 1, paddingRight: 2 }}
            control={<Checkbox />}
            label={option}
          />
        </Paper>
      ))}
    </FormGroup>
  );
};

