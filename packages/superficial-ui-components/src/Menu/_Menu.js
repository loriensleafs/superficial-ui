/** @jsx jsx */
import {
  useDisclosure,
  useMergeRefs,
  useIds,
  useDescendant,
  useDescendants,
  useBlurOutside,
  useFocusOnHide,
  useIsomorphicEffect,
} from '@superficial-ui/hooks';
import {
  createContext,
  createOnKeyDown,
  composeEventHandlers,
  ensureFocus,
} from '@superficial-ui/utils';
import React, { forwardRef, useEffect, useRef, useLayoutEffect } from 'react';

////////////////////////////////////////////////////////////////////////////////

function useFocusOnShow(menuRef, decendants, options) {
  const [state, actions] = decendants;

  useIsomorphicEffect(() => {
    if (options.visible && options.activeIndex && state.items.length) {
      actions.highlight(state.items[options.activeIndex]);
    }
    if (!options.autoSelect && options.visible) {
      ensureFocus(menuRef.current);
    }
  }, [options.visible, options.autoSelect, state.items]);
}

////////////////////////////////////////////////////////////////////////////////

function useMenu(props) {
  const { autoSelect, closeOnSelect, closeOnBlur } = props;
  // Manages the open and close states.
  const disclosure = useDisclosure(props);

  // Generate unique ids for components
  const [menuId, buttonId] = useIds('menu', 'menubutton');
}

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
