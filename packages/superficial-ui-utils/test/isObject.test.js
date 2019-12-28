import { isObject } from '../src';

test('should detect plain objects', () => {
  function Foo(a) {
    this.a = 1;
  }

  expect(isObject({})).toBeTruthy();
  expect(isObject({ a: 1 })).toBeTruthy();
  expect(isObject([1, 2, 3])).toBeFalsy();
  expect(isObject(new Foo(1))).toBeFalsy();
});

test('should return `false` for DOM elements', () => {
  const element = document && document.createElement('div');
  expect(isObject(element)).toBeFalsy();
});

test('should return `false` for non-Object objects', (...args) => {
  expect(isObject(args)).toBeFalsy();
  expect(isObject(Error)).toBeFalsy();
  expect(isObject(Math)).toBeFalsy();
});

test('should return `false` for non-objects', () => {
  expect(isObject(true)).toBeFalsy();
  expect(isObject('a')).toBeFalsy();
  expect(isObject(Symbol())).toBeFalsy();
});
