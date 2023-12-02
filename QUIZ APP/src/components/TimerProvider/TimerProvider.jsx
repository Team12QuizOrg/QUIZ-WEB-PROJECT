import { createContext, useContext, useState } from "react";

// Create a context
const TimerContext = createContext();

// Create a provider component
export const TimerProvider = ({ children }) => {
  const [externalState, setExternalState] = useState(null);

  return (
    <TimerContext.Provider value={{ externalState, setExternalState }}>
      {children}
    </TimerContext.Provider>
  );
};

// Create a custom hook to consume the context
export const useTimerContext = () => {
  return useContext(TimerContext);
};