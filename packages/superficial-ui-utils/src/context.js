import * as React from 'react';

export function createContext() {
  const Context = React.createContext(undefined);

  function useContext() {
    const context = React.useContext(Context);
    if (!context)
      throw new Error('useContext must be inside a Provider with a value');
    return context;
  }

  return [Context.Provider, useContext];
}
