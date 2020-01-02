/** @jsx jsx */
import {
  useBlurOutside,
  useDisclosure,
  useFocusOnHide,
  useFocusOnShow,
  useIds,
  useMergeRefs,
} from '@superficial-ui/hooks';
import { jsx } from '@superficial-ui/system';
import {
  composeEventHandlers,
  createContext,
  createOnKeyDown,
} from '@superficial-ui/utils';
import { cloneElement, useLayoutEffect, useRef } from 'react';
import FocusLock from 'react-focus-lock';
import { Box } from '../Box';

////////////////////////////////////////////////////////////////////////////////

/**
 * PopoverContext interface
 * @prop {string} headerId
 * @prop {string} bodyId
 * @prop {Object} options
 *  @prop {boolean} options.closeOnEsc
 *  @prop {boolean} options.closeOnBlur
 *  @prop {boolean} options.matchTriggerWidth
 *  @prop {boolean} options.usePortal
 *  @prop {boolean} options.returnFocusOnClose
 *  @prop {boolean} options.tripFocus
 * @prop {Object} anchor
 *  @prop {object} anchor.ref
 * @prop {Object} trigger
 *  @prop {string} trigger.id
 *  @prop {object} trigger.ref
 * @prop {Object} content
 *  @prop {string} content.id
 *  @prop {object} content.ref
 */
const [PopoverProvider, usePopoverContext] = createContext();

////////////////////////////////////////////////////////////////////////////////

export function usePopoverPosition(props = {}) {
  const popover = usePopoverContext();
  const _ref = useMergeRefs(popover.contentRef);
}

////////////////////////////////////////////////////////////////////////////////

export function usePopoverTrigger(props = {}, ref) {
  const popover = usePopoverContext();
  const _ref = useMergeRefs(popover.trigger.ref, popover.onToggle, ref);

  return {
    ref: _ref,
    'aria-haspopup': 'dialog',
    'aria-expanded': popover.isOpen,
    'aria-controls': popover.trigger.id,
    onClick: composeEventHandlers(props.onClick, popover.onToggle),
  };
}

////////////////////////////////////////////////////////////////////////////////

/**
 * Hook for PopoverContent
 * @param {Object} props
 *  @param {func} props.onBlur
 *  @param {func} props.onKeyDown
 *  @param {gutter} props.gutter
 * @param {node} ref
 */
export function usePopoverContent(props, ref) {
  const popover = usePopoverContent();
  const _ref = useMergeRefs(popover.content.ref, ref);

  const onBlur = useBlurOutside(popover.trigger.ref, popover.content.ref, {
    action: popover.onClose,
    visible: popover.isOpen,
  });

  const onKeyDown = createOnKeyDown({
    keyMap: {
      Escape: popover.onClose,
    },
  });

  return {
    ref: _ref,
    'aria-hidden': !popover.isOpen,
    hidden: !popover.content.id,
    tabIndex: -1,
    id: popover.content.id,
    role: 'dialog',
    //'data-placement': pop
    // style:
    onBlur: composeEventHandlers(props.onBlur, onBlur),
    onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
    'aria-modal': false,
    'aria-labelledby': popover.headerId,
    'aria-describedby': popover.bodyId,
  };
}

////////////////////////////////////////////////////////////////////////////////

/**
 * Hook for managing Popover component state.
 * @param {Object} props
 * @param {string} props.id
 * @param {boolean} props.isOpen
 * @param {boolean} props.defaultIsOpen
 * @param {object} props.initialFocusRef
 * @param {hover|click} props.trigger
 * @param {boolean} props.returnFocusOnClose
 * @param {number} props.gutter
 * @param {string} props.placement
 * @param {boolean} props.closeOnBlur
 * @param {boolean} props.closeOnEsc
 * @param {function} props.onOpen
 * @param {function} props.onClose
 * @param {boolean} props.matchTriggerWidth
 * @param {boolean} props.usePortal
 * @param {boolean} props.trapFocus
 */
export function usePopover(props) {
  const disclosure = useDisclosure(props);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  const [triggerId, contentId, headerId, bodyId] = useIds(
    'popover-trigger',
    'popover-content',
    'popover-header',
    'popover-body',
  );

  // hook for position management that isn't freaking popper.

  // Update the popover position
  useLayoutEffect(() => {}, [disclosure.isOpen]);

  /**
   * Manage focus when the popover closes.
   * This is necessary in situations where you open a popover,
   * and you click outside it on a 'tabbable' element.
   * In this scenario, focus should not return to the popover
   * trigger, but should remain on the element you clicked on.
   */
  useFocusOnHide(contentRef, {
    autoFocus: true,
    visible: disclosure.isOpen,
    focusRef: triggerRef,
  });

  /**
   * Manage focus when the popover opens.
   */
  useFocusOnShow(contentRef, {
    autoFocus: true,
    visible: disclosure.isOpen,
    focusRef: props.initialFocusRef,
  });

  return {
    ...disclosure,
    headerId,
    bodyId,
    options: {
      closeOnEsc: !!props.closeOnEsc,
      closeOnBlur: !!props.closeOnBlur,
      matchTriggerWidth: !!props.matchTriggerWidth,
      usePortal: !!props.usePortal,
      returnFocusOnClose: !!props.returnFocusOnClose,
      trapFocus: !!props.trapFocus,
    },
    trigger: {
      id: triggerId,
      ref: triggerRef,
    },
    content: {
      id: contentId,
      ref: contentRef,
    },
  };
}

////////////////////////////////////////////////////////////////////////////////

/**
 * Popover component
 * - usePopover for interface.
 */
export function Popover(props) {
  const popover = usePopover(props);
  return <PopoverProvider value={popover}>{props.children}</PopoverProvider>;
}

////////////////////////////////////////////////////////////////////////////////

export function PopoverTrigger(props, ref) {
  const trigger = usePopoverTrigger(props, ref);
  return cloneElement(props.children, trigger);
}

////////////////////////////////////////////////////////////////////////////////

export function PopoverContent(props, ref) {
  const content = usePopoverContent(props, ref);
  const popover = usePopoverContext();

  return (
    <Box
      ref={content.ref}
      as='section'
      borderWidth='1px'
      width='100%'
      position='relative'
      display='flex'
      flexDirection='column'
      rounded='md'
      shadow='sm'
      maxWidth='xs'
      bg='white'
      sx={{
        _focus: {
          outline: 0,
          shadow: 'outline',
        },
      }}
    >
      <FocusLock persistentFocus={false} disabled={!popover.options.trapFocus}>
        {props.children}
      </FocusLock>
    </Box>
  );
}

////////////////////////////////////////////////////////////////////////////////

export const PopoverHeader = props => {
  const { headerId } = usePopoverContent();
  return (
    <Box
      as='header'
      id={headerId}
      px={3}
      py={2}
      borderBottomWidth='1px'
      {...props}
    />
  );
};

////////////////////////////////////////////////////////////////////////////////

export const PopoverFooter = props => (
  <Box as='footer' px={3} py={2} borderTopWidth='1px' {...props} />
);

////////////////////////////////////////////////////////////////////////////////

export const PopoverBody = props => {
  const { bodyId } = usePopoverContext();
  return <Box id={bodyId} flex='1' px={3} py={2} {...props} />;
};

////////////////////////////////////////////////////////////////////////////////

export function usePopoverState() {
  const popover = usePopoverContext();
  return { isOpen: popover.isOpen, onClose: popover.onClose };
}

////////////////////////////////////////////////////////////////////////////////
