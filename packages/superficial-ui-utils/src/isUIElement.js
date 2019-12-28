import { isValidElement } from 'react';
import { get } from './object';
import { toArray } from './array';

export const isUIElement = (element, names) =>
  isValidElement(element) &&
  toArray(names).includes(get(element, 'type.uiName'));
