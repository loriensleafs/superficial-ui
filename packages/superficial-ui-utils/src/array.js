import { isArray } from './assertions';

export const toArray = arg => {
  if (isArray(arg)) return arg;
  return typeof arg !== 'undefined' ? [arg] : [];
};

export const firstIndex = array => (isArray(array) ? array[0] : undefined);

export const lastIndex = array =>
  isArray(array) ? array[array.length - 1] : undefined;

export const removeIndex = (array, index) =>
  array.filter((_, idx) => idx !== index);

export const removeItem = (array, item) => removeIndex(array.indexOf(item));

export const findIndex = (array, callback) => {
  const found = array.find(callback);
  return found ? array.indexOf(found) : -1;
};
