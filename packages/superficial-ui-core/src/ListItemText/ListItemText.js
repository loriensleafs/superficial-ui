/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { isUIElement } from '@superficial-ui/utils';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { useListContext } from '../List';
import { P } from '../Text';

export const ListItemText = forwardRef(
  ({ children, color, isInset, primaryText, secondaryText, ...props }, ref) => {
    const { isDense } = useListContext();

    let primary = primaryText !== null ? primaryText : children;
    if (primary !== null && !isUIElement(primary, 'Text')) {
      primary = (
        <P
          as='span'
          color={color ? color : 'text'}
          lineHeight={isDense ? 'md' : 'lg'}
          marginIsDisabled
        >
          {primary}
        </P>
      );
    }

    let secondary = secondaryText;
    if (secondary !== null && !isUIElement(secondary, 'Text')) {
      secondary = (
        <P
          color={color ? color : 'text.secondary'}
          lineHeight='lg'
          marginIsDisabled
        >
          {secondary}
        </P>
      );
    }

    return (
      <Box
        ref={ref}
        {...props}
        sx={{
          display: 'inline-flex',
          flexDirection: 'column',
          flex: '1 1 auto',
          minWidth: '0px',
          my: 'xs',
          ...(primaryText &&
            secondaryText && {
              my: '6px',
            }),
          ...(isInset && {
            pl: '6xl',
          }),
        }}
      >
        {primary}
        {secondary}
      </Box>
    );
  },
);
ListItemText.uiName = 'ListItemText';
ListItemText.displayName = 'ListItemText';
ListItemText.defaultProps = {
  isInset: false,
};
ListItemText.propTypes = {
  children: PropTypes.node,
  isInset: PropTypes.bool,
  primaryText: PropTypes.node,
  secondaryText: PropTypes.node,
};
