import React from "react";
import { Box, FormControlLabel, Paper, Radio, RadioGroup } from "@mui/material";
import { DBQuestion } from "../../lib/appwrite";

export default function SingleChoiceQuestion({ question }: {question: DBQuestion}) {
  
  const [selection, setSelection] = React.useState<string>("");

  return (
      <RadioGroup
        value={selection}
        onChange={(e) => setSelection(e.target.value)}
        sx={{ gap: 1, flexDirection: 'row' }}
      >
        {question.options.map((option, index) => (
          <Paper key={index} sx={{ display: 'flex', minWidth: '49%', flexGrow: 1 }}>
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
