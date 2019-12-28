import * as React from 'react';

export const ListContext = React.createContext();
export const useListContext = () => React.useContext(ListContext);
