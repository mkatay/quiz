import './App.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { SelectQuiz } from './components/SelectQuiz';
import { Box } from '@mui/material';

const queryClient = new QueryClient();


function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
      <div >
        <h3 style={{ color: '#3f50b5' }}>Szoftverfejlesztő és -tesztelő képzés</h3>
      </div>
       
        <SelectQuiz/>
      </div>
     
    </QueryClientProvider>
  )
}

export default App
