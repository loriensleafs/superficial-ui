import * as React from 'react';

export const createCtx = () => {
  const Context = React.createContext(undefined);
  const useContext = () => React.useContext(Context);
  return [useContext, Context.Provider];
};
