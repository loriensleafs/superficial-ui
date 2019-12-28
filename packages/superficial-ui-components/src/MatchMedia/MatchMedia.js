import { toArray } from '@superficial-ui/utils';
import { useResponsiveValue } from '@theme-ui/match-media';

const breakpoints = ['sm', 'md', 'lg', 'xl'];

const mapHiddenAt = hiddenAt => {
  const values = breakpoints.map(bp => hiddenAt.includes(bp));
  return values;
};

const mapHiddenAbove = (above, inclusive) => {
  let values = breakpoints.map((bp, index) =>
    inclusive ? index >= above : index > above,
  );
  return values;
};

const mapHiddenBelow = (below, inclusive) => {
  const values = breakpoints.map((bp, index) =>
    inclusive ? index <= below : index < below,
  );
  return values;
};

const mapValues = ({ at, above, atOrAbove, below, atOrBelow }) => {
  if (at) return mapHiddenAt(toArray(at));
  if (above) return mapHiddenAbove(breakpoints.indexOf(above, false));
  if (atOrAbove) return mapHiddenAbove(breakpoints.indexOf(atOrAbove, true));
  if (below) return mapHiddenBelow(breakpoints.indexOf(below, false));
  if (atOrBelow) return mapHiddenBelow(breakpoints.indexOf(atOrBelow, true));
};

export const MatchMedia = ({ children, ...props }) => {
  const isHidden = useResponsiveValue(mapValues(props));
  return isHidden ? null : children;
};
MatchMedia.uiName = 'MatchMedia';
MatchMedia.displayName = 'MatchMedia';
