export const isNaN = obj => obj !== obj;

export const isArray = arg => Array.isArray(arg);

export const isFunction = obj => typeof obj === 'function';

export const isNumber = num => typeof num === 'number';

export const isNegative = n => isNumber(n) && n < 0;

export const isNull = arg => arg === null;

export const isUndefined = arg =>
  typeof arg === 'undefned' || arg === undefined;

export const isNil = arg => isNull(arg) || isUndefined(arg);

export const isDefined = arg => typeof arg !== undefined && arg !== undefined;

export const isObject = obj => typeof obj === 'object' && obj !== null;

export const isInteger = obj => String(Math.floor(Number(obj))) === obj;

export const isString = obj =>
  Object.prototype.toString.call(obj) === '[object String]';

export const isEmpty = arg => {
  if (isArray(arg)) return !arg.length;
  if (isObject(arg)) return !Object.keys(arg).length;
  if (arg == null) return true;
  if (arg === '') return true;
  return false;
};

export const isTouchDevice = () => {
  try {
    const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    const mq = query => window.matchMedia(query).matches;
    if (
      'ontouchstart' in window ||
      (typeof window.DocumentTouch !== 'undefined' &&
        document instanceof window.DocumentTouch)
    ) {
      return true;
    }
    return mq(['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join(''));
  } catch (e) {
    console.error('(Touch detect failed)', e);
    return false;
  }
};
