import { isNegative } from '../src';

test('should return `true` for negative numbers', () => {
  expect(isNegative(-1)).toBeTruthy();
});

test('should return `false` for non-negative numbers', () => {
  expect(isNegative(1)).toBeFalsy();
  expect(isNegative(0)).toBeFalsy();
});
