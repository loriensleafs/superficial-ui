import { is } from '../src';

test('should return `false` for nullish values', () => {
  expect(is()).toBeFalsy();
  expect(is(undefined)).toBeFalsy();
  expect(is(null)).toBeFalsy();
});

test('should return `true` for non-nullish values', () => {
  expect(is(true)).toBeTruthy();
  expect(is(new Date())).toBeTruthy();
  expect(is(new Error())).toBeTruthy();
  expect(is([1, 2, 3])).toBeTruthy();
  expect(is({ 1: 'one', 2: 'two' })).toBeTruthy();
  expect(is(1)).toBeTruthy();
  expect(is('a')).toBeTruthy();
});
