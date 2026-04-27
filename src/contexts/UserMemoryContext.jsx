import React, { createContext, useState, useEffect, useContext } from 'react';

const UserMemoryContext = createContext();

const initialMemoryState = {
  voterStatus: 'unregistered', // 'unregistered', 'registered', 'voted'
  location: '',
  age: null,
  isFirstTimeVoter: false,
  onboardingComplete: false,
  documentsReady: false,
  hasSeenWelcome: false,
  userName: '',
  journeyProgress: 0,
  completedSteps: [],
  badges: [],
  votingBooth: null,
  streak: 0,
  lastActive: null,
  quizzesTaken: 0,
  fakeNewsHistory: [],
};

export const UserMemoryProvider = ({ children }) => {
  const [memory, setMemory] = useState(() => {
    try {
      const stored = localStorage.getItem('votingCompanionMemory');
      return stored ? JSON.parse(stored) : initialMemoryState;
    } catch (e) {
      console.error("Failed to parse memory from local storage:", e);
      return initialMemoryState;
    }
  });

  useEffect(() => {
    localStorage.setItem('votingCompanionMemory', JSON.stringify(memory));
  }, [memory]);

  const updateMemory = (newMemoryData) => {
    setMemory(prev => ({ ...prev, ...newMemoryData }));
  };

  const clearMemory = () => {
    setMemory(initialMemoryState);
    localStorage.removeItem('votingCompanionMemory');
  };

  return (
    <UserMemoryContext.Provider value={{ memory, updateMemory, clearMemory }}>
      {children}
    </UserMemoryContext.Provider>
  );
};

export const useUserMemory = () => useContext(UserMemoryContext);
