import React, { createContext } from 'react';

export const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  
  const childProps = {};
  
  return (
    <VideoContext.Provider value={childProps}>
      { children }
    </VideoContext.Provider>
  );
}