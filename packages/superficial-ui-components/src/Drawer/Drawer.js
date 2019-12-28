import * as React from 'react';

const Overlay = ({ onClick }) => (
  <div
    onClick={onClick}
    sx={{
      zIndex: 2,
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }}
  />
);

export const Drawer = React.forwardRef(
  ({ children, open, side = 'left', ...props }, ref) => {
    return (
      <>
        {open && <Overlay {...props} />}
        <div
          ref={ref}
          {...props}
          sx={{
            boxSizing: 'border-box',
            zIndex: 2,
            position: 'fixed',
            top: side === 'bottom' ? 'auto' : 0,
            right: side === 'right' ? 0 : 'auto',
            left: side === 'left' ? 0 : 'auto',
            bottom: side === 'top' ? 'auto' : 0,
            minWidth: 250,
            width: side === 'top' || side === 'bottom' ? '100%' : 250,
            maxHeight: '100vh',
            mt: 0,
            bg: 'background',
            border: 0,
            borderWidth: '1px',
            borderRightStyle: ['none', side === 'left' ? 'solid' : 'none'],
            borderLeftStyle: ['none', side === 'right' ? 'solid' : 'none'],
            borderColor: 'gray.light',
            overflowX: 'visible',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            boxShadow: [4, 'none'],
            transform: [
              open
                ? 'translateX(0)'
                : side === 'left'
                ? 'translateX(-100%)'
                : side === 'right'
                ? 'translateX(100%)'
                : side === 'top'
                ? 'translateY(-100%)'
                : 'translateY(100%)',
              'none'
            ],
            transition: 'transform .2s ease-out'
          }}
        >
          {children}
        </div>
      </>
    );
  }
);
