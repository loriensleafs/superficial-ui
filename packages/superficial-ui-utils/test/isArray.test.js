import { isArray } from '../src';

test('should return `true` for arrays', () => {
  expect(isArray([1, 2, 3])).toBeTruthy();
});

test('should return `false` for non-array values', () => {
  expect(isArray(true)).toBeFalsy();
  expect(isArray(new Date())).toBeFalsy();
  expect(isArray(new Error())).toBeFalsy();
  expect(isArray({})).toBeFalsy();
  expect(isArray('a')).toBeFalsy();
  expect(isArray(1)).toBeFalsy();
});
