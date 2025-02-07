import React from "react";
import { Box } from "@mui/material";
import { DBQuestion } from "../../lib/appwrite";

export const SingleChoiceQuestion = ({ question }: {question: DBQuestion}) => {
  
  return (
    <Box>
      This is a single choice question
      <br />
      It is under development
    </Box>
  );
};
