import { debounce } from '@superficial-ui/utils';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Modal } from '../Modal';
import { ownerDocument, ownerWindow } from '../Modal/utils';
import { Paper } from '../Paper';
import { Scale } from '../Scale';
import {
  getAnchorEl,
  getOffsetLeft,
  getOffsetTop,
  getScrollParent,
  getTransformOriginValue,
} from './utils';

/* -------------------------------------------------------------------------- */
/*                              POPOVER COMPONENT                             */
/* -------------------------------------------------------------------------- */

export const Popover = React.forwardRef(
  (
    {
      action,
      anchorEl,
      anchorOrigin,
      anchorPosition,
      anchorReference,
      children,
      container: containerProp,
      getContentAnchorEl,
      isOpen,
      marginThreshold,
      onClose,
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExited,
      onExiting,
      shadow,
      transformOrigin,
      TransitionComponent,
      sx,
      ...props
    },
    forwardedRef,
  ) => {
    const paperRef = React.useRef();

    /* -------------------------------------------------------------------------- */

    /** Returns the top/left offsets of the position used to attach the anchor. */
    const getAnchorOffset = React.useCallback(
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
            anchorRect.left +
            getOffsetLeft(anchorRect, anchorOrigin.horizontal),
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

    /* -------------------------------------------------------------------------- */

    /** Returns the inner content vertical offset that is used to anchor the transform. */
    const getContentAnchorOffset = React.useCallback(
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

    /* -------------------------------------------------------------------------- */

    /** Returns the base transform origin using the element and content anchor offset. */
    const getTransformOrigin = React.useCallback(
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

    /* -------------------------------------------------------------------------- */

    const getPositioningStyle = React.useCallback(
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

    /* -------------------------------------------------------------------------- */

    const setPositioningStyles = React.useCallback(
      element => {
        const positioning = getPositioningStyle(element);

        if (positioning.top !== null) {
          element.style.top = positioning.top;
        }

        if (positioning.left !== null) {
          element.style.left = positioning.left;
        }

        element.style.transformOrigin = positioning.transformOrigin;
      },
      [getPositioningStyle],
    );

    /* -------------------------------------------------------------------------- */

    const handleEntering = element => {
      if (onEntering) {
        onEntering(paperRef.current);
      }

      setPositioningStyles(paperRef.current);
    };

    /* -------------------------------------------------------------------------- */

    const updatePosition = React.useMemo(() => {
      if (!isOpen) return undefined;

      return debounce(() => {
        setPositioningStyles(paperRef.current);
      });
    }, [isOpen, setPositioningStyles]);

    /* -------------------------------------------------------------------------- */

    React.useImperativeHandle(
      action,
      () => (isOpen ? { updatePosition } : null),
      [isOpen, updatePosition],
    );

    /* -------------------------------------------------------------------------- */

    React.useEffect(() => {
      if (!updatePosition) return undefined;

      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('resize', updatePosition);
        updatePosition.clear();
      };
    }, [updatePosition]);

    /* -------------------------------------------------------------------------- */

    /**
     * If the container prop is provided, use it.
     * If the anchorEl prop is provided, use it's parent body element as the container.
     * If neither are provided let the Modal take care of choosing the container.
     */
    const container =
      containerProp ||
      (anchorEl ? ownerDocument(getAnchorEl(anchorEl)).body : undefined);

    /* -------------------------------------------------------------------------- */

    return (
      <Modal
        backdropIsHidden
        container={container}
        isOpen={isOpen}
        onClose={onClose}
        ref={forwardedRef}
        {...props}
      >
        <TransitionComponent
          as={Paper}
          data-ui-test='Popover'
          in={isOpen}
          onEnter={onEnter}
          onEntered={onEntered}
          onEntering={handleEntering}
          onExit={onExit}
          onExited={onExited}
          onExiting={onExiting}
          ref={paperRef}
          shadow={shadow}
          sx={{
            position: 'absolute',
            overflowX: 'hidden',
            overflowY: 'auto',
            minWidth: 'lg',
            maxWidth: 'calc(100% - 32px)',
            minHeight: 'lg',
            maxHeight: 'calc(100% - 32px)',
            outline: '0px',
            ...sx,
          }}
        >
          {children}
        </TransitionComponent>
      </Modal>
    );
  },
);
Popover.uiName = 'Popover';
Popover.displayName = 'Popover';
Popover.defaultProps = {
  anchorOrigin: { vertical: 'top', horizontal: 'left' },
  anchorReference: 'anchorEl',
  marginThreshold: 16,
  shadow: '2xl',
  transformOrigin: { vertical: 'top', horizontal: 'left' },
  TransitionComponent: Scale,
};
Popover.propTypes = {
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * The DOM element, or function that returns the DOM element, that will
   * be used to set the **position** of the `<Popover>`.
   */
  anchorEl: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.element,
    PropTypes.node,
  ]),
  /**
   * The point on the anchor where the popover's `anchorEl` will attach to.
   *
   * * *This is not used when the anchorReference is `anchorPosition`.*
   *
   * **Options**
   *
   * * vertical - *top | center | bottom *
   * * horizontal - *left | center | right *
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['left', 'center', 'right']),
    ]),
    vertical: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['top', 'center', 'bottom']),
    ]),
  }),
  /**
   * The position that may be used to set the position of the `<Popover>`.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
  }),
  /**
   * Which anchor prop to refer to when setting the position of the `<Popover>`.
   */
  anchorReference: PropTypes.oneOf(['anchorEl', 'anchorPosition', 'none']),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * A node, component instance, or function that returns either a node or component instance.
   * The `container` will be passed to the `<Modal>` component.
   * By default it uses the body of the anchorEl's top-level document object (which means
   * most of the time it will be `document.body`).
   */
  container: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.func,
  ]),
  /**
   * A function that is called in order to retrieve the content anchor element.
   * It is the opposite of the `anchorEl` prop.
   *
   * * *The content anchor element should be an element inside of the `<Popover>`.*
   * * *It is used to correctly scroll and set the position of the `<Popover>`.*
   * * *The positioning strategy tries to make the content anchor element just above the anchor element.*
   */
  getContentAnchorEl: PropTypes.func,
  /**
   * If `true`, the `<Popover>` will be visible.
   */
  isOpen: PropTypes.bool,
  /**
   * How close to the edge of the window the `<Popover>` can appear.
   */
  marginThreshold: PropTypes.number,
  onEnter: PropTypes.func,
  onEntered: PropTypes.func,
  onEntering: PropTypes.func,
  onExit: PropTypes.func,
  onExited: PropTypes.func,
  onExiting: PropTypes.func,
  shadow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The point on the `<Popover>` which will attach to the anchor's origin.
   *
   * **Options**
   *
   * * vertical -  *top | center | bottom | x(px)*
   * * horizontal - *left | center | right | x(px)*
   */
  transformOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['left', 'center', 'right']),
    ]),
    vertical: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['top', 'center', 'bottom']),
    ]),
  }),
  /**
   * The component used to transition the `<Popover>` in and out.
   */
  TransitionComponent: PropTypes.elementType,
};
