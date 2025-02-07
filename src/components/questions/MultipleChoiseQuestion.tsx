import React from "react";
import { FormGroup, FormControlLabel, Checkbox, Paper } from "@mui/material";
import { DBQuestion } from "../../lib/appwrite";

export default function MultipleChoiceQuestion(
  {question, state, setState}: {question: DBQuestion, state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>}
) {

  React.useEffect(() => {
    if (!state?.length) setState(question.options.map(() => 'n'));
  }, []);

  return (
    <FormGroup sx={{ gap: 1, flexDirection: 'row' }}>
      {question.options.map((option, index) => (
        <Paper key={index} sx={{ display: 'flex', minWidth: '49%', flexGrow: 1 }}>
          <FormControlLabel
            sx={{ flex: 1, margin: 0, padding: 1, paddingRight: 2 }}
            control={<Checkbox />}
            label={option}
            checked={state[index] === 'y' || false}
            onChange={(_, v) => setState((s) => s.map((o, i) => i === index ? (v ? 'y' : 'n') : o))}
          />
        </Paper>
      ))}
    </FormGroup>
  );
};

