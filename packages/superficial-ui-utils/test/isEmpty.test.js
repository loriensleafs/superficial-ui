import { isEmpty } from '../src';

test('should return true for arrays and strings with a length of 0', () => {
  expect(isEmpty('')).toBeTruthy();
  expect(isEmpty([])).toBeTruthy();
});

test('should return `true` for empty values', (...args) => {
  expect(isEmpty(args)).toBeTruthy();
  expect(isEmpty('')).toBeTruthy();
  expect(isEmpty(' ')).toBeTruthy();
  expect(isEmpty([])).toBeTruthy();
  expect(isEmpty({})).toBeTruthy();
  expect(isEmpty(new Map())).toBeTruthy();
  expect(isEmpty(new Set())).toBeTruthy();
});

test('should return `false` for non-empty values', () => {
  const testMap = new Map();
  testMap.set('a', 1);

  const testSet = new Set();
  testSet.add(1);

  expect(isEmpty('a')).toBeFalsy();
  expect(isEmpty([0])).toBeFalsy();
  expect(isEmpty({ a: 0 })).toBeFalsy();
  expect(isEmpty(testMap)).toBeFalsy();
  expect(isEmpty(testSet)).toBeFalsy();
});
