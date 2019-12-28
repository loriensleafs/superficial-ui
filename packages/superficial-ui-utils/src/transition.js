import * as P from 'polished';
import { toArray } from './array';
import { get } from './object';

export const transition = (properties = 'all', options = {}) => theme => {
  const duration = get(theme, `durations.${options.duration}`, 300);
  const curve = get(
    theme,
    `easings.${options.curve}`,
    'cubic-bezier(0.4, 0, 0.2, 1)'
  );
  const delay = get(options, 'delay', 0);
  return P.transitions(toArray(properties), `${duration}ms ${curve} ${delay}ms`)
    .transition;
};
