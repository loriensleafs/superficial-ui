import { transition } from '@superficial-ui/utils';
import * as React from 'react';
import { Box } from '../Box';

export const NotchedOutline = React.forwardRef(
  ({ isNotched, labelWidth: labelWidthProp }, ref) => {
    const labelWidth = labelWidthProp > 0 ? labelWidthProp * 0.75 + 18 : 0;

    return (
      <Box
        as='fieldset'
        aria-hidden
        ref={ref}
        style={{
          paddingLeft: 8 + (isNotched ? 0 : labelWidth / 2) + 'px',
        }}
        __css={{
          position: 'absolute',
          top: '-5px',
          right: 0,
          bottom: 0,
          left: 0,
          m: 0,
          p: 0,
          transition: transition(
            ['padding-left', 'border-color', 'border-width'],
            { duration: 'shorter', easing: 'easeOut' },
          ),
          pointerEvents: 'none',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: 'md',
        }}
      >
        <Box
          as='legend'
          style={{
            width: isNotched ? labelWidth : 0.01 + 'px',
          }}
          __css={{
            p: 0,
            transition: transition('width', {
              duration: 'shorter',
              easing: 'easeOut',
            }),
            textAlign: 'left',
            lineHeight: '11px',
          }}
        >
          <Box as='span' dangerouslySetInnerHTML={{ __html: '&#8203;' }} />
        </Box>
      </Box>
    );
  },
);
NotchedOutline.uiName = 'NotchedOutline';
NotchedOutline.displayName = 'NotchedOutline';
