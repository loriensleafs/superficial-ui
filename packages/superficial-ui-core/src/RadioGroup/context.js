import * as React from 'react';

export const RadioGroupContext = React.createContext();
export const useRadioGroup = (props = {}, states = []) =>
  React.useContext(RadioGroupContext);
