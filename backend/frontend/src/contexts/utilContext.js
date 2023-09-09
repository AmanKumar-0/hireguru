import { React, createContext, useContext, useState } from "react";

export const UtilContext = createContext();

export const useUtil = () => {
  return useContext(UtilContext);
};

export const UtilProvider = ({ children }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [runConfetti, setRunConfetti] = useState(false);

  return (
    <UtilContext.Provider
      value={{
        tabIndex,
        setTabIndex,
        runConfetti,
        setRunConfetti,
      }}
    >
      {children}
    </UtilContext.Provider>
  );
};
