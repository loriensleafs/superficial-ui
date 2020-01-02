/** @jsx jsx */
import { keyframes } from '@emotion/core';
import { forwardRef, jsx } from '@superficial-ui/system';
import { Box } from '../Box';

const spin = keyframes({
  from: {
    trasnform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

export const Spinner = forwardRef(
  (
    {
      color = 'primary',
      duration = 500,
      max = 1,
      size = 'md',
      strokeWidth = 3,
      isCentered,
      title = 'Loading...',
      ...props
    },
    ref,
  ) => {
    const r = 16 - strokeWidth;
    const C = 2 * r * Math.PI;
    const offset = C - (1 / 4) * C;

    return (
      <Box
        as='svg'
        fill='none'
        ref={ref}
        role='img'
        stroke='currentColor'
        strokeWidth={strokeWidth}
        viewBox='0 0 32 32'
        {...props}
        __css={{
          color,
          overflow: 'visible',
          ...(size === 'sm' && {
            h: '24px',
            w: '24px',
          }),
          ...(size === 'md' && {
            h: '32px',
            w: '32px',
          }),
          ...(size === 'lg' && {
            h: '48px',
            w: '48px',
          }),
          ...(isCentered && {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate3d(-50%,-50%,0)',
          }),
        }}
      >
        <title>{title}</title>
        <circle cx={16} cy={16} r={r} opacity={1 / 8} />
        <Box
          as='circle'
          cx={16}
          cy={16}
          r={r}
          strokeDasharray={C}
          strokeDashoffset={offset}
          __css={{
            transformOrigin: '50% 50%',
            animationName: spin.toString(),
            animationTimingFunction: 'linear',
            animationDuration: duration + 'ms',
            animationIterationCount: 'infinite',
          }}
        />
      </Box>
    );
  },
);
Spinner.uiName = 'Spinner';
Spinner.displayName = 'Spinner';
