import React, { createContext, useEffect, useState } from 'react';
import { readQuizList } from '../utility/crudUtility';

export const QuizListContext = createContext();

export const QuizListProvider = ({ children }) => {
  const [list, setList] = useState(null);
  
  useEffect(() => {
   readQuizList(setList)
  }, []);

    return (
    <QuizListContext.Provider value={{ list}}>                               
      {children}
    </QuizListContext.Provider>
  );
};
