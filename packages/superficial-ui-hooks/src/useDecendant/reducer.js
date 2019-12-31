import { getNextIndex, getNextOptionFromKeys } from './utils';

////////////////////////////////////////////////////////////////

function insertItem(array, item, index) {
  return [...array.slice(0, index), item, ...array.slice(index)];
}

////////////////////////////////////////////////////////////////

function register(state, action) {
  const { item: newItem } = action;

  if (state.items.length === 0) {
    return {
      ...state,
      items: [newItem],
      ...action(
        state.highlightFirstItemOnMount && {
          highlightedItem: newItem,
        },
      ),
      ...action(
        state.selectFirstItemOnMount && {
          selectedItem: newItem,
        },
      ),
    };
  }

  const index = state.items.indexOf(newItem);
  if (index >= 0) return state;

  const indexToInsetAt = state.items.findIndex(item => {
    if (!item.ref.current || !newItem.ref.current) return false;

    return Boolean(
      item.ref.current.compareDocumentPosition(newItem.ref.current) &
        Node.DOCUMENT_POSITION_PRECEDING,
    );
  });

  if (indexToInsetAt === -1) {
    return {
      ...state,
      items: [...state.items, newItem],
    };
  }

  return {
    ...state,
    items: insertItem(state.items, newItem, indexToInsetAt),
  };
}

////////////////////////////////////////////////////////////////

function unRegister(state, action) {
  const { id } = action;
  const newItems = state.items.filter(item => item.id !== id);

  if (newItems.length === state.items.length) {
    return state;
  }

  return {
    ...state,
    selectedItem: state.selectedItem
      ? newItems.length === 0
        ? null
        : newItems[0]
      : state.selectedItem,
    items: newItems,
  };
}

////////////////////////////////////////////////////////////////

function highlight(state, action) {
  const { item, selectOnHighlight } = action;
  if (!item) return state;

  const nextState = {
    ...state,
    highlightedItem: item,
  };

  if (selectOnHighlight) {
    nextState['selectedItem'] = item;
  }

  return nextState;
}

////////////////////////////////////////////////////////////////

function select(state, action) {
  const { item, highlightOnSelect } = action;
  const nextItem = item != null ? item : state.highlightedItem;

  if (!nextItem) return state;

  const newState = {
    ...state,
    selectedItem: nextItem,
  };

  if (highlightOnSelect) {
    newState['highlightedItem'] = item;
  }

  return newState;
}

/////////////////////////////////////////////////////////////////////////////

export function nextOrPrevious(state, action, type) {
  const { loop, action: keyAction } = action;
  const currentItem =
    keyAction === 'select' ? state.selectedItem : state.highlightedItem;

  if (!currentItem) return state;

  const index = state.items.indexOf(currentItem);

  const nextIndex = getNextIndex({
    currentIndex: index,
    itemsLength: state.items.length,
    loop: loop || true,
    step: type === 'next' ? 1 : -1,
  });

  const nextItem = state.items[nextIndex];

  if (keyAction === 'select') {
    return select(state, { item: nextItem });
  } else {
    return highlight(state, { item: nextItem });
  }
}

////////////////////////////////////////////////////////////////

export function firstOrLast(state, action, type) {
  const { action: keyAction } = action;
  const nextItem =
    type === 'first' ? state.items[0] : state.items[state.items.length - 1];

  if (!nextItem) return state;

  if (keyAction === 'select') {
    return select(state, { item: nextItem });
  } else {
    return highlight(state, { item: nextItem });
  }
}

////////////////////////////////////////////////////////////////

export function reset(state, action) {
  const { action: keyAction } = action;
  const newState = { ...state };

  if (keyAction === 'highlighted' || keyAction === 'both') {
    newState['highlightedItem'] = null;
  }

  if (keyAction === 'selected' || keyAction === 'both') {
    newState['selectedItem'] = null;
  }

  return newState;
}

////////////////////////////////////////////////////////////////

export function search(state, action) {
  const { characters, action: keyAction } = action;
  const currentItem =
    keyAction === 'select' ? state.selectedItem : state.highlightedItem;

  const nextOption = getNextOptionFromKeys({
    items: state.items,
    searchString: characters || '',
    itemToString: item => {
      if (!item) return '';
      return item.ref.current.textContent || String(item.value);
    },
    currentValue: currentItem,
  });

  if (!nextOption) return state;

  const nextState = { ...state };
  if (keyAction === 'select') {
    nextState['selectedItem'] = nextOption;
  } else {
    nextState['highlightedItem'] = nextOption;
  }

  return nextState;
}

////////////////////////////////////////////////////////////////

export function descendantsReducer(state, action) {
  switch (action.type) {
    case 'REGISTER':
      return register(state, action);
    case 'UNREGISTER':
      return unRegister(state, action);
    case 'PREVIOUS':
      return nextOrPrevious(state, action, 'previous');
    case 'NEXT':
      return nextOrPrevious(state, action, 'next');
    case 'HIGHLIGHT':
      return highlight(state, action);
    case 'SELECT':
      return select(state, action);
    case 'RESET':
      return reset(state, action);
    case 'SEARCH':
      return search(state, action);
    case 'FIRST':
      return firstOrLast(state, action, 'first');
    case 'LAST':
      return firstOrLast(state, action, 'last');
    default:
      throw new Error('Reducer called without proper action type.');
  }
}
