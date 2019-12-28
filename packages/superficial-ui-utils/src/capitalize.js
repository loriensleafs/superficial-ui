import { isString } from './assertions';

export const capitalize = string =>
  isString(string) ? string.charAt(0).toUpperCase() + string.slice(1) : string;
