import React from 'react';
import { Box, Container, Pagination } from '@mui/material';
import SideMenu from './components/SideMenu';
import { useQueryParams } from './hooks/QueryParamsContext';
import { databases, DB, DBQuestion } from './lib/appwrite';
import { Query } from 'appwrite';
import { Loop } from '@mui/icons-material';

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
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: 2}}>
          <span style={{color: 'gray', fontWeight: 'bold', fontSize: '1.5rem', width: '100%'}}>
            {currentQuestion+1} / {questions.length}
          </span>
          <h3>
            {questions[currentQuestion].question}
          </h3>
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