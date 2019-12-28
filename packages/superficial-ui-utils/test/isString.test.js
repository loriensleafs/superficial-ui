import { isString } from '../src';

test('should return `true` for strings', () => {
  expect(isString('a')).toBeTruthy();
});

test('should return `false` for non-strings', (...args) => {
  expect(isString(args)).toBeFalsy();
  expect(isString([1, 2, 3])).toBeFalsy();
  expect(isString(true)).toBeFalsy();
  expect(isString(new Date())).toBeFalsy();
  expect(isString(new Error())).toBeFalsy();
  expect(isString({ '0': 1, length: 1 })).toBeFalsy();
  expect(isString(1)).toBeFalsy();
});
