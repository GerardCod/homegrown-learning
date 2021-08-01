import { createContext } from "react";

export const ActivityContext = createContext();

const ActivityProvider = ({ children }) => {
  
  const childProps = {}

  return (
    <ActivityContext.Provider value={ childProps }> 
      { children }
    </ActivityContext.Provider>
  );
}

export default ActivityProvider;