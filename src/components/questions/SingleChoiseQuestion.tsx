import React from "react";
import { Box, FormControlLabel, Paper, Radio, RadioGroup } from "@mui/material";
import { DBQuestion } from "../../lib/appwrite";

export default function SingleChoiceQuestion(
  {question, state, setState, reveal}: {question: DBQuestion, state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>, reveal?: boolean}
) {

  React.useEffect(() => {
    if (!state?.length) setState(question.options.map(() => 'n'));
  }, [question]);

  return (
      <RadioGroup
        value={state?.findIndex((v) => v === 'y')}
        onChange={(e) => setState((s) => s.map((_, i) => i === parseInt(e.target.value) ? 'y' : 'n'))}
        sx={{ gap: 1, flexDirection: 'row' }}
      >
        {question.options.map((option, index) => (
          <Paper key={index} sx={{ display: 'flex', minWidth: '49%', flexGrow: 1,
            border: reveal ? 2 : 'none',
            borderColor: (t) => state[index] === question.matches[index] ? t.palette.success.dark : t.palette.error.dark
          }}>
            <FormControlLabel
              sx={{ flex: 1, margin: 0, padding: 1, paddingRight: 2 }}
              value={index}
              control={<Radio />}
              label={option}
            />
          </Paper>
        ))}
        {question.options.length % 2 === 1 && <Box sx={{ minWidth: '49%', flexGrow: 1 }} />}
      </RadioGroup>
  );
};
