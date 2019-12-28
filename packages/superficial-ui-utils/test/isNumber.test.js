import { isNumber } from '../src';

test('should return `true` for numbers', () => {
  expect(isNumber(0)).toBeTruthy();
  expect(isNumber(NaN)).toBeTruthy();
});

test('should return `false` for non-numbers', (...args) => {
  expect(isNumber(args)).toBeFalsy();
  expect(isNumber([1, 2, 3])).toBeFalsy();
  expect(isNumber(new Date())).toBeFalsy();
  expect(isNumber(new Error())).toBeFalsy();
  expect(isNumber({ a: 1 })).toBeFalsy();
  expect(isNumber('a')).toBeFalsy();
});
