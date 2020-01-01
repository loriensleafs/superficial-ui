import { css } from 'theme-ui';
import tx from './transformProps';

const hasUnderscore = str => str.startsWith('_');
const stripUnderscore = str => str.slice(1, str.length);

export const transformPseudo = props => {
  const next = {};
  for (const prop in props) {
    if (hasUnderscore(prop)) {
      const newProp = stripUnderscore(prop);
      next[selectors[newProp]] = props[prop];
    } else {
      next[prop] = props[prop];
    }
  }
  return next;
};

export const selectors = {
  hover: '&:hover, &[data-hover]',
  active: '&:active, &[data-active]',
  focus: '&:focus, &[data-focus]',
  loading: '&[data-loading], &[aria-busy=true]',
  disabled:
    '&:disabled, &[data-disabled], &:disabled:focus, &:disabled:hover, &[aria-disabled=true], &[aria-disabled=true]:focus, &[aria-disabled=true]:hover',
  checked: '&[aria-checked=true], &[data-checked]',
  indeterminate: '&:indeterminate, &[aria-checked=mixed], &[data-mixed]',
  selected: '&[aria-selected=true], &[data-selected]',
  invalid: '&[aria-invalid=true], &[data-invalid]',
  pressed: '&[aria-pressed=true], &[data-pressed]',
  expanded: '&[aria-expanded=true], &[data-expanded]',
  grabbed: '&[aria-grabbed=true], &[data-grabbed]',
  readOnly: '&[aria-readonly=true], &[readonly], &[data-readonly]',
  visited: '&:visited',
  activeLink: '&[aria-current=page]',
  even: '&:nth-of-type(even)',
  odd: '&:nth-of-type(odd)',
  first: '&:first-of-type',
  last: '&:last-of-type',
  notFirst: '&:not(:first-of-type)',
  notLast: '&:not(:last-of-type)',
  groupHover: '[role=group]:hover &',
  before: '&:before',
  after: '&:after',
  focusWithin: '&:focus-within',
  placeholder: '&::placeholder',
  hidden: '&[hidden]',
};

export const pseudo = ({ theme, ...props }) =>
  css({
    [selectors.hover]: tx(props._hover),
    [selectors.focus]: tx(props._focus),
    [selectors.active]: tx(props._active),
    [selectors.visited]: tx(props._visited),
    [selectors.disabled]: tx(props._disabled),
    [selectors.selected]: tx(props._selected),
    [selectors.invalid]: tx(props._invalid),
    [selectors.expanded]: tx(props._expanded),
    [selectors.grabbed]: tx(props._grabbed),
    [selectors.readOnly]: tx(props._readOnly),
    [selectors.first]: tx(props._first),
    [selectors.notFirst]: tx(props._notFirst),
    [selectors.notLast]: tx(props._notLast),
    [selectors.last]: tx(props._last),
    [selectors.odd]: tx(props._odd),
    [selectors.even]: tx(props._even),
    [selectors.indeterminate]: tx(props._indeterminate),
    [selectors.checked]: tx(props._checked),
    [selectors.pressed]: tx(props._pressed),
    [selectors.groupHover]: tx(props._groupHover),
    [selectors.loading]: tx(props._loading),
    [selectors.activeLink]: tx(props._activeLink),
    [selectors.before]: tx(props._before),
    [selectors.after]: tx(props._after),
    [selectors.focusWithin]: tx(props._focusWithin),
    [selectors.placeholder]: props._placeholder,
    [selectors.hidden]: props._hidden,
  })(theme);

export default pseudo;
