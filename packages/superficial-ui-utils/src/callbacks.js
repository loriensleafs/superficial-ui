import { isNil, isFunction } from './assertions';

/**
 * This is checks any callback to ensure it's a
 * function before invoking it with it's arguments
 *
 * @param callback The callback's value
 * @param event The callback's argument/event
 */
export const resolveCallback = (resolveCallback, event) => {
  if (typeof callback === 'function') {
    return callback(event);
  }
  return callback;
};

/**
 * Credit: https://github.com/downshift-js/downshift/blob/master/src/utils.js
 */
export const composeEventHandlers = (...fns) => event =>
  fns.some(fn => {
    fn && fn(event);
    return event && event.defaultPrevented;
  });

export const composeFunctions = (...fns) => (...args) =>
  fns.forEach(fn => fn && fn(...args));

export const functionElseValue = (fn, args) =>
  !isNil(fn) && isFunction(fn) ? fn(args) : fn;

const compose = (...args) => props =>
  args.reduce(
    (acc, arg) =>
      merge(acc, typeof arg === 'function' ? arg({ theme, ...props }) : arg),
    {},
  );
