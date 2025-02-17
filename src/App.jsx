import './App.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { SelectQuiz } from './components/SelectQuiz';
import { useEffect } from 'react';
import { generateSchema } from './utility/crudUtility';


const queryClient = new QueryClient();


function App() {
/*useEffect(()=>{
  generateSchema('quiz-content')
},[])*/

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
