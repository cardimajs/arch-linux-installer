import React, { createContext, useState } from 'react';

type Theme = 'light' | 'dark';

const initialState = {
  theme: 'light',
  setTheme: (state: Theme) => {},
};

const MainContext = createContext(initialState);

const MainContextProvider: React.FC = (props) => {
  const { children } = props;

  const [theme, setTheme] = useState<Theme>('light');

  return (
    <MainContext.Provider value={{ theme, setTheme }}>
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
