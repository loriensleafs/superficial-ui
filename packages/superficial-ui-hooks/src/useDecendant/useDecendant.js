import { useCallback, useMemo, useRef, useReducer } from 'react';
import { useId } from '../useId';
import { useIsomorphicEffect } from '../useIsomorphicEffect';
import { decendantsReducer } from './reducer';

/////////////////////////////////////////////////////////////////////////////

const defaultState = {
  items: [],
  selectedItem: null,
  highlightedItem: null,
};

/////////////////////////////////////////////////////////////////////////////

/**
 * Hook to manage selection and focus in interactive widgets
 * @param initialState The initial state of the selection
 */
export function useDecendants(initialState = {}) {
  const initialDecendantState = { ...defaultState, ...initialState };
  const [state, dispatch] = useReducer(
    decendantsReducer,
    initialDecendantState,
  );

  const actions = {
    register: useCallback(item => dispatch({ type: 'REGISTER', item }), []),
    unregister: useCallback(id => dispatch({ type: 'UNREGISTER', id }), []),
    /**
     * Moves the focus of a specific 'id'.
     * Focus follows the selection if 'selectOnHighlight' is true.
     */
    highlight: useCallback(
      (item, selectOnHighlight) =>
        dispatch({
          type: 'HIGHLIGHT',
          item,
          selectOnHighlight,
        }),
      [],
    ),
    /**
     * Select option with specific id.  If no id is passed, then it'll use the
     * focusedId.
     * Highlight follows selection if 'highlightOnSelect' is true.  Useful for
     * mouse clicks that you need to move focus and selection together on.
     */
    select: useCallback(
      (item, highlightOnSelect) =>
        dispatch({
          type: 'SELECT',
          item,
          highlightOnSelect,
        }),
      [],
    ),
    first: useCallback(action => dispatch({ type: 'FIRST', action }), []),
    last: useCallback(action => dispatch({ type: 'LAST', action }), []),
    /**
     * To reset the state, you need to pass which part you want to reset.
     * By default it'll reset only the highlighted option.
     */
    reset: useCallback(action => dispatch({ type: 'RESET', action }), []),
    search: useCallback(
      (characters, action) =>
        dispatch({
          type: 'SERACH',
          characters,
          action,
        }),
      [],
    ),
    next: useCallback(action => dispatch({ type: 'NEXT', action }), []),
    previous: useCallback(action => dispatch({ type: 'PREVIOUS', action }), []),
  };

  return [state, action];
}

/////////////////////////////////////////////////////////////////////////////

export function useDecendant(props) {
  // You pass the state and action as props.
  const { id: idProp, value, isDisabled, isFocusable, state, actions } = props;

  const { highlightedItem, selectedItem } = state;
  const { register, unregister } = action;

  // Generate a unique id or use the id prop.
  const id = useId(`descendant`, idProp);

  // Generate a reference to the descendant's DOM element.
  const ref = useRef(null);

  // Check if this descendant is highlighted.
  const isHighlighted = highlightedItem ? highlightedItem.id === id : false;

  // Memoize the descendant to improve performance.
  const item = useMemo(() => ({ id, ref, value }), [id, ref, value]);

  // Ideally, we'd run this effect using `useLayoutEffect` but to
  // support SSR, we'll use `useEffect` on the server.
  useIsomorphicEffect(() => {
    // Don't register this descendant if it's disabled and not focusable.
    if (isDisabled && !isFocusable) return;

    // Otherwise, register the descendant.
    register(item);

    // When it unmounts, unregister the decendant.
    return () => {
      unregister(id);
    };
  }, [isDisabled, isFocusable]);

  return { item, isHighlighted, isSelected };
}

/////////////////////////////////////////////////////////////////////////////
