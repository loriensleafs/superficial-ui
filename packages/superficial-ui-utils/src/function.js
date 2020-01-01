import { merge } from './object';
import { isNil, isFunction } from './assertions';

export function runIfFn(fn, args) {
  if (isFunction(fn)) return fn(args);
  return fn;
}

export function compose(...args) {
  return props =>
    args.reduce(
      (acc, arg) => merge(acc, typeof arg === 'function' ? arg(props) : arg),
      {},
    );
}

export function composeFunctions(...fns) {
  return (...args) => fns.forEach(fn => fn && fn(...args));
}

export function composeEventHandlers(...fns) {
  return event =>
    fns.some(fn => {
      fn && fn(event);
      return event && event.defaultPrevented;
    });
}

export function createChainedFunction(...fns) {
  return fns.reduce(
    (acc, fn) => {
      if (fn == null) return acc;
      return function chainedFunction(...args) {
        acc.apply(this, args);
        fn.apply(this, args);
      };
    },
    () => {},
  );
}

export function debounce(func, wait = 166) {
  let timeout;
  function debounced(...args) {
    const that = this;
    const later = () => func.apply(that, args);
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
  debounced.clear = () => clearTimeout(timeout);
  return debounced;
}

export function resolveCallback(resolveCallback, event) {
  if (typeof callback === 'function') return callback(event);
  return callback;
}
