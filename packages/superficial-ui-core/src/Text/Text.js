/** @jsx jsx */
import { forwardRef, jsx } from '@superficial-ui/system';
import { Box } from '../Box';

export const Text = forwardRef(
  (
    {
      align,
      as,
      color,
      isCaps,
      isTruncated,
      marginIsDisabled,
      variant,
      whiteSpace,
      sx,
      ...props
    },
    ref,
  ) => {
    const mb = marginIsDisabled ? '0px' : as === 'p' ? 'lg' : '0.35em';

    return (
      <Box
        ref={ref}
        variants={variant || as}
        {...props}
        as={as}
        __themeKey='text'
        sx={{
          mb,
          mt: '0px',
          textAlign: align,
          whiteSpace,
          color,
          ...(isCaps && {
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }),
          ...(isTruncated && {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }),
          ...sx,
        }}
      />
    );
  },
);
Text.uiName = 'Text';
Text.displayName = 'Text';
Text.defaultProps = {
  as: 'p',
  color: 'text.main',
  marginIsDisabled: false,
};

export const H1 = forwardRef((props, ref) => <Text ref={ref} {...props} />);
H1.uiName = 'Text';
H1.displayName = 'H1';
H1.defaultProps = {
  ...Text.defaultProps,
  as: 'h1',
  variant: 'h1',
};

export const H2 = forwardRef((props, ref) => <Text ref={ref} {...props} />);
H2.uiName = 'Text';
H2.displayName = 'H1=2';
H2.defaultProps = {
  ...Text.defaultProps,
  as: 'h2',
  variant: 'h2',
};

export const H3 = forwardRef((props, ref) => <Text ref={ref} {...props} />);
H3.uiName = 'Text';
H3.displayName = 'H3';
H3.defaultProps = {
  ...Text.defaultProps,
  as: 'h3',
  variant: 'h3',
};

export const H4 = forwardRef((props, ref) => <Text ref={ref} {...props} />);
H4.uiName = 'Text';
H4.displayName = 'H4';
H4.defaultProps = {
  ...Text.defaultProps,
  as: 'h4',
  variant: 'h4',
};

export const H5 = forwardRef((props, ref) => <Text ref={ref} {...props} />);
H5.uiName = 'Text';
H5.displayName = 'H5';
H5.defaultProps = {
  ...Text.defaultProps,
  as: 'h5',
  variant: 'h5',
};

export const H6 = forwardRef((props, ref) => <Text ref={ref} {...props} />);
H6.uiName = 'Text';
H6.displayName = 'H6';
H6.defaultProps = {
  ...Text.defaultProps,
  as: 'h6',
  variant: 'h6',
};

export const P = forwardRef((props, ref) => (
  <Text ref={ref} variant='paragraph' {...props} />
));
P.uiName = 'Text';
P.displayName = 'P';
P.defaultProps = {
  ...Text.defaultProps,
  as: 'p',
  variant: 'p',
};

export const Caption = forwardRef((props, ref) => (
  <Text ref={ref} {...props} />
));
Caption.uiName = 'Text';
Caption.displayName = 'Caption';
Caption.defaultProps = {
  ...Text.defaultProps,
  as: 'span',
  variant: 'caption',
};
