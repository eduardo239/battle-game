import React, { useState } from 'react';

const HeroContext = React.createContext();
const HeroProvider = HeroContext.Provider;

const ContextHero = ({ children }) => {
  const [hero, setHero] = useState(null);

  return (
    <HeroProvider
      value={{
        setHero,
        hero,
      }}
    >
      {children}
    </HeroProvider>
  );
};

export { HeroContext, ContextHero };
