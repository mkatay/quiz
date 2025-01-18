import React,{useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import { QuizListContext } from '../context/QuizList';
import { QuizContainer } from './QuizContainer';




export const SelectQuiz=()=> {
 const {list}=useContext(QuizListContext)
 const [selectedQuiz,setSelectedQuiz]=useState('')
 console.log(selectedQuiz);
 
  return (
    <>
    <Box sx={{ minWidth: 120,maxWidth:200,margin:'auto' }}>
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Interaktiv tesztek</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedQuiz}
          label="Interaktív tesztek"
          onChange={(event) => setSelectedQuiz(event.target.value)}
          sx={{/* backgroundColor: 'secondary.main', color: 'primary.contrasText' */}}
        >
        {list && list.map(obj=>
             <MenuItem key={obj.id} value={obj.descr}>{obj.descr}</MenuItem>
        )}
        </Select>
      </FormControl>
    </Box>  
    {selectedQuiz && <QuizContainer selectedQuiz={selectedQuiz}/>}
    </>
  );
}
