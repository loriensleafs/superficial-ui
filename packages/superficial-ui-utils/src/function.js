import { merge } from './object';
import { isNil, isFunction } from './assertions';

export const debounce = (func, wait = 166) => {
  let timeout;

  function debounced(...args) {
    const that = this;
    const later = () => func.apply(that, args);
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
  debounced.clear = () => clearTimeout(timeout);
  return debounced;
};

export const compose = (...args) => props =>
  args.reduce(
    (acc, arg) => merge(acc, typeof arg === 'function' ? arg(props) : arg),
    {},
  );

export const composeFunctions = (...fns) => (...args) =>
  fns.forEach(fn => fn && fn(...args));

export const composeEventHandlers = (...fns) => event =>
  fns.some(fn => {
    fn && fn(event);
    return event && event.defaultPrevented;
  });

export const createChainedFunction = (...funcs) =>
  funcs.reduce(
    (acc, func) => {
      if (func == null) return acc;
      return function chainedFunction(...args) {
        acc.apply(this, args);
        func.apply(this, args);
      };
    },
    () => {},
  );

export const functionElseValue = (fn, args) =>
  !isNil(fn) && isFunction(fn) ? fn(args) : fn;

export const resolveCallback = (resolveCallback, event) => {
  if (typeof callback === 'function') return callback(event);
  return callback;
};
