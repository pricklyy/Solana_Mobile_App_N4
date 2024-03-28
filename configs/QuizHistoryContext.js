import React, { createContext, useContext, useState } from 'react';

const QuizHistoryContext = createContext();

export const useQuizHistory = () => useContext(QuizHistoryContext);

export const QuizHistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const updateHistory = (newHistory) => {
    setHistory(newHistory);
  };

  return (
    <QuizHistoryContext.Provider value={{ history, updateHistory }}>
      {children}
    </QuizHistoryContext.Provider>
  );
};
