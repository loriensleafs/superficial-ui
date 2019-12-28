import * as React from 'react';

export const TableContext = React.createContext();
export const useTable = () => React.useContext(TableContext);
