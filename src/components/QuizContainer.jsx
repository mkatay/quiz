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
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


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
    <Box sx={{display:'flex',justifyContent:'space-between',maxWidth:'800px',margin:'10px auto',padding:'5px',
    border:'1px solid #3f50b5;',borderRadius:'10px'}}> 
      <Box sx={{padding:0}}>
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
         <Button variant="contained" color="primary" sx={{display: 'flex',flexDirection:'column',height:'100%',padding:0,minWidth:'24px'}}
           onClick={()=>setQuestionIndex(prev=>prev < questions.length - 1 ? ++prev : prev)}      >
          <NavigateNextIcon/>
        </Button>
      </Box>  
    </Box>
    {questionIndex==19 && 
    <Box sx={{width:'80%',boxShadow:'0 0 5px #3f50b5',backgroundColor:'inherit',margin:'auto',borderRadius:'10px'}}>
      <Typography variant="h6" gutterBottom sx={{textAlign:'center'}}>
       Végeredmény: <span style={{color:"green",fontSize:'2rem'}}>{hit}</span><span>/20 pont.</span>
       <span> &nbsp; Százalékos teljesítés: <b className="blinking-text" >{(hit*100/20).toFixed(1)}%</b></span>
      </Typography>
    </Box>}
    </>
  )
}

