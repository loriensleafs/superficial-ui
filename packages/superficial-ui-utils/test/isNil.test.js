import { isNil } from '../src';

test('should return `true` for nullish values', () => {
  expect(isNil(null)).toBeTruthy();
  expect(isNil()).toBeTruthy();
  expect(isNil(undefined)).toBeTruthy();
});

test('should return `false` for none-nullish values', (...args) => {
  expect(isNil(args)).toBeFalsy();
  expect(isNil([1, 2, 3])).toBeFalsy();
  expect(isNil(true)).toBeFalsy();
  expect(isNil(new Date())).toBeFalsy();
  expect(isNil(new Error())).toBeFalsy();
  expect(isNil({ a: 1 })).toBeFalsy();
  expect(isNil(1)).toBeFalsy();
  expect(isNil('a')).toBeFalsy();
});
