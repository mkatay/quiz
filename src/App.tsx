import React from 'react';
import { Box, Container, Pagination, Typography } from '@mui/material';
import SideMenu from './components/SideMenu';
import { useQueryParams } from './hooks/QueryParamsContext';
import { databases, DB, DBQuestion, QuestionType } from './lib/appwrite';
import { Query } from 'appwrite';
import { Loop } from '@mui/icons-material';
import OrderQuestion from './components/questions/OrderQuestion';
import { pad } from './lib/utils';

export default function App() {
  const {queryParams, updateQueryParams} = useQueryParams();

  const [questions, setQuestions] = React.useState<DBQuestion[]>();
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);

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
      setQuestions(documents);
    })
    .catch((e) => console.error(e));
  }, [queryParams.t]);

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'row',
      minHeight: '100vh',
      padding: 4,
      gap: 2
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
          <Typography variant='h5'>
            {questions[currentQuestion].question}
          </Typography>
          {questions[currentQuestion].type === QuestionType.ORDER ? (
            <OrderQuestion question={questions[currentQuestion]} />
          ) : ('nope')}
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