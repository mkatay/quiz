import './App.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { SelectQuiz } from './components/SelectQuiz';
import { Box } from '@mui/material';

const queryClient = new QueryClient();


function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
      <Box sx={{ color: 'primary.main' }}>
        <h3>Szoftverfejlesztő és -tesztelő képzés</h3>
      </Box>
       
        <SelectQuiz/>
      </div>
     
    </QueryClientProvider>
  )
}

export default App
