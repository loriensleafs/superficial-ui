import { get } from '@superficial-ui/utils';
import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { Ripple } from './Ripple';
import { Ripples } from './Ripples';

const getRect = ({
  isCentered: isCenteredProp = false,
  isPulsating = false,
  rect,
  x = 0,
  y = 0,
}) => {
  const { width = 0, height = 0, left = 0, top = 0 } = rect || {};
  const isCentered = isPulsating || isCenteredProp;
  let rippleX;
  let rippleY;
  let rippleSize;

  if (isCentered || (x === 0 && y === 0)) {
    rippleX = Math.round(width / 2);
    rippleY = Math.round(height / 2);
  } else {
    rippleX = Math.round(x - left);
    rippleY = Math.round(y - top);
  }

  if (isCentered) {
    rippleSize = Math.sqrt((2 * width ** 2 + height ** 2) / 3);
    if (rippleSize % 2 === 0) {
      rippleSize += 1;
    }
  } else {
    const sizeX = Math.max(Math.abs(width - rippleX), rippleX) * 2 + 2;
    const sizeY = Math.max(Math.abs(height - rippleY), rippleY) * 2 + 2;
    rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
  }

  return {
    top: -(rippleSize / 2) + rippleY + 'px',
    left: -(rippleSize / 2) + rippleX + 'px',
    width: rippleSize + 'px',
    height: rippleSize + 'px',
  };
};

let nextKey = 0;

/**
 * Renders animated ripples inside of a container component.
 * @param  {string} [color=currentColor] - The background color of the ripple.
 * @param  {number} [duration=0.55] - The amount of time it takes the ripple animation to play through.
 * @param  {boolean} [isCentered=false] - If true the origin of the ripple is the center of container element.
 */
export const useRipples = ({
  color = 'currentColor',
  duration = 0.55,
  isCentered = false,
} = {}) => {
  const [ripples, setRipples] = React.useState([]);
  const ignoreFocusEvent = React.useRef(false);

  const addRipple = React.useCallback(
    (event, options = {}) => {
      const { isPulsing = false, isCentered = isCentered } = options;
      const rect = event.currentTarget.getBoundingClientRect().toJSON();
      const x = get(event, 'clientX', get(event, 'touches.0.clientX', 0));
      const y = get(event, 'clientY', get(event, 'touches.0.clientY', 0));

      nextKey = nextKey + 1;
      setRipples([
        ...ripples,
        {
          key: `ripple-${nextKey}`,
          isCentered,
          isPulsing,
          rect: getRect({ isPulsing, isCentered, rect, x, y }),
        },
      ]);
    },
    [isCentered, setRipples, nextKey],
  );

  const removeRipple = React.useCallback(
    event => setRipples(ripples.length > 0 ? ripples.slice(1) : ripples),
    [setRipples, ripples],
  );

  const handleMouseDown = React.useCallback(event => {
    if (ignoreFocusEvent.current) return;
    ignoreFocusEvent.current = true;
    addRipple(event, { isCentered });
  }, []);

  const handleMouseUp = React.useCallback(event => {
    ignoreFocusEvent.current = false;
    removeRipple(event);
  }, []);

  const handleFocus = React.useCallback(event => {
    if (ignoreFocusEvent.current) return;
    ignoreFocusEvent.current = true;
    addRipple(event, { isCentered: true, isPulsing: true });
  }, []);

  const handleBlur = React.useCallback(event => {
    ignoreFocusEvent.current = false;
    removeRipple(event);
  }, []);

  return {
    addRipple,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    removeRipple,
    ripples: (
      <Ripples>
        <AnimatePresence>
          {ripples.map(ripple => (
            <Ripple
              color={color}
              duration={duration}
              isCentered={isCentered ? isCentered : ripple.isCentered}
              isPulsing={ripple.isPulsing}
              key={ripple.key}
              rect={ripple.rect}
            />
          ))}
        </AnimatePresence>
      </Ripples>
    ),
  };
};
