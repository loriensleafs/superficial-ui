import * as React from 'react';

export const TableInnerContext = React.createContext();
export const useTableInner = () => React.useContext(TableInnerContext);
