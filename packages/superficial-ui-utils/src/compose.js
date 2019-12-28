import { merge } from './merge';

export const compose = (...args) => props =>
  args.reduce(
    (acc, arg) => merge(acc, typeof arg === 'function' ? arg(props) : arg),
    {},
  );
