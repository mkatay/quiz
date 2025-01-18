import React from 'react'

import {Box, Button, List, Typography } from '@mui/material'

import { useEffect } from 'react'
import { useState } from 'react'
import { readQuizContent } from '../utility/crudUtility.js'
import { OrderQuestion } from './OrderQuestion.jsx'
import { MultipleChoiceQuestion } from './MultipleChoiseQuestion.jsx'
import { SingleChoiceQuestion } from './SingleChoiseQuestion.jsx'
import { MatchingQuestion } from './MatchingQuestion.jsx'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export const QuizContainer = ({selectedQuiz}) => {
  const [questions,setQuestions]=useState(null)
  const [questionIndex,setQuestionIndex]=useState(0)
  const [hit,setHit]=useState(0)

  useEffect(()=>{
    readQuizContent(selectedQuiz,setQuestions)
  },[selectedQuiz])

//questions && console.log(questions[questionIndex]);
console.log('jó válaszok száma:',hit);

  return (
    <>
    <Box sx={{display:'flex',justifyContent:'space-between',maxWidth:'800px',margin:'10px auto',padding:'15px',
    border:'1px solid #3f50b5;',borderRadius:'10px'}}> 
      <Box>
       {questions && questions[questionIndex].type=='order' && 
          <OrderQuestion setHit={setHit} questionIndex={questionIndex+1} questionData={questions[questionIndex]}/>
        }
        {questions && questions[questionIndex].type=='multiple_choice' &&
         <MultipleChoiceQuestion setHit={setHit} questionIndex={questionIndex+1} questionData={questions[questionIndex]}/>
        }
        {questions && questions[questionIndex].type=='single_choice' &&
         <SingleChoiceQuestion 
         key={questions[questionIndex].id} 
         setHit={setHit} questionIndex={questionIndex+1} questionData={questions[questionIndex]}/>
        }
        {questions && questions[questionIndex].type=='matching' &&
         <MatchingQuestion setHit={setHit} questionIndex={questionIndex+1} questionData={questions[questionIndex]}/>
        }
      </Box>
      <Box  >
         <Button variant="contained" color="primary" sx={{display: 'flex',flexDirection:'column',height:'100%'}}
           onClick={()=>setQuestionIndex(prev=>prev < questions.length - 1 ? ++prev : prev)}      >
          <ArrowForwardIosIcon/>
        </Button>
      </Box>  
    </Box>
    {questionIndex==19 && <Box>
      <Typography variant="h6" gutterBottom sx={{textAlign:'center'}}>
       Az eredmény: <span style={{color:"green",fontSize:'2rem'}}>{hit}</span>/20
      </Typography>
    </Box>}
    </>
  )
}

