import React from "react";
import { DBQuestion } from "../../lib/appwrite";
import { Box } from "@mui/material";

export const MatchingQuestion = ({ question }: {question: DBQuestion}) => {

  return (
    <Box>
      This is a matching question
      <br />
      It is under development
    </Box>
  );
};


