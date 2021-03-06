import { runIfFn } from '@superficial-ui/utils';
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
  useIsomorphicEffect,
  useMemo,
} from 'react';
import { usePopoverContext } from './_Popover';

////////////////////////////////////////////////////////////////////////////////

function getOffsetTop(rect, vertical) {
  let offset = 0;
  if (typeof vertical === 'number') {
    offset = vertical;
  } else if (vertical === 'center') {
    offset = rect.height / 2;
  } else if (vertical === 'bottom') {
    offset = rect.height;
  }
  return offset;
}

////////////////////////////////////////////////////////////////////////////////

function getOffsetLeft(rect, horizontal) {
  let offset = 0;
  if (typeof horizontal === 'number') {
    offset = horizontal;
  } else if (horizontal === 'center') {
    offset = rect.width / 2;
  } else if (horizontal === 'right') {
    offset = rect.width;
  }
  return offset;
}

////////////////////////////////////////////////////////////////////////////////

function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical]
    .map(n => (typeof n === 'number' ? `${n}px` : n))
    .join(' ');
}

////////////////////////////////////////////////////////////////////////////////

function getScrollParent(parent, child) {
  let element = child;
  let scrollTop = 0;

  while (element && element !== parent) {
    element = element.parentElement;
    scrollTop += element.scrollTop;
  }

  return scrollTop;
}

////////////////////////////////////////////////////////////////////////////////

function getAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

////////////////////////////////////////////////////////////////////////////////

/**
 * A hook for managing the position of a Popover.
 * @param {bool} isOpen
 * @param {node} container
 * @param {node} anchorRef
 * @param {Object} anchorOrigin
 *  @param {string} anchorOrigin.horizontal
 *  @param {string} anchorOrigin.vertical
 * @param {Object} anchorPosition
 *  @param {string} anchorPosition.horizontal
 *  @param {string} anchorPosition.vertical
 * @param {string} anchorReference
 * @param {Object} transformOrigin
 *  @param {string} transformOrigin.horizontal
 *  @param {string} transformOrigin.vertical
 */
export function usePopoverPosition(props = {}) {
  const popover = usePopoverContext();
  const [position, updatePosition] = useState({});

  /* ------------------------------------------------------------------------ */

  const getAnchorOffset = useCallback(
    contentAnchorOffset => {
      if (anchorReference === 'anchorPosition') {
        return anchorPosition;
      }

      const resolvedAnchorEl = getAnchorEl(anchorEl);
      const containerWindow = ownerWindow(resolvedAnchorEl);

      /** Use the parent body element of this Popover if no anchor element was provided. */
      const anchorElement =
        resolvedAnchorEl instanceof containerWindow.Element
          ? resolvedAnchorEl
          : ownerDocument(paperRef.current).body;
      const anchorRect = anchorElement.getBoundingClientRect();
      const anchorVertical =
        contentAnchorOffset === 0 ? anchorOrigin.vertical : 'center';

      return {
        top: anchorRect.top + getOffsetTop(anchorRect, anchorVertical),
        left:
          anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal),
      };
    },
    [
      anchorEl,
      anchorOrigin.horizontal,
      anchorOrigin.vertical,
      anchorPosition,
      anchorReference,
    ],
  );

  /* ------------------------------------------------------------------------ */

  const getContentAnchorOffset = useCallback(
    element => {
      let contentAnchorOffset = 0;

      if (getContentAnchorEl && anchorReference === 'anchorEl') {
        const contentAnchorEl = getContentAnchorEl(element);

        if (contentAnchorEl && element.contains(contentAnchorEl)) {
          const scrollTop = getScrollParent(element, contentAnchorEl);
          contentAnchorOffset =
            contentAnchorEl.offsetTop +
              contentAnchorEl.clientHeight / 2 -
              scrollTop || 0;
        }
      }

      return contentAnchorOffset;
    },
    [anchorOrigin.vertical, anchorReference, getContentAnchorEl],
  );

  /* ------------------------------------------------------------------------ */

  // The base transform origin. Offset of the element and content anchor.
  const getTransformOrigin = useCallback(
    (elemRect, contentAnchorOffset = 0) => {
      return {
        vertical:
          getOffsetTop(elemRect, transformOrigin.vertical) +
          contentAnchorOffset,
        horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal),
      };
    },
    [transformOrigin.horizontal, transformOrigin.vertical],
  );

  /* ------------------------------------------------------------------------ */

  const getPositionStyle = useCallback(
    element => {
      /** Check if the parent has requested anchoring on an inner content node. */
      const contentAnchorOffset = getContentAnchorOffset(element);
      const elemRect = {
        width: element.offsetWidth,
        height: element.offsetHeight,
      };

      /** Get the transform origin point on the element itself. */
      const elemTransformOrigin = getTransformOrigin(
        elemRect,
        contentAnchorOffset,
      );

      if (anchorReference === 'none') {
        return {
          top: null,
          left: null,
          transformOrigin: getTransformOriginValue(elemTransformOrigin),
        };
      }

      /** Get the offset of the anchoring element. */
      const anchorOffset = getAnchorOffset(contentAnchorOffset);

      /** Calculate the element positioning. */
      let top = anchorOffset.top - elemTransformOrigin.vertical;
      let left = anchorOffset.left - elemTransformOrigin.horizontal;
      const bottom = top + elemRect.height;
      const right = left + elemRect.width;

      /** Use the parent window of the anchorEl (if provided). */
      const containerWindow = ownerWindow(getAnchorEl(anchorEl));

      /** Window thresholds, taking required margin into account. */
      const heightThreshold = containerWindow.innerHeight - marginThreshold;
      const widthThreshold = containerWindow.innerWidth - marginThreshold;

      /** Check if the vertical axis needs to be shifted. */
      if (top < marginThreshold) {
        const diff = top - marginThreshold;
        top -= diff;
        elemTransformOrigin.vertical += diff;
      } else if (bottom > heightThreshold) {
        const diff = bottom - heightThreshold;
        top -= diff;
        elemTransformOrigin.vertical += diff;
      }

      /** Check if the horizontal axis needs to be shifted. */
      if (left < marginThreshold) {
        const diff = left - marginThreshold;
        left -= diff;
        elemTransformOrigin.horizontal += diff;
      } else if (right > widthThreshold) {
        const diff = right - widthThreshold;
        left -= diff;
        elemTransformOrigin.horizontal += diff;
      }

      return {
        top: `${Math.round(top)}px`,
        left: `${Math.round(left)}px`,
        transformOrigin: getTransformOriginValue(elemTransformOrigin),
      };
    },
    [
      anchorEl,
      anchorReference,
      getAnchorOffset,
      getContentAnchorOffset,
      getTransformOrigin,
      marginThreshold,
    ],
  );

  /* ------------------------------------------------------------------------ */

  useIsomorphicEffect(() => {}, [position]);

  /* ------------------------------------------------------------------------ */

  useIsomorphicEffect(() => {
    if (!popover.content.ref || !props.eventsEnabled) return;
    popover.content.ref.addEventListener('resize', updatePosition);
    return () => {
      popover.content.ref.removeEventListener('resize', updatePosition);
    };
  }, [popover.content.ref, props.eventsEnabled]);

  /* ------------------------------------------------------------------------ */

  useIsomorphicEffect(() => {
    if (popover.isOpen && popover.content.ref.current) {
      updatePosition();
    }
  }, [popover.isOpen, popover.content.ref]);
}

////////////////////////////////////////////////////////////////////////////////
