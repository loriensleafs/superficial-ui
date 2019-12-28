import { isFunction } from '../src';

test('should return `true` for functions', () => {
  expect(isFunction(isFunction)).toBeTruthy();
});

test('should return `false` for non-functions', (...args) => {
  expect(isFunction(args)).toBeFalsy();
  expect(isFunction([1, 2, 3])).toBeFalsy();
  expect(isFunction(true)).toBeFalsy();
  expect(isFunction(new Date())).toBeFalsy();
  expect(isFunction(new Error())).toBeFalsy();
  expect(isFunction({ a: 1 })).toBeFalsy();
  expect(isFunction(1)).toBeFalsy();
  expect(isFunction('a')).toBeFalsy();
});
