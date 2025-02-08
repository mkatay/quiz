import React from 'react';
import { Box, Button, Container, Pagination, Paper, Typography } from '@mui/material';
import SideMenu from './components/SideMenu';
import { useQueryParams } from './hooks/QueryParamsContext';
import { databases, DB, DBQuestion, QuestionType, storage } from './lib/appwrite';
import { Query } from 'appwrite';
import { Loop } from '@mui/icons-material';
import OrderQuestion from './components/questions/OrderQuestion';
import { pad } from './lib/utils';
import MultipleChoiceQuestion from './components/questions/MultipleChoiseQuestion';
import MatchingQuestion from './components/questions/MatchingQuestion';
import SingleChoiceQuestion from './components/questions/SingleChoiseQuestion';
import { AW_IMAGE_BUCKET } from './lib/config';

export default function App() {
  const {queryParams, updateQueryParams} = useQueryParams();

  const [questions, setQuestions] = React.useState<DBQuestion[]>();
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
  const [answers, setAnswers] = React.useState<string[][]>([]);

  React.useEffect(() => {
    if (!questions) return;
    const newId = questions[currentQuestion].$id;
    if (newId !== queryParams.q) updateQueryParams({q: newId});
  }, [currentQuestion, questions]);

  React.useEffect(() => {
    if (!queryParams.q || !questions) return;
    const index = questions?.findIndex((doc) => doc.$id === queryParams.q);
    if (index !== currentQuestion) setCurrentQuestion(index);
  }, [queryParams, questions]);

  React.useEffect(() => {
    if (!queryParams.t) return;
    databases.listDocuments(DB.ID, DB.QUESTIONS, [
      Query.equal('test', queryParams.t),
    ])
    .then((response) => {
      let documents = response.documents as DBQuestion[];
      if (queryParams.q) {
        const selected = documents.find((doc) => doc.$id === queryParams.q);
        documents = documents.filter((doc) => doc.$id !== queryParams.q).sort(() => Math.random() - 0.5);
        if (selected) documents.unshift(selected);
      } else {
        documents = documents.sort(() => Math.random() - 0.5);
      }
      setAnswers(documents.map(() => []));
      setQuestions(documents);
      setCurrentQuestion(0);
      setScore(undefined);
    })
    .catch((e) => console.error(e));
  }, [queryParams.t]);

  const [image, setImage] = React.useState<string>();
  React.useEffect(() => {
    const imageId = questions?.[currentQuestion]?.image;
    if (!imageId) {
      setImage(undefined);
      return;
    }
    setImage(storage.getFileView(AW_IMAGE_BUCKET, imageId));
  }, [currentQuestion, questions]);

  const handleQuestionChange: React.Dispatch<React.SetStateAction<any[]>> =
    (v) => setAnswers((a) => answers.map((o, i) => i === currentQuestion ? (typeof v === 'function' ? v(a[currentQuestion]) : v) : o));

  const [score, setScore] = React.useState<number>();
  function handleNext() {
    if (questions && currentQuestion === questions.length - 1) {
      setScore(answers.reduce((acc, val, i) => acc + +val.every((v2, i2) => (questions[i].type === QuestionType.ORDER ? questions[i].options[i2] == v2 : questions[i].matches[i2] == v2)), 0));
    } else {
      setCurrentQuestion((prev) => prev+1)
    }
  }

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'row',
      minHeight: '100vh',
      gap: 2,
      padding: {xs: 1, md: 4},
      paddingTop: {xs: 10, md: 4}
    }}>
      <SideMenu />
      {queryParams.t ? questions ? (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: 2, padding: 2}}>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, width: '100%'}}>
            <Typography variant='h6' sx={{color: 'gray', fontWeight: 900}}>
              {questions[currentQuestion].test.profession} - {questions[currentQuestion].test.year}/{pad(questions[currentQuestion].test.month, 2)}
            </Typography>
            <Typography variant='h6' sx={{color: 'gray', fontWeight: 900}}>
              {currentQuestion+1} / {questions.length}
            </Typography>
          </Box>
          <Typography variant='h5' sx={{width: '100%'}}>
            {questions[currentQuestion].question}
          </Typography>
          {image && (
            <Box sx={{width: '100%', maxHeight: '30vh', display: 'flex', justifyContent: 'center'}}>
              <img src={image} alt="ez egy kép" />
            </Box>
          )}
          <Box sx={{userSelect: 'none', width: '100%'}}>
            {questions[currentQuestion].type === QuestionType.ORDER && (
              <OrderQuestion question={questions[currentQuestion]} state={answers[currentQuestion]} setState={handleQuestionChange} reveal={score !== undefined} />
            )}
            {questions[currentQuestion].type === QuestionType.MULTIPLE_CHOICE && (
              <MultipleChoiceQuestion question={questions[currentQuestion]} state={answers[currentQuestion]} setState={handleQuestionChange} reveal={score !== undefined} />
            )}
            {questions[currentQuestion].type === QuestionType.MATCH && (
              <MatchingQuestion question={questions[currentQuestion]} state={answers[currentQuestion]} setState={handleQuestionChange} reveal={score !== undefined} />
            )}
            {questions[currentQuestion].type === QuestionType.SINGLE_CHOICE && (
              <SingleChoiceQuestion question={questions[currentQuestion]} state={answers[currentQuestion]} setState={handleQuestionChange} reveal={score !== undefined} />
            )}
          </Box>
          {score !== undefined ? (
            <Paper sx={{padding: 2, backgroundColor: (t) => t.palette.info.dark}}>
              <Typography variant='h6'>
                Eredmény: {score} / {questions.length} ({Math.round(score/questions.length*100)}%)
              </Typography>
            </Paper>
          ) : (
            <Button sx={{alignSelf: 'flex-end'}} variant='contained'
              onClick={handleNext}
              color={currentQuestion === questions.length-1 ? "warning" : "primary"}
            >
              {currentQuestion === questions.length-1 ? "Befejezés" : "Következő"}
            </Button>
          )}
          <Pagination sx={{marginTop: 'auto'}}
          count={questions.length} page={currentQuestion+1} onChange={(_,v) => setCurrentQuestion(v-1)} />
        </Box>
      ) : (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Loop sx={{animation: 'spin 1s linear infinite reverse'}} />
          <p>Kérdések betöltése...</p>
        </Box>
      ) : (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <img style={{width: '50%', height: 'auto'}} src="/quizLetters.png" alt="Q-U-I-Z logo" />
          <h1 style={{paddingBottom: '1rem'}}>KAM's Quiz</h1>
          <p>Válassz egy tesztet!</p>
        </Box>
      )}
    </Container>
  )
}