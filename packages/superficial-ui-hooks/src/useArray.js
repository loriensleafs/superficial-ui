import { useCallback, useState } from 'react';
import { useControllableProp } from './useControllableProp';

export function useArray(props) {
  const {
    onChange,
    defaultValue,
    value: valueProp,
    max,
    keepWithinMax = true,
  } = props;
  const [valueState, setValue] = useState(defaultValue || []);
  const [isControlled, value] = useControllableProp(valueProp, valueState);

  const isAtMax = Boolean(max && value.length === max);
  const isOutOfRange = Boolean(max && value.length > max);

  /**
   * Update the array state.
   */
  const updateState = useCallback(
    nextState => {
      if (max && nextState.length > max && keepWithinMax) {
        return;
      }
      if (!isControlled) setValue(nextState);
      if (onChange) onChange(nextState);
    },
    [isControlled, onChange, max, keepWithinMax],
  );

  /**
   * Move an element in an array to another index.
   */
  const move = useCallback(
    (from, to) => {
      const nextState = [...value];
      const fromValue = nextState[from];

      nextState.splice(from, 1);
      nextState.splice(to, 0, fromValue);

      updateState(nextState);
    },
    [value, updateState],
  );

  /**
   * Add new value(s) to the end of an array.
   */
  const add = useCallback(
    (...items) => {
      updateState([...value, ...items]);
    },
    [value, updateState],
  );

  /**
   * Blow away the state and replace it by setting it with the passed items.
   */
  const set = useCallback(
    newValue => {
      updateState(newValue);
    },
    [updateState],
  );

  /**
   * Empty the list.
   */
  const clear = useCallback(() => {
    updateState([]);
  }, [updateState]);

  /**
   * Reset the list to the initial value.
   */
  const reset = useCallback(() => {
    updateState(defaultValue || []);
  }, [defaultValue, updateState]);

  /**
   * Swap two values in an array.
   */
  const swap = useCallback(
    (indexA, indexB) => {
      const nextState = [...value];
      const indexAValue = nextState[indexA];
      nextState[indexA] = nextState[indexB];
      nextState[indexB] = indexAValue;
      updateState(nextState);
    },
    [value, updateState],
  );

  /**
   * Insert an element at a given index into the array.
   */
  const insertAt = useCallback(
    (index, item) => {
      const nextState = [...value];
      nextState.splice(index, 0, item);
      updateState(nextState);
    },
    [value, updateState],
  );

  /**
   * Remove an element at an index of an array.
   */
  const removeAt = useCallback(
    index => {
      const nextState = [...value].filter((_, idx) => index !== idx);
      updateState(nextState);
      return value[index];
    },
    [updateState, value],
  );

  /**
   * Remove and return value from the end of the array.
   */
  const pop = useCallback(() => {
    const nextState = [...value];
    const poppedItem = nextState.pop();
    updateState(nextState);
    return poppedItem;
  }, [value, updateState]);

  /**
   * Add an element to the beginning of an array and return it's length.
   */
  const unshift = useCallback(() => {
    const nextState = [...value];
    const newLength = nextState.unshift();
    updateState(nextState);
    return newLength;
  }, [value, updateState]);

  /**
   * Replace a value at an index of an array.
   */
  const replace = useCallback(
    (index, item) => {
      const nextState = [...value];
      nextState[index] = item;
      updateState(nextState);
    },
    [value, updateState],
  );

  return {
    add,
    clear,
    insertAt,
    isAtMax,
    isEmpty: Boolean(value.length),
    isOutOfRange,
    move,
    pop,
    removeAt,
    replace,
    reset,
    set,
    swap,
    unshift,
    value,
  };
}

export default useArray;
